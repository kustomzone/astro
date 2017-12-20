# Astro 0.1.12
### SINGLE-LINE COMMENTS
```nim
# Hello, World!
```

### MULTILINE COMMENTS
```julia
#=
    Astro has ...
    #= Nested comments! =#
=#
```

### SUBJECT DEFINITION & ASSIGNMENT
In Astro, subjects are names to which values or objects are bound.
```nim
let team = 11 # The value, `11`, is bound to the subject, `team`
```

Initialization can be deferred to later.
```pony
let hello
hello = 'こんにちは'
```

A subject cannot be used without initializing it first.
```nim
let greetings
print(greetings) # Invalid!
```

The `let` keyword is used for subjects whose values cannot change.
```nim
let immutable = 10
immutable = 50 # Invalid!
```

The `var` keyword is used for subjects whose values can change.
```nim
let mutable = 10
mutable = 50 # Subject value changed to 50
```

The expression that comes after an assignment operator can be moved to the next line with a preceding indentation.
```nim
var φ =
    arctan(y/x)
```

### IDENTIFIERS
Name of subjects must always start with a character and can be followed with characters, digits or underscore.
```pony
var my_name
fun show99BottlesOfBeer(): pass
```

Names preceded by underscores are special to the compiler.
```python
print _args
```

#### Naming convention
* Camel case for variables, constants, function names and module names.
    ```pony
    let bookTitle = "Ender's Game"
    var currentYear = 2017
    fun addNumbers(a, b): a + b
    ```

* Pascal case for concrete and abstract type names.
    ```pony
    type InventoryManager(name, id)
    abst LightSource: SpotLight | Directional | Ambient
    ```

* For acronyms, only the first charcater should be upper case.
    ```pony
    type XmlParser <: Parser
    ```

### VARIABLE/CONSTANT OBJECTS
Objects are variable by default but can be made immutable with the. `const` keyword
```js
var name = const Name('Steve')
let list = const [1, 2, 3, 4]
```

### FUNCTION DEFINITION (1)
Parameters are immutable by default.
```pony
fun add(a, b):
    return a + b
```

The `var` keyword makes a parameter mutable.
```pony
fun swap(var a, var b):
    a, b = b, a
```

If the function definition contains only a single expression, the block begin punctuator, `:`, can be replaced with `=`.
```pony
fun add(a, b) = return a + b
```

You can annotate the argument and return types of a function.
```pony
fun modulo(a, b): #: (Int, Int) -> Int
    return a % b
```

Astro is indentation-based, but for legibility reason blocks can optionally be delimited with `..`
```pony
fun sub(a, b):
    a - b
..
```

### COMMAND NOTATION
If a function call takes just one argument, the parens can be ommitted given the argument is not a list, dict, set or regex literal or preceded by a prefix operator.

This is necessary due to ambiguities that may otherwise occur when parsing or reading the code.
```python
print "Hello"
print name
print 56
```

```python
print [9] # Invalid!
print {9} # Invalid!
print /9/ # Invalid!
print +5 # Invalid!
```

### EXPRESSION-ORIENTED
Astro is an ...
```nim
var isNyproCrazy = (faveHobby == 'CountingBirds') # Returns true or false
```

The last expression of a function is always returned.
```nim
fun add(a, b):
    a + b # The `return` keyword is not necessary here

# The result of a + b will be returned to the caller
let height = add(2, 3)
```

A semi-colon at the end of a block, stops it from returning its last value.
```nim
fun setName(p, name): #: Person, Str
    p.name = name;
..

let name = setName('John Smith') # error! setName returns no result.
```

### SPECIFYING TYPES
Types can be automatically inferred in Astro.
```pony
var todo = 'Create a new programming language :)'
```

However you can still specify types explicitly using '#:' type comment.
```nim
var number #: Int
```

Union types.
```nim
var identifier #: Str|Int
```

Intersection types.
```nim
var pegasus #: Horse&Bird
```

### SOME BUILT-IN TYPES
```nim
var index = UInt(2_000) # Unsigned integer type

let e = 2.718281828459045 # 64-bit floating-point type

let dogBreed = Str('German Shepherd') # Immutable UTF-8 string type

var listOfGroceries = ['Oranges', 'Cabbages', 'Tomatos', 'Bananas'] # List type

var game = 'BioShock Infinite', 2014 # Tuple type
```

### VALUES & REFERENCES
By default primitive objects (UInt, Int, F32, Bool) are passed around by value and by default complex objects (Str, user-defined types) are passed around by reference however, you can change this behavior with 'ref' and 'val'.
```pony
let string = "Gift"
let number = 1000
```

Passing a complex object by value.
```pony
var newString = val string
```

Passing a primitive object by reference.
```pony
var newNumber = ref number
```

Astro manages memory automatically using a special reference counting technique, it handles reference cycles as well.
```pony
myCompany.affiliate = ref yourCompany
yourCompany.affiliate = ref myCompany
```

`iso` can be used to hold an exclusive reference to the object.
```nim
let developer = iso 'AppCypher'
let anotherDeveloper = developer # Invalid!
```

While `val` is a shallow copy operation, `acq` is a copy operation.
```pony
let rent = val house
let buyer = acq game
```

An immutable reference to an object can be returned from afunction using the `const` keyword.
```kotlin
fun getAmount():
    return const amount
```

Reference type annotation.
```nim
fun swap(var a, var b): ## (ref T, ref T) -> None
    a, b = b, a
..
```

### NUMBERS
```nim
var index    = 5
var axis     = -3
let meters   = 0.25e-5
let salary   = 10_000'f # `'f` marks the number literal as Float64
var price    = 0x6FFF00p+12 # Hex literal
var opCode   = 0b10110001 # Binary literal
var interest = 0o566768 # Octal literal
let pi       = 3.14'bf # BigFloat
```

### TYPE DEFINITION (1)
A type is synonymous with `struct` in C. It holds the blueprint of what an object can contain.
```nim
type Person(name, age)
```

Objects can then be created from the blueprint.
```pony
var jane = Person('Jane Doe', 50)
```

By default a type's fields are publicly accessible, but they can be made private to a module with `\`` modifier.
```nim
type Person'(var name', var age') # Private fields
```

#### PROPERTIES
Properties provide a setter/getter behavior.

The first brace pair represents the setter, and the second braces pair, the getter.
```nim
var age  = {age + 5} -> {age - 5}
```

The last expression in the setter braces becomes the property's value.

The last expression in the getter braces is the property's returned value.
```nim
var name = {name} -> {name + "Smith"}
```

Empty braces means the setter/getter is inaccessible.
```nim
var date = {date} -> {}
```

### TUPLES
Tuple is an immutable datatype whose element types and length are determined statically.

Tuples cannot be appended to or removed from
```nim
var name, age = 'Emeka Okorafor', 27 # Open tuple
var game, year = ('Uncharted 4', 2016) # Closed tuple
```

Tuple unpacking.
```nim
let person = "Sam", 50 # person = ("Sam", 50)

let name, age = person # name = person, age = person

let (name, age) = person # name = "Sam", age = 50

let arguments = (5, 6)
add(...arguments)
```

```nim
let map = () # Empty tuple
let map = (london,) # One-element tuple. Note the trailing comma
```

#### Named tuple
```nim
let http200Status = (statusCode:200, description: "Ok")
```

### LISTS
```nim
var unorderedList = [7, 3, 8, 5, 4, 0, 9, 1, 2, 6]

var emptyList = []
```

Specifying a list type.
```nim
var names #: [Str]
```

Heterogenous list.
```pony
var stuffs = [500, 'Steve', 1.0]
```

Astro uses 0-based indexing. Every list indices start at 0.
```nim
stuffs[0] # 500
```

Slicing a list.
```nim
var disqualified = contestants[1:6] # 2nd to the 5th index.
```

`!` is used to access the index backwards.
```nim
var last = contestants[!0] # last index
```

Using negative step to reverse index access.
```nim
var reversed = contestants[:-1:]
```

Reverse access can also be done using `!`
```nim
var reversed = contestants[!0:]
```

Using a constructor to create a List.
```nim
let number = List[Str](4, 4, "")
```

Field mapping.
```ruby
students.map |x| => x.gpa
students.$gpa # Same as above

fun average(students) = sum(students.$gpa) / students.size
```

List operations.
```nim
var concatenate = [1, 2] ++ [3, 4] # [1, 2, 3, 4]
var multiply = [1, 2] ** 2 # [1, 2, 1, 2]
```

### ARRAYS
Array is a supertype of List and work a bit differently from list
Arrays can be used preallocate uninitialized uni/multi-dimensional buffers.
```nim
let calendar = 31×12[]
let calendar = 31*12[] # Alternate syntax
```

Because Arrays can be more efficient, they can be used to represent matrices.
```nim
let a = 2×4[
    [1, 2, 7, 8]
    [3, 4, 5, 6]
]
```

A 2-dimensional Array can be created using horizontal concatenation with `;`
```nim
let a = 2×4[
    1, 2, 7, 8;
    3, 4, 5, 6
]

let a = [1, 2; 0, 4]
```

Using a constructor to create an Array.
```nim
var matrix = Array[Int](2, 2)
```

Setting the indices of a multi-dimensional Array.
```nim
matrix[,] = [
    1, 6;
    3, 7
]

let subset = mat4[1:, 1:2]
```

Vectorization using postfix `.` operator
```nim
let z = 5 + subset.
let y = add(subset., 1)
```

Astro's lists are, by default, row-major order.
```nim
let y = [1, 2, 3]
# [1 2 3]
```

An Array's order can be changed using the transpose operator, `'`
```nim
let z = [1, 2, 3]' # Transposition'
# [1]
# [2]
# [3]
```

Array unpacking.
```nim
let b = [
    ...a', ...a;
    ...a, ...a'
]
# [1 0 1 2]
# [2 4 0 4]
# [1 2 1 0]
# [0 4 2 4]
```

### OBJECTS VS DICTIONARIES
Objects and dictionaries are both associative data structures.

Objects are static construct and can be introspected at compile-time.
```nim
let game = { title: "BioShock Infinite", year: 2014 } # Property
```

Dictonaries are dynamic data structures and will return nil where expected key is not present.

Dictionary literals are marked with `dict`.
```nim
let game = dict.{ title: "BioShock Infinite", year: 2014 } # Dictionary
```

```python
let parents = {
    'mum': {
        'name': 'Esther Williams'
        'age': 42
    }
    # Unquoted keys are taken as strings as well.
    dad: {
        name: 'Sunday Williams'
        age: 46
    }
}
```

Nested object can be simplified with indentation.
```pony
let siblings = {
    sister:
        name: 'Shade Williams'
        age: 15
}
```

Object fields are accessed using the dot operator.
```nim
let sister = siblings.sister.name
```

Dictionary values are accessed using "{}" and can return nil.
```pony
let mum = parent{'mum', 'name'}
```

Dictionary values can also use accessed using the dot operator, but since dictionaries can return nil, the nil operator is needed.
```nim
let mum = parent.mum?.name
```

New fields can be added to an object.
```nim
siblings.brother = {
    name: "Daniel Williams"
    age: 23
}
```

To use variables from the outer scope, the variable name needs to be escaped with `$`.
```nim
var professor = {
    $id1: "Charles Xavier"
    $id2: 56
}
```

Empty object.
```nim
var emptyDict = {}
```

# SET
Set is an unordered collection of items with no duplicate elements
```pony
let fruits = set.['orange', 'mango', 'guava', 'apple', 'orange', 'guava', 'pineapple']

let citrus = set.['lime', 'lemon', 'orange']

fruits.size # 4
```

Set operations
```nim
let union = citrus | fruits # set.['lime', 'lemon', 'orange', 'mango', 'guava', 'apple', 'pineapple']
let intersection = citrus & fruits # set.['orange']
let difference = citrus - fruits # set.['lime', 'lemon']
```

### RANGE
Range is an iterable that allows iterating through a range of values
```nim
let days = 0..31 # 0 to 19
```

Using range in a for loop
```python
for i in 0..10:
    print i
```

### SPREAD OPERATOR
Spread takes the remaining values in a destructure
```pony
var a, ...b = 1, 2, 3, 4
print(a) # 1
print(b) # (2, 3, 4)
```

It is also used for varargs
```nim
fun rest(a, ...b):
    print(b)

rest(1, 2, 3, 4) # (2, 3, 4)
```

### STRINGS
```pony
let language, year = 'Astro', 2015
```

String interpolation
```pony
var story = "$language was started in the $year"
```

Both single and double quotes can be used to represent a string literal
```pony
let calc = '5 * 50 = $(5 * 50)'
```

Non-standard string literals don't have escape sequences nor interpolation.
```pony
var verbatimStr = r."Use '\t' to represent tab"
```

Multiline strings are enclosed in triple `'` or `"`.
The first and last newlines are always ignored in multiline strings.
```pony
var verbatimStr = '''
Hello, World!
'''
```

`Char` is 32-bit that represents a single Unicode codepoint.
```pony
var chars = c.'π'
```

String operations.
```pony
var concatenate = 'ab' ++ 'c' # 'abc'
var multiply = 'ab' ** 2 # 'abcabc'
let escapeSequences = '\t \n \' \" \q \\'
```

String continuation.
```pony
var greeting = 'Hello, ' ...
'World!'
```

### STRING FORMATTING
Padding.
```pony
let leftPadding        = 'left padding: $:>10(string)'
let rightPadding       = 'right padding: $:<10(string)'
let placeholderPadding = 'placeholder padding: $:_<10(string)'
let centering          = 'centering: $:^10(string)'
```

Truncation.
```pony
let truncating         = 'truncate string: $:.10(string)'
```

Numbers.
```pony
let integer            = 'integer: $:d(number)'
let float              = 'float: $:f(number)'
let truncation         = 'figure truncation: $:6.2f(number)'
let positive           = 'positive: $:+d(number)'
let negative           = 'negative: $:-f(number)'
```

Date-Time | Custom objects.
```pony
let date               = 'date: $:|Y-m-d H:M|(date)'
```

### MULTILINE EXPRESSIONS
Expressions that spread accross multiple lines must be enclosed in brackets or the line-continuation punctuator can be used.
```pony
var zero = -100 ...
+ 100
```

Note that subsequent lines in multiline expressions can't be indented.
```pony
var zero = -100 ...
    + 100
```

Expressions inside a pair of brackets/braces can span multiple lines without using the line-continuation punctuator.
```pony
sum(1, 2, 3, 4, 5, 6, 7, 8,
9, 10, 11, 12)
```

If the contents of a pair of brackets/braces are moved to a newline, it needs to be indented.
```pony
playMusic(
    'Asa',
    'Jailer',
    '2009'
).rewind()
```

Chained dot notation can be moved to subsequent lines and indented.
```pony
sentence
    .trim()
    .lower()
```

### PASS KEYWORD
`pass` keyword can used to represent an empty block.
```pony
fun div(a, b): pass
```

### INDENTATION
Astro recognizes 4-space indentations only. No tabs.
```pony
fun removeSpaces(string):
    return s.split(/[ ]/).join()
```

The `\\` punctuator can replace a physical dedent.
```pony
if studio.isLive(): blockAccess() \\ else: openAccess()
```

### IF EXPRESSION
Coonditional branches using `if`, `elif` and `else`.
```python
if isAdrianRich:
    spendAll('on parties')
elif isOroboRich:
    spendAll('on legos')
else:
    cry('we are broke')
```

Checking for nil.
```python
if phoneNumber?: # The block executes if "phoneNumber" is not nil
    call(phoneNumber)
```

Checking for nil and assigning value to a subject.
```python
if stockCode = getStockCode('APPLE')?:
    print('APPLE: $stockCode')
```

Reassigning a variable from external scope
```pony
if $player = getPlayer(name)?:
    print player.fitness
```

NIL
Sometimes, it can be useful to represent an empty or a missing state, this is done with nils in Astro.

Non-nillable subjects can give nil nor be assigned a nil value.
```pony
var code = '2 + 4' #: Str
code = nil # Invalid!
```

Nillable object can be assigned nil.
```pony
var program = 'print(\"Hello World\")' #: Str|Nil
var programList = Str()?
```

Nilable unwrap.
```pony
let name = dave?.name
```

Exceptionable unwrap.
```pony
getAccount("Default")! # If result is nil, NilError is raised
```

Nil coalescing.
```pony
let name = getName() ?? "John Doe"
```

### BOOLEAN EXPRESSIONS
If x equals y and also greater than z.
```pony
x == y and y == z
x && z == y
x == y == z
```

Logical negation with `not` keyword.
```pony
x != y
not x.isbound
x not in list
```

### FOR LOOP
```python
for i in 1..11:
    print i
```

Destructuring in loop.
```python
for kind, number in interestingNumbers:
    print '$kind: $number'
```

Parallel iteration.
```python
for name, (kind, number) in nameList, table:
    print((name, key, value))
```

By default the for loop subjects are immutable, but they can be made mutable using the "var" keyword.
```nim
for var i in 1..21:
    i += 1
    j = i
..
```

The "end" block executes when a loop completes without interruption like break, return or throw.
```julia
for line in file:
    if /john/ in line:
        echo "name found!"
        break
end:
    echo "name not found!"
```

### COMPREHENSION
```ml
let generator = (i | i in random(0, 200))
let list = [x | x in 1..21 where x mod 2 != 0]
let set = set.[i | i in random(0, 200)]
```

Nested loops.
```swift
let dict = {x : y | x in 1..30; y in 31..60 where even(y)}
```

### BREAK WITH
Break-with breaks a loop and returns a value.
```python
for name in register:
    if name == 'Tony':
        break name
    ''
```

### IN
`in` is a special keyword-based infix operator that checks for existence of an object in a collection type.
```nim
if student.name in defaulterList:
    print '[student.name] hasn\'t paid yet. Contact parents'
```

Negation.
```nim
if 'ps4' not in birthdayPresents:
    print 'Aaargh! Everyone hates me'
```

Regex matching.
```nim
if /dollar[s]?/ in sentence:
    sentence.replace(/dollar[s]?/, 'pounds')
```

### MOD
`mod` is a keyword-based infix operator with the sme function as "%"
```pony
fun isEven(n) = (n mod 2 == 0)
```

### CHAINED CONDITIONAL CONSTRUCTS
It is idiomatic in Astro to put, at most, two nested conditional constructs on the same line.
```nim
if person in auditionRoster: if person.mark > 40.0:
    acceptanceList.add person

for book in library: if book.title.contains('adventure'):
    personalLibrary.add book
```

### WHILE LOOP & LOOP
Conditional loop.
```nim
while file.hasNext():
    print file.next()
```

Unconditional loop. Synonymous to "while true"```nim.
```rust
loop:
    let input = scan ">>> "
    let tokens = lex input
    let ast = parse tokens
    let bytecodes = compile ast
    let result = interpret bytecodes
    print result
```

> Note, `loop` is not a reserved keyword

A do-while loop block is evaluated at least once.
```julia
do: # Note, `do` is not a reserved keyword
    print x
    x += 1
while x < 50
```

Nillable assignment in while loop.
```pony
while details = books{title}?:
    print details
    if details.author != 'J.K. Rowlings':
        break
    title = chooseTitleRandomly()
..
```

Like `for` loop, `while` and `loop` can also have `end` block.
```julia
while file.hasNext() where /\t+/ in file.next():
    break 'File contains tabs!'
end: 'File is clean!'
```

### MAIN FUNCTION
If a module contains a main function, it will be the module's entry point.
```pony
fun main():
    print 'Hello World!'
```

### FUNCTION DEFINITION (2)
If a function returns nothing, it can either be annotated with None or left empty.
```nim
fun show(point): #: Point -> None
    print(point.|a, b|)
```

The normal order of arguments in a function call can be changed if the parameter name is specified.
```nim
fun say(msg, name): #: (Str, Str)
    print '$msg $name!'
..
say(name: 'Steve', 'Hello') # Hello Steve!
```

Varargs takes variable number of arguments.
```nim
fun arithMean(...numbers):
    var total = 0
    for number in numbers:
        total += number
    total / numbers.size
..
arithMean(1, 2, 3, 4) # It can take multiple arguments
arithMean(...tuple) # Or a spread tuple
```

Anonymous functions are functions without names.
```pony
fun _(): return a + b
```

The state of a local subject marked with "'" always persistbetween function calls.
```nim
fun callCount():
    var count' = 1 #'
    print('call count = $count')
    count += 1
..
callCount() # call count = 1
callCount() # call count = 2
```

Default parameter values.
```nim
fun login(username: 'demo', password: 'demo'):
    access Account(username, password)
..
login() # Using default values
```

Compulsory named parameters are marked with `.`
```pony
fun signUp(username., password.):
    access Account(username, password)
```

The parameter names must be specified in the function calls.
```nim
signUp(username: 'appcypher', password: 'bazinga!')
signUp('appcypher', 'bazinga!') # Invalid!
```

Compulsory named parameters can have a different name that can be used within the function block.
```pony
fun send(message, to.recipient):
    print((message + recipient).upper())
..
send('Hello', to:'Cantell')
```

Compulsory named can also be used with varargs, which would then be a named tuple.
```pony
fun total(start, ...rest.):
    let result = start
    for i in rest: result += i
    result
..
total(0, watch: 500, shoes: 6700, laptop: 1200)
```

Destructuring parameters.
```pony
fun show({name, age}) = print(name, age)
```

A function's arguments can be accessed as a named tuple via _args.
```pony
fun printPerson(name, age) = print(_args)
printPerson('John', 25) # (name: 'John', age: 25)
```

### LAMBDAS
Functions are first-class objects and can be passed around like regular objects.
```pony
let scoresExtraMarks = scores.map(fun _(score): score + 5)
scores.each(print)
```

Assigning a function to a subject.
```nim
let add = +
add(4, 5) # 9
```

Lambdas are syntactic sugar for anonymous functions.
```ruby
fixtureList.filter(fun _(game): not game.isCancelled) # Anonymous function
fixtureList.filter(|game| => not game.isCancelled) # Lambda
```

When a function call takes a single function argument, the lambda can be written after the call parens.
```ruby
list.foldl(0) |x, y| => x + y
```

The call parens can be ommitted if all the function takes is a function argument.
```ruby
list.each |x| => print(x)
```

#### Recursive lambda
An anonymous function or lambda can be recursively called within its body using the fun keyword.
```ruby
list.aggregate(0) |a| => (a == 0) ? 1 : (a + fun(a - 1))
```

### CLOSURE
    # A closure is a function defined within another function
    fun genDbConnector(host., username., password.):
        return fun makeDbConection(): # A closure can aslo be returned
            db.connect(host, username, password)
    ..

### PARTIAL APPLICATION
    # Partially applied functions are function calls with one or more of it's argument not applied
    fun multiply(a, b) = a × b

    # Unapplied arguments are represented with the placeholder, "$"
    let multiply3by = multiply(3, $)

    # Applying missing arguments
    multiply(3, $)(5) # 15
    multiply3by(5) # 15

### IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
    # Non-idiomatic iife in Astro
    (|a, b| => a + b)(2, 3)

    # Idiomatic version
    (a: 2, b: 3) => a + b

    #
    let a, b = 2, 3
    (a, b) => a + b

    # An iife with no argument
    () => print('Hello world!')

### CONTEXT LABELLING
    #
    @(top)
    fun play(music):
        if music != nil: music.start()
        |music| =>
            if music.artist "Bieber":
                return music.artist at top
    ..

    loop: @(outer)
        while file.hasNext():
            var line = file.nextLine()
            if line != "":
                print line
            else:
                break at outer
    ..

### EXT KEYWORD
    # "ext" can be used to refer to the parent scope.
    let state = 'Idle'

    fun changeState(state):
        if state != nil:
            activateState state
        else:
            activateState ext.state
    ..

### PATTERN MATCHING
    # match block is like switch-case statement, and it matches against the expression on the previous line.
    object
    | 0           -> spill # a keyword for moving to the next case
    | 1||23||40   -> .name ++ n
    | n           -> n * n
    | = getVal()? -> .value
    | [x, ...y]   -> print "list"
    | Point(x, y) -> x * y
    | /[a-z]+/    -> print "regex"
    | [x, y, z]   -> print "list"
    | {x, y, z}   -> print "set"
    | {x:, y:}    -> print "dict"
    | (x, y)      -> print "list"
    | {a:b}       -> print "dict"
    | [a:b]       -> print "range"
    | Int         -> print "integer"
    | $outer      -> outer
    | 5 if x == z -> doSth()
    | .name == 45 -> 45
    | .> 25       -> 'Greater than 25'
    ~ x > 25      -> x * 2 / 5
    ~ x < 25      -> 'x is lesser than 25'
    ! in [1..10]  -> 78_324'b #'
    | _           -> 'default' # otherwise
    | else        -> 'default' # same as above

    # A match block written on a single line
    fun whatNumber(n) = | 1 => 'One' | 2 => 'Two' | _ => 'Other'

    # do-match
    print $ if fruit
    | 'grape' -> 'fruit is a grape'
    | 'apple' -> 'fruit is a sweet apple'

    # you can pattern match with any language construct that has arguments
    while turn in ['y', 'Y', 'n', 'N']:
        | 'y'||'Y' -> return 1
        | 'n'||'N' -> return 0
        | _        -> print "its an invalid choice"

### COROUTINES & GENERATORS
    fun count(num):
        for x in [:num]: var z = yield x

    var counter = count(25) # instantiating coroutine
    count.next(25)
    count.raise(Error "Some error :)")
    delegate coroutine # 'delegate' is similar to Python's 'yield from'

### TYPE DEFINITION (2)
    type Car:
        var make, model ## Str

    fun move(car): ## Car
        "Moving"

    # multiple type declaration is allowed for types without
    # parameters or parent types
    type Duck, Person

    # initializer
    fun Car(make, model): ## Str, Str
        new(make, model)
    # new is a special function that creates a new object and maps
    # the arguments to corresponding fields

    fun Car(maker, model, year)

    # a destructor can be used for cleanups
    fun Car(!)

    type Person(var name, var age) # Person is a initializer type.
    # Initializer types have just main initializer and the parameters
    # of the initializer are mapped to fields.

    var john = Person('John Connor', 23)

    type Lamp: var color
    var yellowLamp = Lamp 'Yellow'

    # initializer overloading
    fun Lamp():
        Lamp 'White'

### TYPE CONVERSION
    # camelCased version of type names are, by convention, meant for type conversion operations
    type MyInt <: Int
    type MyFloat <: Float

    # new values are constructed out of such conversion.
    fun myInt(myFloat):
        new truncate myFloat

### FIELD EXTENSION
    type Programmer(specializedLanguages) <: Person:
        let languages ## [Str]

    let orobogenius ## Programmer
    orobogenius.languages = ["Java", "PHP", "JavaScript"]

    let appcypher = Programmer(["Astro", "Java", "C++"])
    appcypher.philosophies = ["Open Source", "Transhumanism"]
    appcypher.resume = "chicken.poop.com/appcypher"
    appcypher.mentor = "Captain Jack Sparrow"

    var nypro = appcypher

### TYPE EXTENSION
    type Programmer(specializedLanguages) <: Person:
        let languages ## [Str]

    Programmer.philosophies ## [Str]
    Programmer.resume
    Programmer.mentor

### INHERITANCE
    type Animal
    fun sound(animal): ## Animal
        print 'Nothing'

    type Bird <: Animal
    fun sound(bird): ## Bird # overrides supertype function.
        print 'Chirp!'

    type Horse <: Animal:
    fun sound(horse): ## Horse
        print 'Neigh!'

    # Astro supports multiple inheritance.
    type Pegasus <: Horse, Bird:
    fun sound(pegasus): ## Pegasus
        sound pegasus as Horse

    # due to Astro's multiple dispatch nature, Inheritance applies equally to all
    # arguments of a function.
    type A
    type B <: A

    fun foo(a, x) ## A, X
    fun foo(b, x) ## B, X # this overrides top

    fun bar(x, a) ## X, A
    fun bar(x, b) ## X, B # this also overrides top

    # a super method can be called directly or by using super
    fun baz(x, b): ## X, B
        baz(x, b as super)

### CONSTRUCTOR TRAIN
    # Constructor train is the way Astro ensures the construction of all declared and inherited fields of a particular type.

    # it's basically about making each type responsible for the initialisation of the fields it introduced.
    type Person(name)
    type Teacher(subject) <: Person
    type Student(course) <: Person

    type TeachingStudent <: Teacher, Student:
        var schedule

    fun Teacher(name, subject): new(subject).super(name)

    fun Student(<name>, course) # single inheritance can be shortened

    fun TeachingStudent(name, subject, course, timetable):
        # a subtype cannot assign to an inherited field in the initializer train.
        new(timetable).Teacher(name, subject).Student(_, course)

    # if the compiler finds out an initializer doesn't initialize a field, it complains.

### THE DIAMOND PROBLEM
    fun register(teacher): ## Teacher
        staffList teacher.name

    fun register(student): ## Student
        studentList student.name

    # when TeachingStudent type is declared, an ambiguity error will be issued about `register`.
    type TeachingStudent <: Teacher, Student:

    # the function needs to be overridden
    fun register(teachingStudent): ## TeachingStudent
        staffList teachingStudent.name
        studentList teachingStudent.name

    var john = TeachingStudent 'John Smith'
    john.register()

    # as a result of these MI issues, Astro advocates favoring single inheritance and composition over multiple inheritance.


### ABSTRACT TYPES & FUNCTIONS
    abst Player # abstract types cannot be instantiated.

    # a function without a body (apart from initializers) is an abstract function and an error is raised if it is called directly.
    # An abstract function is expected to be implemented by a corresponding subtype function.
    fun play(pl) ## Player
    fun rewind(pl) ## Player
    fun fastForward(pl) ## Player

    type DigitalPlayer <: Player
    fun play(dpl): ## DigitalPlayer # this overrides and implements play.
        initPlaylist()
        playPlaylist()

### ABSTRACT TYPES AS ENUMS
    # abstract types can be used like enums in other languages
    abst Tree:
        Leaf(value) ## $T -> Leaf
        Node(l, r) ## Leaf, Tree -> Node

    ## Tree -> $
    fun sum(t):
        | Leaf -> .value
        | Node -> sum(.l) + sum(.r)
    ..

    # abst typevalues don't need namespacing when used in the same module as they are declared
    var x = Node(Leaf 1, Node(Leaf 2, Leaf 3))

### SINGLETONS
    let switch = { on: false }

    fun toggle(switch): ## switch'
        | .on == true  -> .on = false
        | .on == false -> .on = true
    ..

    window.addMouseListener({
        mouseClicked: |self, event| -> print "Mouse Clicked!"
    })

### TYPE CHECKING
    if myCar :: Car:
        print 'myCar is a Car'

    if myCar <: Car:
        print 'myCar is a supertype of Car'

    if myCar !>: Car:
        print 'myCar is not a supertype of Car'

    head([1, 2, 3]) :: ([Int] -> Int)

### IDENTITY/REFERENCE EQUALITY
    let a = Person 'John Smith', 25
    let b = a
    let c = val a
    a is b # true
    a is c # false
    (this is that) == (this.ref == that.ref) # true

### FUNCTION == METHODS (UFCS)
    fun show(p): ## Person
        print((self.name, self.age))
    ..

    show nigel
    # In Astro, a function is a method of its first argument.
    nigel.show()

    # The only two set of functions that cannot be used with dot operator are
    # contructor functions and new functions.
    type Robot:
        var name, uniqueID
    ..

    fun Robot(name, uniqueID):
        new(name, uniqueID)

    var wall_e = Robot('Wall•E', 215)


### SUBJECT REPEAT SYNTACTIC SUGARS
    # return chain.
    var result = 8.plus(6).minus(4).times(2)

    # cascading notation
    # a convenience syntax in which the intial associated object forms a long chain of access.
    profile ..open() ..deleteMsgs() ..close()

    # function application piping
    buffer ..resize(13) |> ..fill(0, $)
    add(2, 3) |> sub($, 5) |> div(2, $)

    #@ infixl(5)
    fun |>(f, x): f(a)

    # call chain
    var nameList ## [Str]
    nameList.add ..('Badmus') ..('Travis') ..('Gabriel')

    # cascading dot
    a if |a == b|.size else b
    list.|[1] + [2] + [3]|

    # chain tupling
    # NOTE: tupling call chain and tail object chain returns an open tuple
    # however tupling cascading dot returns a closed tuple
    var name, version = haskell ..name, ..version
    var first, second = getPerson ..('Seamus'), ..('Flinn')
    print(john.|name, address|.toUppercase())

### COVARIANCE
    type Person(name, age)
    type Employee(<name, age>, job ) <: Person
    type Teacher(<name, age>, course) <: Person

    ## Person
    fun show(p): # a covariant parameter can take a subtype too.
        print((p.name, p.age))

    show Person('Tony Stark', 36)
    show Employee('Peter Parker', 17, 'Photographer')
    show Teacher('Diana Lane', 12, 'Biology')

    var people = [Person][Teacher(), Employee(), Employee()] # a covariant list.

### TYPE CASTING
    var radianInt = int(2 * pi) # the resulting value Float of 2*pi is casted to Int.

    fun employee(person): ## Person
        Employee(self..name, ..age)

    var deitel = Person('Paul Deitel', 57)
    var editor = employee dietel

    var yearStr = str 1990
    let sorted = int yearStr.sort()

### NAME ALIASES
    type Number = Integer|Float|Complex
    fun cheb    = chebyshevCoefficient
    let pi      = piConstant

### MODULES AND IMPORTS # NEEDS REVIEW!!!
    import math, dataframes { ... } # import all
    import math except { tan, atan } # import all except
    import nypro/../mymodule { pi, cos } # module path

    # namespace can help disambiguate imports
    import fastmath:nypro/math { cosine:cos, sine:sin, π:pi }
    let b = fastmath.tan(45)
    let d = cosine(30)

    # dynamic import
    # importing a module that is only available at runtime
    import !$(userFolder)/math {cos, sin}
    let userFolder = sys.userFolder
    # a copy of dynamic module must be in the lib folder

    # aggregate module
    # a single module can be split between different files by numbering them in certain way.
    # vector.ast, vector-1.ast, vector-2.ast, etc. all combine to a single module
    import vector

### EXPORT
    # Subjects, functions and types declared within the current module can be exported using
    # the 'export' keyword
    export { cos, sin, tan }

    # If only a single module element is being exported, the braces can be ommitted
    export sin

    # There can only be one export statement in a module and it is expected to be defined at the
    # bottom of the file
    import random {  }


### GENERICS
    # declaring a generic type T.
    fun add(a, b): ## $T, T -> T
        return a + b

    # where the type of the generic symbol is hinted, '$' can be ommitted from its declaration
    ## T, T, T -> T ~ T::Int
    fun add(a, b, c):
        var d ## T
        d = a + b + c

    var sum = add[Int](2, 4, 6)

    # if the generic arguments can be readily inferred, then type argument can be ommited.
    var sum = add(2, 4, 6)

    # value constraints
    # they allow the code to specify a range of values a subject should have,
    # and depending on the staticness of the subject, the an error will be thrown
    # at compile-time or runtime when the range or value is exceeded.
    var age ## Int(1:120) # age is constrained between 1 and 120
    var name ## s()::Str # s is any value constrained to Str

    # value constraints are subject declarations in their own right
    # and can cause name clashes

    # types can have generics too
    type MyList: ## $T, l() ~ l<:Int
        let list = List[T](l, 0)
        let size = l
    ..

    # nillable type
    let gender ## Str?

    var list = MyList[Int, 5]()

    # cascading type assertion
    ## ~ T.Element(<:Equatable, ::U.Element)
    fun anyCommonElements(lhs, rhs): ## |T, U|<:Sequence
        for litem in lhs, ritem in rhs:
            return true if litem == ritem
        return false

    # type reference
    ## MyList, Int -> T ~ T::MyList.T
    fun getItem(list, index):
        list[index]

    let identifier ## T<:Identfiable

    var pegasus ## U<:Horse&Bird

    # using the type of another variable
    var x = 10
    type T = x' #'
    var y ## T

    # unsure types
    ## !T, !U -> T # T and U could be the same types
    fun max(a, b):
        if a > b: return a
        else: return b

    ## T, $ -> $ ~ T<:Array
    fun map(array, f):
        (f(i) | i in array)

    # generics symbols
    # $X, !X, X.Y, ~, x(), Int?, T::U&V, |T,U|::X, T(<:X,::Y)

### TYPE OBJECTS
    Int <: Integer # true

    type Name = Str

    # distinct types vs aliases
    type Meter = val Int
    Meter(5) == Int(5) # false

    type Meter = ref Int
    Meter(5) == Int(5) # true

    fun haveSameTypes(x, y):
        x && y :: typeof x
    ..

### OPERATOR OVERLOADING
    # operators are special characters: +-/\&|=%$

    # you can call an operator like a function
    print(+(56, 5))

    # you can create a custom operator
    fun ++(x): #@ postfix(5)
        var t = val x
        x += 1
        t

    # certain special operators like [] and {} that can be overloaded with special names
    fun _getIndex(myList, index): ## MyList, Signed
        return myList.items[index]

    # you can make a function infix but not prefix or postfix
    fun in(x, y): #@ infixl(5, left)
        for a in y:
            return true if a == x
        false

    # special characters such as $=-/& etc., can be combined in deffernt ways to form new operators
    # but reserved characters like .,`@(){}[] can't

### TRY, EXCEPT & ENSURE
    if numerator && denominator == 0:
        raise DomainErr() # raising an exception.

    try:
        process bigData
    except err: #: DataCorruptionErr
        print err.msg
    ensure:
        restore bigData

    # An except body can be ommitted if it's only printing the error's message
    try:
        process bigData
    except err #: DataCorruptionErr

    # managed resource
    try process(bigData):
    except err: #: DivByZeroError
        print err.msg

    # managed resource with assignment
    try data = getData():
        use data

    # there is also defer block which can be put at the end of
    # a block for clean up
    defer: file.close()

    try, while line = file.readNextLine()?:
        print line
    except err: #: FileNotFounError
        print 'File missing!'

### SYMBOL
    # Symbols are static data types that hold their content as-is
    let symbol = $(2 + 3)

    # A symbol can be interpolated with another symbol using '\'
    let addition = $(let five = + \symbol)

    # A symbol can be evaluated with the 'eval' keyword
    eval addition

### REGEX
    # Regex are used to find and/or capture patterns in strings
    var numberPattern = /\d+(.\d+)?/
    numberPattern in 'π = 3.14159265' # true

    # Regex operations
    var = /\d/ ++ re.'\[a-z]' ++ /\d/ # Concatenation

### NON-STANDARD LITERAL
    # Non-standard literals allow users to use existing literals to define new literals.
    var number = 345'NGN #'
    var string = x."1, 2, 3, 4"
    var list = x.[1, 2, 3, 5]
    var object = x.{ name: 'Steve', age: 24 }
    let tuple = x.(name: 'Steve')
    let namedTuple = x.(name: 'Steve')

### COEFFICIENT EXPRESSION
    # Coefficient expression allows an identifier after a numeric literal to be taken as multiplication
    let x = 3 * f + 2 * (6 + 1)
    let x = 3f + 2(6 + 1) # same as above

    # Note: In the case of hex literal, coefficient expressions are not permitted
    let h = 0x344f # f is not considered a variable here, but part of the hex literal
    let h = 0x344j # Invalid!


### INTEGER BITWISE OPERATORS
    var x = 2 | 5 # and
    var y = 3 & 6 # or
    var z = ~6  # not
    var a = ^7  # exclusive or
    var b = a << b # bit shift left
    var c = b >> a # bit shift right

### POINTERS
    # Creating a pointer to a primitive object address
    let num = 55
    let pointer = ptr(num)

    # Setting value of pointed location
    pointer.value = 57

    # Change pointer address
    pointer.addr = 0xFFFE

    # Allocating memory on the heap
    let memory = malloc[Byte](5) # Allocates 5 bytes

    # Freeing memory
    free(memory) # Compile-time error will be throws if there is a possible dangling or pointer aliasing problem

### RESERVED KEYWORDS
    import, export, let, var, fun, type, abst, async, await,
    if, elif, else, while, for, try, except, eval
    return, raise, break, continue, yield, delegate, where

### PREDEFINED TYPE HIERARCHY
    Type
    Any
        Function
        Scalar
            Real
                Integer
                    Signed
                        Int, Int8, Int16, Int32, Int64,
                    Unsigned
                        UInt, UInt8, UInt16, UInt32, UInt64
                Float
                    Float32, Float64
            Complex
                Complex64, Complex128
            Bool
        Sequence
            List
            Array
            Range
            Indexer
            Tuple
            NamedTuple
            Dict
            Generator

### TYPE ASSERTION
    add(3, 4) :: (Int, Int) -> Int
    type Car(make, year) :: Type{Car}
    Car('', '') :: Car{Str, Str}