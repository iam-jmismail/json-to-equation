import { Expression } from 'json-to-equation';
import { evaluate } from './evaluate';

describe('evaluate', () => {
    it('should add two numbers', () => {
        const expression: Expression = { $add: [1, 2] };
        const result = evaluate(expression);
        expect(result.toString()).toBe('3');
    });

    it('should multiply nested expressions', () => {
        const expression: Expression = {
            $mul: [
                { $add: [1, 2] },
                { $sub: [10, 5] }
            ]
        };
        const result = evaluate(expression);
        expect(result.toString()).toBe('15');
    });

    it('should handle complex nested expressions', () => {
        const expression: Expression = {
            $add: [
                100,
                {
                    $mul: [
                        { $add: [1, 2] },
                        5
                    ]
                }
            ]
        };
        const result = evaluate(expression);
        expect(result.toString()).toBe('115');
    });

    it('should evaluate nested exponentiation', () => {
        const expression: Expression = {
            $exp: [
                { $add: [2, 3] },
                2
            ]
        };
        const result = evaluate(expression);
        expect(result.toString()).toBe('25'); // (2 + 3)^2
    });

    it('should handle a mix of all operators', () => {
        const expression: Expression = {
            $div: [
                {
                    $mul: [
                        { $sub: [20, 5] },
                        { $add: [2, 3] }
                    ]
                },
                {
                    $exp: [2, 2]
                }
            ]
        };
        const result = evaluate(expression);
        expect(result.toString()).toBe('18.75'); // ((20 - 5) * (2 + 3)) / (2^2)
    });

    it('should process deeply nested expressions', () => {
        const expression: Expression = {
            $add: [
                10,
                {
                    $sub: [
                        {
                            $mul: [
                                2,
                                {
                                    $div: [
                                        { $exp: [2, 3] },
                                        4
                                    ]
                                }
                            ]
                        },
                        5
                    ]
                }
            ]
        };
        const result = evaluate(expression);
        expect(result.toString()).toBe('9'); // 10 + ((2 * (2^3 / 4)) - 5)
    });

});
