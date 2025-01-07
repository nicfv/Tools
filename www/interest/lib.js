/**
 * Calculate the final value.
 */
export function calc_F(P = 0, i = 0, n = 0, f = 0) {
    return P * (1 + i / 100 / f) ** (n * f);
}
/**
 * Calculate the initial value.
 */
export function calc_P(F = 0, i = 0, n = 0, f = 0) {
    return F * (1 + i / 100 / f) ** (-n * f);
}
/**
 * Calculate the annual interest rate.
 */
export function calc_i(F = 0, P = 0, n = 0, f = 0) {
    return 100 * f * ((F / P) ** (1 / (n * f)) - 1);
}
/**
 * Calculate the duration.
 */
export function calc_n(F = 0, P = 0, i = 0, f = 0) {
    return Math.log(F / P) / f / Math.log(1 + i / 100 / f);
}