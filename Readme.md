json-to-equation, a light weight library leveraging big.js to perform precise arithmetic operations using json notation.

##  Features 
- JSON-Based Expressions: Perform arithmetic operations using JSON notation for easy and readable mathematical expressions.
- Expressions are tree strcutured, can be nested to any levels.
- Support for Common Operators: Includes support for addition, subtraction, multiplication, division, and exponentiation.
- Provides accurate values for important mathematical constants.
- Big Number Precision: Utilizes [big.js](https://github.com/MikeMcl/big.js/) for high-precision arithmetic calculations.

## Installation
```sh 
npm install json-to-equation --save
```

## Usage

### Importing the Library
```ts
import { Constants, evaluate } from 'json-to-equation';
```

### Basic Expressions
```ts
console.log(evaluate({
  $add: [15,5]
})); // Output: 15

console.log(evaluate({
    $add: [100, {
        $mul: [
            {
                $add: [1, 2]
            }, // Result : 3 
            {
                $exp : [10, 2]
            } // Result : 100 
        ] // Result : 400 
    }]
})) // Output: 400
```

### Complex Expressions
Express complex equations in JSON notation.

![Newtons Law of Gravity](https://www.gstatic.com/education/formulas2/553212783/en/newton_s_law_of_universal_gravitation.svg)

Newtons law of universal gravitation can be expressed as: 

```ts 
import { Constants, evaluate } from 'json-to-equation';

const m1 = 10; 
const m2 = 20;
const r = 12

console.log(evaluate({
    $mul : [
        Constants.Physics.G, // Universal Gravitational Constant
        {
            $div : [
                {
                    $mul : [m1, m2]
                },
                 {
                    $mul : [r, r]
                },
            ]
        }
    ]
})) 
```

### Expression Formats
- Expressions should be provided as objects with a single key representing the operator, and an array of operands which can be numbers or nested expressions.
- The operhands array can contain only two values, which can be either a value or another nested expression, so that it can always be respresented as an expression tree.

####  Valid Expressions
```js
// 1 + 2 
const  addingTwoNumbers = evaluate({
    $add : [1,2] // Result =  3 
})

// 1 + ( 2 + 3 )
const  addingThreeNumbers = evaluate({
    $add : [1, {
        $add : [2,3] // Result = 5
    }] // Result = 6
})

// 10 * 6
const multiplicationExample= evaluate({
    $mul : [10, 6] // Result = 60
})

// 2 * 10^2
const multiplicationAndExponent= evaluate({
    $mul : [2, {
        $exp : [10,2]
    }]
})
```

#### Invalid Expressions 
```js 
// The Wrong Way  
const  addingThreeNumbers = evaluate({
    $add : [1,2,3] // Error : Operhands array can have only two values
})

// The Correct Way
const  addingThreeNumbers = evaluate({
    $add : [1, {
        $add : [2,3]
    }] // Result = 6 , Note: Operhands array right now have two values 
})
```

### Supported Operators
- $add: Adds two numbers or expressions.
- $sub: Subtracts the second number or expression from the first.
- $mul: Multiplies two numbers or expressions.
- $div: Divides the first number or expression by the second.
- $exp: Raises the first number or expression to the power of the second

### Constants 

### Accessing Constants
```ts
import { Constants } from 'json-to-equation';

console.log(Constants.Physics.C); // Output: Speed of light - 299792458
console.log(Constants.Math.PI);   // Output: Pi - 3.141592653589793
console.log(Constants.Math.PI);   // Output: Faraday constant - 96485.33212
```

#### Physics 

| Symbol | Definition                                    | Accessor                |
|--------|-----------------------------------------------|---------------------|
| \( C \) | Speed of light in vacuum (m/s)              | `Constants.Physics.C` |
| \( G \) | Newton's Universal Gravitation Constant (m³ kg⁻¹ s⁻²) | `Constants.Physics.G` |
| \( h \) | Planck's constant (J s)                      | `Constants.Physics.h` |
| \( e \) | Elementary charge (C)                        | `Constants.Physics.e` |
| \( \epsilon_0 \) | Vacuum permittivity (F/m)              | `Constants.Physics.epsilon_0` |
| \( \alpha \) | Fine-structure constant (dimensionless)  | `Constants.Physics.alpha` |

#### Maths 

| Symbol | Definition                        | Accessor               |
|--------|-----------------------------------|---------------------|
| \( \pi \) | Pi                             | `Constants.Math.PI` |
| \( e \) | Euler's number                  | `Constants.Math.e`  |
| \( \phi \) | Golden ratio                  | `Constants.Math.phi` |
| \( \sqrt{2} \) | Square root of 2          | `Constants.Math.sqrt2` |
| \( \ln(2) \) | Natural logarithm of 2     | `Constants.Math.ln2` |
| \( \ln(10) \) | Natural logarithm of 10   | `Constants.Math.ln10` |

#### Chemistry

| Symbol | Definition                                      | Accessor                   |
|--------|-------------------------------------------------|------------------------|
| \( N_A \) | Avogadro's number (1/mol)                    | `Constants.Chemistry.N_A` |
| \( R \) | Gas constant (J/(mol·K))                       | `Constants.Chemistry.R` |
| \( k \) | Boltzmann constant (J/K)                       | `Constants.Chemistry.k` |
| \( F \) | Faraday constant (C/mol)                       | `Constants.Chemistry.F` |
| \( V_m \) | Molar volume of an ideal gas at STP (m³/mol) | `Constants.Chemistry.V_m` |
| \( \Delta H_f \) | Standard enthalpy of formation for water (kJ/mol) | `Constants.Chemistry.deltaH_f` |


### License
This project is licensed under the MIT License.