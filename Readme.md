json-to-equation, a robust library leveraging big.js to perform precise arithmetic operations using json notation.

##  Features 

- Big Number Precision: Utilizes [Big.js](https://github.com/MikeMcl/big.js/) for high-precision arithmetic calculations.
- JSON-Based Expressions: Perform arithmetic operations using JSON notation for easy and readable mathematical expressions.
- Support for Common Operators: Includes support for addition, subtraction, multiplication, division, and exponentiation.

## Installation
```sh 
npm install json-to-equation --save
```


## Usage

### Importing the Library
```ts
import { Constants, evaluateExpression } from 'json-to-equation';
```

### Accessing Constants
```ts
console.log(Constants.Physics.C); // Output: Speed of light in vacuum
console.log(Constants.Math.PI);   // Output: Pi
```

### Evaluating Expressions
```ts
console.log(evaluate({
  $add: { a: 5, b: 10 }
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

### Expression Formats
Expressions should be provided as objects with a single key representing the operator, and an array of operands which can be numbers or nested expressions.


### Supported Operators
- $add: Adds two numbers or expressions.
- $sub: Subtracts the second number or expression from the first.
- $mul: Multiplies two numbers or expressions.
- $div: Divides the first number or expression by the second.
- $exp: Raises the first number or expression to the power of the second


### License
This project is licensed under the MIT License.