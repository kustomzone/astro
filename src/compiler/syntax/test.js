const { print } = require('../utils');
const Parser = require('./parser');

print('========= SPACES =========');

print('\t\t997890e747');
print(new Parser('\t\t997890e747').parseSpaces());

print(' \t997890e747');
print(new Parser(' \t997890e747').parseSpaces());

print('     997890e747');
print(new Parser('     997890e747').parseSpaces());

print('========= ARBITRARY TOKEN =========');

print(' var>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser(' var').parseToken('var')); // fail

print('funobj>>>>>>>>>>>>>>>>>>>>>>>>MID'); // mid
print(new Parser('funobj').parseToken('fun')); // mid

print('let');
print(new Parser('let').parseToken('let'));

print('var');
print(new Parser('var').parseToken('var'));

print('name');
print(new Parser('name').parseToken('name'));

print('========= EXPRESSION =========');

print('name');
print(new Parser('name').parseExpression());

print('4455');
print(new Parser('4455').parseExpression());

print('========= SUBJECT DECLARATION =========');

print('var 4 = age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('var 4 = age').parseSubjectDeclaration()); // fail

print('mut x = age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('mut x = age').parseSubjectDeclaration()); // fail

print('let x = $$$>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('let x = $$$').parseSubjectDeclaration()); // fail

print('var nim =age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('var nim =age').parseSubjectDeclaration()); // fail

print('var nim= age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('var nim= age').parseSubjectDeclaration()); // fail

print('let name = 678');
print(new Parser('let name = 678').parseSubjectDeclaration());

print('var _n77m_m=age');
print(new Parser('var _n77m_m=age').parseSubjectDeclaration());

print('========= FUNCTION DECLARATION =========');

print('fun 4() = age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('fun 4() = age').parseFunctionDeclaration()); // fail

print('mut x() = age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('mut x() = age').parseFunctionDeclaration()); // fail

print('fun x() = $$$>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('fun x() = $$$').parseFunctionDeclaration()); // fail

print('fun nim() =age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('fun nim() =age').parseFunctionDeclaration()); // fail

print('fun nim()= age>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('fun nim()= age').parseFunctionDeclaration()); // fail

print('fun name() = 678');
print(new Parser('fun name() = 678').parseFunctionDeclaration());

print('fun _n77m_m()=age');
print(new Parser('fun _n77m_m()=age').parseFunctionDeclaration());

print('fun _n77m_m ( ) = age');
print(new Parser('fun _n77m_m ( ) = age').parseFunctionDeclaration());

print('========= NAMES =========');

print(',some>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser(',some').parseNames()); // fail

print('20, 45>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('20, 45').parseNames()); // fail

print('some');
print(new Parser('some').parseNames());

print('the,new,age');
print(new Parser('the,new,age').parseNames());

print('the, _ew,_007');
print(new Parser('the, _ew,_007').parseNames());

print('========= TYPE DECLARATION =========');

print('typePerson>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('typePerson').parseTypeDeclaration()); // fail

print('type person(): var name = 4>>>>>>>>>>>>>>>>>>>>>>>>MID'); // mid
print(new Parser('type person(): var name = 4').parseTypeDeclaration()); // mid

print('type Person()');
print(new Parser('type Person()').parseTypeDeclaration());

print('type P_rson : var age = 6');
print(new Parser('type P_rson : var age = 6').parseTypeDeclaration());

print('type Hx99 <: Human, Animal: var age = 6');
print(new Parser('type Hx99 <: Human, Animal: var age = 6').parseTypeDeclaration());

print('type Waiter ( ) <: Human, Employee');
print(new Parser('type Waiter ( ) <: Human, Employee').parseTypeDeclaration());

print('========= INDENT =========');

print('     •>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('     •').parseIndent()); // fail

print('    •');
print(new Parser('    *').parseIndent());

print('========= SAMEDENT =========');

print(new Parser('').parseSamedent());

print('========= NEXTLINE =========');

print(String.raw`\n\n    \n        \r\n`);
print(new Parser('\n\n    \n        \r\n').parseNextLine());

print('========= EOI =========');

print(String.raw` 56>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser(' 56').parseEoi()); // fail

print(String.raw``);
print(new Parser('').parseEoi());

print('========= INTEGERBINARYLITERAL =========');

print(String.raw`01_01>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('01_01').parseIntegerBinaryLiteral()); // fail

print(String.raw`0b2_01>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0b2_01').parseIntegerBinaryLiteral()); // fail

print(String.raw`0b1_087>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b1_087').parseIntegerBinaryLiteral()); // mid

print(String.raw`0b0__11>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b0__11').parseIntegerBinaryLiteral()); // mid

print(String.raw`0b10011`);
print(new Parser('0b10011').parseIntegerBinaryLiteral());

print(String.raw`0b10_011_001`);
print(new Parser('0b10_011_001').parseIntegerBinaryLiteral());

print('========= INTEGEROCTALLITERAL =========');

print(String.raw`05_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('05_45').parseIntegerOctalLiteral()); // fail

print(String.raw`0o8_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0o8_45').parseIntegerOctalLiteral()); // fail

print(String.raw`0o1_087>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0o1_087').parseIntegerOctalLiteral()); // mid

print(String.raw`0o5__45>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0o5__45').parseIntegerOctalLiteral()); // mid

print(String.raw`0o5459`);
print(new Parser('0o5459').parseIntegerOctalLiteral());

print(String.raw`0o5_45_06`);
print(new Parser('0o5_45_06').parseIntegerOctalLiteral());

print('========= INTEGERHEXADECIMALLITERAL =========');

print(String.raw`0F_F6>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0F_F6').parseIntegerHexadecimalLiteral()); // fail

print(String.raw`0xG_FF>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0xG_FF').parseIntegerHexadecimalLiteral()); // fail

print(String.raw`0x1_9FG>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0x1_9FG').parseIntegerHexadecimalLiteral()); // mid

print(String.raw`0xf__FFE>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0xf__FFE').parseIntegerHexadecimalLiteral()); // mid

print(String.raw`0xffe5`);
print(new Parser('0xffe5').parseIntegerHexadecimalLiteral());

print(String.raw`0x5f_ee_0561`);
print(new Parser('0x5f_ee_0561').parseIntegerHexadecimalLiteral());

print('========= INTEGERDECIMALLITERAL =========');

print(String.raw`5__45>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('5__45').parseIntegerDecimalLiteral()); // mid

print(String.raw`05459`);
print(new Parser('05459').parseIntegerDecimalLiteral());

print(String.raw`5_45`);
print(new Parser('5_45').parseIntegerDecimalLiteral());

print(String.raw`5_45_09`);
print(new Parser('5_45_09').parseIntegerDecimalLiteral());

print('========= INTEGERLITERAL =========');

print(String.raw`0b_FF>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b_FF').parseIntegerLiteral()); // mid

print(String.raw`0F_F6>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0F_F6').parseIntegerLiteral()); // mid

print(String.raw`0x1_9FG>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0x1_9FG').parseIntegerLiteral()); // mid

print(String.raw`0b1__1011>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b1__1011').parseIntegerLiteral()); // mid

print(String.raw`0x1`);
print(new Parser('0x1').parseIntegerLiteral());

print(String.raw`0xffe5`);
print(new Parser('0xffe5').parseIntegerLiteral());

print(String.raw`0o56_77_074_667`);
print(new Parser('0o56_77_074_667').parseIntegerLiteral());

print(String.raw`056_77_074_667`);
print(new Parser('056_77_074_667').parseIntegerLiteral());

print('========= FLOATBINARYLITERAL =========');

print(String.raw`01_01.01>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('01_01.01').parseFloatBinaryLiteral()); // fail

print(String.raw`0b2e5_01>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0b2e5_01').parseFloatBinaryLiteral()); // fail

print(String.raw`0b1e1_087>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b1e1_087').parseFloatBinaryLiteral()); // mid

print(String.raw`0b0.101__11>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b0.101__11').parseFloatBinaryLiteral()); // mid

print(String.raw`0b1_10.01_110e-1_00`);
print(new Parser('0b1_10.01_110e-1_00').parseFloatBinaryLiteral());

print(String.raw`0b10_01e+1_001`);
print(new Parser('0b10_01e+1_001').parseFloatBinaryLiteral());

print('========= FLOATOCTALLITERAL =========');

print(String.raw`05_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('05_45').parseFloatOctalLiteral()); // fail

print(String.raw`0o8_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0o8_45').parseFloatOctalLiteral()); // fail

print(String.raw`0o5__.33_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0o5__.33_45').parseFloatOctalLiteral()); // fail

print(String.raw`0o1.7_0e487>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0o1.7_0e487').parseFloatOctalLiteral()); // mid

print(String.raw`0o5.7__e33_45>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0o5.7__e33_45').parseFloatOctalLiteral()); // mid

print(String.raw`0o54_33.59`);
print(new Parser('0o54_33.59').parseFloatOctalLiteral());

print(String.raw`0o5_45_0e+2_6`);
print(new Parser('0o5_45_0e+2_6').parseFloatOctalLiteral());

print('========= FLOATHEXADECIMALLITERAL =========');

print(String.raw`0F_F6>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0E_F6').parseFloatHexadecimalLiteral()); // fail

print(String.raw`0xG_FF>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0xG_FF').parseFloatHexadecimalLiteral()); // fail

print(String.raw`0x5__.33_45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0x5__.33_45').parseFloatOctalLiteral()); // fail

print(String.raw`0x1_23f.1_9FHG>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0x1_23f.1_9FHG').parseFloatHexadecimalLiteral()); // mid

print(String.raw`0xf.e5__FFE>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0xf.e5__FFE').parseFloatHexadecimalLiteral()); // mid

print(String.raw`0xff.01p-5A`);
print(new Parser('0xff.01p-5A').parseFloatHexadecimalLiteral());

print(String.raw`0x5f_ee.29_00p1_0561`);
print(new Parser('0x5f_ee.29_00p1_0561').parseFloatHexadecimalLiteral());

print('========= FLOATDECIMALLITERAL =========');

print(String.raw`5__45>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('5__45').parseFloatDecimalLiteral()); // fail

print(String.raw`05_67.5e+400.45>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('05_67.5e+400.45').parseFloatDecimalLiteral()); // mid

print(String.raw`.59e-11`);
print(new Parser('.59e-11').parseFloatDecimalLiteral());

print(String.raw`054.59`);
print(new Parser('054.59').parseFloatDecimalLiteral());

print(String.raw`5_4.0_33e-5_99`);
print(new Parser('5_4.0_33e-5_99').parseFloatDecimalLiteral());

print(String.raw`5_45_0.9`);
print(new Parser('5_45_0.9').parseFloatDecimalLiteral());

print(String.raw`5_45_0e9`);
print(new Parser('5_45_0e9').parseFloatDecimalLiteral());

print('========= FLOATLITERAL =========');

print(String.raw`ff.56_FF>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('ff.56_FF').parseFloatLiteral()); // fail

print(String.raw`0b0.11_FF>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b0.11_FF').parseFloatLiteral()); // mid

print(String.raw`02.2eF_F6>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('02.2eF_F6').parseFloatLiteral()); // mid

print(String.raw`0x1ffe-2_9FG>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0x1ffe-2_9FG').parseFloatLiteral()); // mid

print(String.raw`0b1__1011>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('0b1__1011').parseFloatLiteral()); // mid

print(String.raw`0x10.56_p5`);
print(new Parser('0x10.56_p5').parseFloatLiteral());

print(String.raw`0b1_10.01_110e-1_00`);
print(new Parser('0b1_10.01_110e-1_00').parseFloatBinaryLiteral());

print(String.raw`0xffep5`);
print(new Parser('0xffep5').parseFloatLiteral());

print(String.raw`0o56_77_0.74_66e7`);
print(new Parser('0o56_77_0.74_66e7').parseFloatLiteral());

print(String.raw`056_77_0.74_667`);
print(new Parser('056_77_0.74_667').parseFloatLiteral());

print('========= NUMERICLITERAL =========');

print(String.raw`ff.56_FF>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('ff.56_FF').parseNumericLiteral()); // fail

print(String.raw`.59e+11`);
print(new Parser('.59e+11').parseNumericLiteral());

print(String.raw`054.59`);
print(new Parser('054.59').parseNumericLiteral());

print(String.raw`0x5f_ee.29_00p1_0561`);
print(new Parser('0x5f_ee.29_00p1_0561').parseNumericLiteral());

print(String.raw`0o54_33.59`);
print(new Parser('0o54_33.59').parseNumericLiteral());

print(String.raw`0o5_45_06`);
print(new Parser('0o5_45_06').parseNumericLiteral());

print(String.raw`0x5`);
print(new Parser('0x5').parseNumericLiteral());

print(String.raw`0b10_011_001`);
print(new Parser('0b10_011_001').parseNumericLiteral());

print('========= COEFFICIENTEXPRESSION =========');

print(String.raw`0x55f>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0x55f').parseCoefficientExpression()); // fail

print(String.raw`0x55.afj>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0x55.afj').parseCoefficientExpression()); // fail

print(String.raw`0b01>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0b01').parseCoefficientExpression()); // fail

print(String.raw`02.455f_name2+>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('02.455f_name2+').parseCoefficientExpression()); // mid

print(String.raw`0b01_1e11e`);
print(new Parser('0b01_1e11e').parseCoefficientExpression());

print(String.raw`02.2e002e`);
print(new Parser('02.2e002e').parseCoefficientExpression());

print(String.raw`0b1__1011`);
print(new Parser('0b1__1011').parseCoefficientExpression());

print(String.raw`0o775o`);
print(new Parser('0o775o').parseCoefficientExpression());

print('========= BOOLEANLITERAL =========');

print(String.raw`0true>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0true').parseBooleanLiteral()); // fail

print(String.raw`_false>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('_false').parseBooleanLiteral()); // mid

print(String.raw`truename>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('truename').parseBooleanLiteral()); // mid

print(String.raw`false20>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('false20').parseBooleanLiteral()); // mid

print(String.raw`true`);
print(new Parser('true').parseBooleanLiteral());

print(String.raw`false`);
print(new Parser('false').parseBooleanLiteral());

print('========= NONAME =========');

print(String.raw`0true>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('0true').parseNoName()); // fail

print(String.raw`_false>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('_false').parseNoName()); // mid

print(String.raw`_`);
print(new Parser('_').parseNoName());

print('========= IDENTIFIER =========');

print(String.raw` name>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser(' name').parseIdentifier()); // fail

print('>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser('').parseIdentifier()); // fail

print(String.raw`99name>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('99name').parseIdentifier()); // fail

print(String.raw`name__55 nom>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('name__55  nom').parseIdentifier()); // mid

print(String.raw`_na99_me_`);
print(new Parser('_na99_me_').parseIdentifier());

print('========= OPERATOR =========');

print(' -*=>>>>>>>>>>>>>>>>>>>>>>>>FAIL'); // fail
print(new Parser(' -*=').parseOperator()); // fail

print(String.raw`)++>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser(')++').parseOperator()); // fail

print(String.raw`%^&_nom>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('%^&_nom').parseOperator()); // mid

print(String.raw`=`);
print(new Parser('=').parseOperator());

print(String.raw`++/-`);
print(new Parser('++/-').parseOperator());

print('========= CHARSNONEWLINEORSINGLEQUOTE =========');

print(String.raw`>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser('').parseCharsNoNewlineOrSinglequote()); // fail

print(String.raw`'>>>>>>>>>>>>>>>>>>>>>>>>FAIL`); // fail
print(new Parser("'").parseCharsNoNewlineOrSinglequote()); // fail

print(String.raw`nam:e2*9s)!@'@34>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser("nam:e2*9s)!@'@34").parseCharsNoNewlineOrSinglequote()); // mid

print(String.raw`nam:e2*9s)!@\n>>>>>>>>>>>>>>>>>>>>>>>>MID`); // mid
print(new Parser('nam:e2*9s)!@\n').parseCharsNoNewlineOrSinglequote()); // mid

print(String.raw`25fse?w&$32"67`);
print(new Parser('25fse?w&$32"67').parseCharsNoNewlineOrSinglequote());

