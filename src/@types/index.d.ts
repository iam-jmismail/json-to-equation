

declare module "json-to-equation" {
    export type OPERATORS = "$add" | "$sub" | "$mul" | "$div" | "$exp";
    export function evaluate(expression: Expression): number

    // Useful constants
    export const Constants: {
        Physics: {
            C: number;
            G: number;
            h: number;
            e: number;
            epsilon_0: number;
            alpha: number;
        };
        Math: {
            PI: number;
            e: number;
            phi: number;
            sqrt2: number;
            ln2: number;
            ln10: number;
        };
        Chemistry: {
            N_A: number;
            R: number;
            k: number;
            F: number;
            V_m: number;
            deltaH_f: number;
        };
    }

    export interface Expression {
        $add?: (number | Expression)[];
        $sub?: (number | Expression)[];
        $mul?: (number | Expression)[];
        $div?: (number | Expression)[];
        $exp?: (number | Expression)[];
    }

}
