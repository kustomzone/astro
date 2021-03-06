# COMPILATION PHASES
    Source Code
        ↓
    AST
        ↓
    Dependency and Control Graph
        ↓
    LLVM IR Modules

The compilation phases covers the generation of one intermediate representation from another starting from the source code down to LLVM IR.

An LLVM IR module corresponds to an Astro module.

The mapping of a preceding intermediate representation to an output intermediate representation is recorded for incremental compilation purposes.


# COMPILATION METHODS
## Static Compilation
Static compilation runs the entire compilation phases at once. It also allows incremental compilation which means the intermediate representation of each phase are maintained and are updated as changes are made to the source code.

## REPL
The REPL (Read-Eval-Print-Loop) is a compile-and-excute process in which input code is fed one at a time to the compiler to be executed.

An AST is maintained, refined and used to generate executable code.

## Dynamic Compilation
Dynamic compilation is a hybrid of the REPL and static compilation. Dynamic compilation is usually fed a complete source file, which it compiles to an AST. It then generates executable code up to the point where types become uncertain.

The AST is refined as previously unkown types become resolved.

Types are resolved from executing dynamic imports.

As more types get resolved, more executable codes get generated.


# SEMANTIC ANALYSIS
## Prelude Inclusion
Extending the AST with imports of essential modules.

## Name Checking
Checking if a name has been declared before its use.

Names can only be used if they declared in current or parent scope.

Types and functions can be used before their declaration point.

## Cascading Notation Object Association
Stray cascading notation, like `~name`, are associated with their object to make subsequent semantic analysis easier.

## Type Inference
Unlike `Crystal`, type uncertainty cannot be caused by a branching control flow.

#### Crystal
```crystal
if x == 0
  a = 2
else
  a = 'Hi'
end
# a :: Int|Str
```
#### Astro
```python
var a
if x == 0:
    a = 2
else:
    a = 'Hi'
# code will not compile. `a` has different types in each branch.
```

## Reference Counting
    A       B       Subjects
    ↓       ↓          ↓
    □   ↔   □       Objects

In typical ARC implementation, only subject pointers are counted. In Astro, only the object pointers are counted and the counting is all done at compile time.

#### Deallocation Schemes
In the following code sample, it is evident that the object that `c` points to is last referenced at the call to `bar`, therefore it needs to be deallocated somewhere after the last point of reference.

```python
fun foo():
    var c = 'Hello'
    bar(c)
    for i in ..max:
       print(i)
```
There are several ways of going about this, each with its own set of problems.

1. *Deallocation at Original Scope*

    Here `c` is deallocated in the scope it is declared in. In this case, it is right after the call to `bar`.

    The issue with this scheme is that objects that are only used briefly will persist until execution returns to the scope where it is declared. `bar` could have deallocated `c` when it no longer needs it.

2. *Specialized Functions*

    In this scheme, the call to `bar` is specialized to deallocate `c`. A specialized version of `bar` is created where `c` is deallocated at the point it is no longer needed.

    The problem with the scheme is that it can result in a very large number of specialized functions which will increase binary size by a significant amount.

3. *Deallocation Checks*

    This is similar to the one above but instead of specializing the function, a check is introduced instead. At the point where any parameter is no longer needed, a flag from the enclosing scope is checked to know if the function is permitted to deallocate the argument. If the flag is set to true the parameter will be deallocated.

    In the implementation, each function would have extra bitflag arguments, where each bit represents an object passed as an argument to the function. If a bit for an object is set to one, the function is allowed to deallocate the object, otherwise it cannot delete an object.

    ```nim
    fun foo(a, b, bitflag):
        do_something()
        # Free resources
        free_locals()
        if (bitflag bitand 0b1000_0000) == 0b1000_0000: free(a)
        if (bitflag bitand 0b0100_0000) == 0b0100_0000: free(b)

    fun main():
        let x, y = "Hi", Car("Camaro", 2009)
        foo(x, y, heapvars)
        ...
    ```

    This scheme has runtime execution overhead.

3. *Deallocation Bundle*

    With _Deallocation Checks_ scheme, knowing which object to delete requires checks, which can become expensive when a function has many arguments and is called often. So I discarded this scheme in favor of the first scheme, but after spending more time on it lately, I think I may have found the right solution. There is still runtime overhead, but it should be significantly lesser than the previous scheme.

    This scheme allocates an array on the stack, just before a call to a function. The array holds pointers to arguments the function is allowed to destroy and the array is passed as an argument to the function. At the end of the function, the array is passed to `free_externals` function, which releases the pointers in the array.

    ```nim
    fun foo(a, b, heapvars):
        do_something()
        # Free resources
        free_locals()
        free_externals(heapvars)

    fun main():
        let x, y = "Hi", Car("Camaro", 2009)
        let heapvars = stackalloc{(UInt, Type)}(2)
        heapvars[1] = (cast{UInt}(ptr(x)), x.type)
        heapvars[2] = (cast{UInt}(ptr(y)), t.type)
        foo(x, y, heapvars)
        ...

    @unsafe
    fun free_externals(heapvars):
        if heapvars: for i, T in heapvars:
            destruct(T, i)
            free(i)
    ```

    This is nice because, unlike the _Deallocation Checks_ scheme, it knows what arguments to destroy, so it's not making checks on each argument. It also doesn't exhibit cache spill problem of traditional ref counting beacuse there is no counting done at runtime (for a non-concurrent program). But it still has the same cascading deallocation problem and it still has some runtime overhead.

#### Possible Optimizations
I will have to benchmark each scheme to be sure how they perform under different conditions. A mix of some of the schemes may be the ideal approach.

The first scheme can be classified under `late deallocation schemes`, while the last two can be classified under `early deallocation schemes`.

There can only be one subject pointer to an object.

References can only be passed by assignment or by argument.

Subject pointers are discarded when associated objects are no longer needed.

When there is no concurrency, deallocation points of objects can be entirely determined at compile-time.

When concurrency is involved, a count is maintained for concurrent coroutines that share an object and once one of the coroutine no longer needs an object, it decrements the count and checks if it can deallocate the object.

## Poymorphism
### Subtype Polymorphism
Astro supports multiple inheritance, but unlike C++, it doesn't duplicate same-name fields inherited from different parent types. This is enforced through `constructor chaining`.

                       [O] { name }
                       / \
                      /   \
    { name, score } [A]   [B] { name, age }
                      \   /
                       \ /
                       [C] { name, score, age }

In the above diagram, if a `C` object is constructed with ```{}.A(name, score).B(_, age)```, it will only get one `name` field, even though its supertypes both have a name field each.

Having duplicates helps the C++ compiler implement subtype polymorphism easily on functions but at the cost of unintuitive multiple inheritance behavior. So if type `C` had duplicated the fields, a `C` object would look like this. ```{ name, age, name, score }```.

```python
let c = C("John", 45, 24)

# (A) -> None
fun foo(obj) = obj.name

foo(c) # References first `name` in `c`.

# (B) -> None
fun bar(obj) = obj.name

bar(c) # References second `name` in `c`.
```

This way, each parent type is laid out inside `C` and a function for a parent type can also be a function for `C`, since `C` shares similar field offsets with its parent types.

In Astro, where field duplication is not allowed, each parent type may not be necessarily laid out in `C`.

    A -> { name, age }

    B -> { name, score }

    C -> { name, age, score }

In the above example, `A` is laid out in `C`, but `B` is not laid out in `C` (`score` is not second to `name`). Therefore, to implement subtype polymorphism in Astro, the offset of each field of a parent type as used in the function body, is passed to the function.

```python
let b = B("Daniel", 33)
let c = C("John", 45, 24)

# (B) -> None
fun foo(obj, objscoreoffset) = obj[objscoreoffset]

foo(b, 2) # References b.score
foo(c, 3) # References c.score
```

The problem with this technique is that it increases the number of parameters a function takes.

### Array of Any and Multiple Dispatch
Like I always say, arrays are blackboxes and their blackbox nature complicates multiple dispatch implementations.
As a result of this, the compiler keeps a union of an array's element types even if the array has an explicit element type of `Any`.
This is used among other things to reduce multiple dispatch overhead.

```python
let a = [Car(name: 'chevrolet'), Person(name: 'John', age: 56), Product(kind: 'drink', name: 'Coke')]
a :: Array{Any}
a :: Array{Car|Person|Product}
```

While the Array type instantiation above has a type of `Array{Car|Person|Product}`, note that the element type is actually `Car&Person&Product`.

An `Array{Any}` is a contiguous list of _typed pointers_ that point to the actual elements of the array.

    [typeid, ptr] -> Car(name: 'chevrolet')
    [typeid, ptr] -> Person(name: 'John', age: 56)
    [typeid, ptr] -> Product(kind: 'drink', name: 'Coke')

For every `Array{Any}`, each element type of the array is given an id and the id serves as the index
into a `type witness table` which will be discussed later.

`Astro` is a __statically-typed language__ and even though it allows polymorphic structures like `Array{Any}`,
it will throw a __compile-time error__ if you try to access a field that is not common to all the array's element types.

```python
print a.name # Ok. `name` field is common to all of a's element types
print a.age # Error. `age` field is not common to all of a's element types
```

A `type witness table` is constructed based on the fields common to all the element types. This can be written as `Car&Person&Product` for the example above. A witness table simply
allows one to choose the right _field offset_ at runtime when the type of an element has been determined.

            typeid    name_offset
    Car     [1]  ->   [1]
    Person  [2]  ->   [1]
    Product [3]  ->   [5]

```python
fun foo(a, b) = a.name, b.name #: Any, Any
foo(a[1]::Car, a[3]::Product, 1, 5)
foo(a[1][2], a[3][2], a[1][1][1], a[3][1][1])
```

#### Possible Optimizations
A witness table may not include common fields that are not accessed.
If the types of arguments passed to a functions are known at compile-time, the function may be specialized for that type signature.


## Construction
A `type constructor` must return a new object. The returned object will be considered an instance of the type.

```nim
type Person: var name, age

# constructor
fun Person(name, age) = new{ name, age }
```

A `type constructor` must return an object with all introduced and inherited fields inititialized.

```nim
type Person:
    var name, age
    var sex = "female"

# constructor
fun Person(name, age) = new{ name } # error! `age` field not initialized.
```


#### Constructor Chain
A `constructor chain` is an hierarchical chain of construction in which a type is responsible for initializing the fields it introduced.

```nim
type Person: var name, age
type Student <: Person: var score

# constructors
fun Person(name, age) = new{ name, age }
fun Student(name, age, score) = new{ score }.Person(name, age)
```

A `type constructor` must not initialize or assign to fields not introduced by it's type.

```nim
type Person(name, age)
type Student <: Person: var score

# constructor
fun Student(name, age, score) = new{ name, age, score } # error! initialized `age` and `name` fields.
```

A `type constructor` can only be defined in the same file as the type.

## Generics
#### Generic Type Arguments
It is true that types can be inferred from assignments and passed arguments, and this means generic type arguments are redundant in many cases.

```nim
fun add(a, b): #: {T}
    let c = a + b #: T
    return c

let a = add{Int}(5, 6)
let b = add{Float}(5.25, 3.6)
```

In the above example, a generic type parameter is not really needed as the type of `c` can be inferred from the `a + b` operation.

However, buffer functions, like `malloc`, have uninitialized elements, so there is no way inferring what the element type is without explicitly specifying the element type. This is the only reason why type argument may be needed in Astro.

```nim
type List: #: {T: Any}
    var buffer*
    var len = @delegated(len)

fun List(len): #: {T}
    new { buffer: malloc{T}(len) }
```

## Indexing
### 0-Based Indexing vs 1-Based Indexing
#### Base Pointer
0-based
```
base pointer      [•][a][b][c][d]
                      ↓
                     ptr

offset            [•][a][b][c][d]
                      ↓
                     ptr[0]
```

1-based
```
base pointer      [•][a][b][c][d]
                   ↓
                  ptr

offset            [•][a][b][c][d]
                      ↓
                     ptr[1]
```

#### Bounds Checking
0-based
```julia
    -1 < index < len
    0 > index ≥ len
```

1-based
```julia
    0 < index ≤ len
    1 > index > len
```
