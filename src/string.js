/**
 * @module string
 */

/**
 * Mengubah string menjadi format PascalCase.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format PascalCase.
 */
function toPascalCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2) => {
            return $2.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]+$/g, "");
}

/**
 * Mengubah string menjadi format camelCase.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format camelCase.
 */
function toCamelCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return $xx === 0 ? $2.toLowerCase() : $2.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]+$/g, "");
}

/**
 * Mengubah string menjadi format snake_case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format snake_case.
 */
function toSnakeCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + "_" + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return "_" + $2;
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}

/**
 * Mengubah string menjadi format kebab-case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format kebab-case.
 */
function toKebabCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + "-" + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return "-" + $2;
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}

/**
 * Mengubah string menjadi format Title Case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format Title Case.
 */
function toTitleCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + " " + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return " " + $2.toUpperCase();
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
}

module.exports = {
    toPascalCase,
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    toTitleCase,
};
