/**
 * Check if a math equation string is numerically valid.
 */
export function isValid(eq = '') {
    const parts = eq.replace('^', '**').split('='),
        evals = [];
    for (let i in parts) {
        try {
            evals[i] = eval(parts[i]);
        } catch (e) {
            return false;
        }
        if (i > 0 && evals[i] !== evals[i - 1]) {
            return false;
        }
    }
    return true;
}