import Big from 'big.js'
import { Expression } from "json-to-equation";

function isObject(value: any) {
    return typeof value === 'object' && value !== null && !isArray(value);
}

function isArray(value: any) {
    return typeof value === 'object' && Array.isArray(value)
}

const evaluateExpression = (expression: Expression): Big => {
    if (!isObject(expression) || Object.keys(expression).length !== 1) {
        throw new Error('Invalid root expression. Expected an object with a single key.')
    }

    for (let [operator, values] of Object.entries(expression)) {
        switch (operator) {
            case '$add':
                if (typeof values === 'object' && isArray(values)) {
                    const [op1 = 0, op2 = 0] = values

                    if (!values.length) throw new Error('At least one operand is required for addition.');
                    if (values.length > 2) throw new Error('Only up to two operands are supported for addition.');


                    if (isObject(op1) && typeof op2 === 'number') {
                        return evaluateExpression(op1).plus(new Big(op2))
                    }

                    if (isObject(op2) && typeof op1 === 'number') {
                        return new Big(op1).plus(evaluateExpression(op2))
                    }

                    if (isObject(op1) && isObject(op2)) {
                        return evaluateExpression(op1).plus(evaluateExpression(op2))
                    }

                    return new Big(op1).plus(new Big(op2))
                }
            case '$sub':
                if (typeof values === 'object' && isArray(values)) {
                    const [op1 = 0, op2 = 0] = values

                    if (!values.length) throw new Error('At least one operand is required for subtraction.');
                    if (values.length > 2) throw new Error('Only up to two operands are supported for subtraction.');


                    if (isObject(op1) && typeof op2 === 'number') {
                        return evaluateExpression(op1).minus(new Big(op2))
                    }

                    if (isObject(op2) && typeof op1 === 'number') {
                        return new Big(op1).minus(evaluateExpression(op2))
                    }

                    if (isObject(op1) && isObject(op2)) {
                        return evaluateExpression(op1).minus(evaluateExpression(op2))
                    }

                    return new Big(op1).minus(new Big(op2))
                }
            case '$mul':
                if (typeof values === 'object' && isArray(values)) {
                    const [op1 = 1, op2 = 1] = values
                    if (!values.length) throw new Error('At least one operand is required for multiplication.');
                    if (values.length > 2) throw new Error('Only up to two operands are supported for multiplication.');


                    if (isObject(op1) && typeof op2 === 'number') {
                        return evaluateExpression(op1).mul(new Big(op2))
                    }

                    if (isObject(op2) && typeof op1 === 'number') {
                        return new Big(op1).mul(evaluateExpression(op2))
                    }

                    if (isObject(op1) && isObject(op2)) {
                        return evaluateExpression(op1).mul(evaluateExpression(op2))
                    }

                    return new Big(op1).mul(new Big(op2))
                }
            case '$div':
                if (typeof values === 'object' && isArray(values)) {
                    const [op1 = 1, op2 = 1] = values

                    if (!values.length) throw new Error('At least one operand is required for division.');
                    if (values.length > 2) throw new Error('Only up to two operands are supported for division.');

                    if (isObject(op1) && typeof op2 === 'number') {
                        return evaluateExpression(op1).div(new Big(op2))
                    }

                    if (isObject(op2) && typeof op1 === 'number') {
                        return new Big(op1).div(evaluateExpression(op2))
                    }

                    if (isObject(op1) && isObject(op2)) {
                        return evaluateExpression(op1).div(evaluateExpression(op2))
                    }

                    return new Big(op1).div(new Big(op2))
                }
            case '$exp':
                if (typeof values === 'object' && isArray(values)) {
                    const [op1 = 1, op2 = 1] = values

                    if (!values.length) throw new Error('At least one operand is required for exponentiation.');
                    if (values.length > 2) throw new Error('Only up to two operands are supported for exponentiation.');

                    if (isObject(op1) && typeof op2 === 'number') {
                        return new Big(evaluateExpression(op1)).pow(op2)
                    }

                    if (isObject(op2) && typeof op1 === 'number') {
                        return new Big(op1).pow(evaluateExpression(op2).toNumber())
                    }

                    if (isObject(op1) && isObject(op2)) {
                        return new Big(evaluateExpression(op1)).pow(evaluateExpression(op2).toNumber())
                    }
                    return new Big(op1).pow(op2)
                }
            default:
                throw new Error('Unsupported operator. Please use one of the following: $add, $sub, $mul, $div, $exp.');
        }
    }

    return new Big(0);
}

export const evaluate = (expression: Expression): number => {
    return evaluateExpression(expression).toNumber()
}