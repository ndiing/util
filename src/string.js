/**
 * Mengubah string menjadi format PascalCase.
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format PascalCase.
 */
function toPascalCase(string){
    return string
    .replace(/([A-Z])([A-Z]+)/g,($,$1,$2)=>{
        return $1+$2.toLowerCase()
    })
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g,($,$1,$2)=>{
        return $2.toUpperCase()
    })
    .replace(/[^a-zA-Z0-9]+$/g,'')
}
/**
 * Mengubah string menjadi format camelCase.
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format camelCase.
 */
function toCamelCase(string){
    return string
    .replace(/([A-Z])([A-Z]+)/g,($,$1,$2)=>{
        return $1+$2.toLowerCase()
    })
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g,($,$1,$2,$xx)=>{
        return $xx===0?$2.toLowerCase():$2.toUpperCase()
    })
    .replace(/[^a-zA-Z0-9]+$/g,'')
}
/**
 * Mengubah string menjadi format snake_case.
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format snake_case.
 */
function toSnakeCase(string){
    return string
    .replace(/([A-Z])([A-Z]+)/g,($,$1,$2)=>{
        return $1+$2.toLowerCase()
    })
    .replace(/([a-z])([A-Z])/g,($,$1,$2)=>{
        return $1+'_'+$2
    })
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g,($,$1,$2,$xx)=>{
        return '_'+$2
    })
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,'')
    .toLowerCase()
}
/**
 * Mengubah string menjadi format kebab-case.
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format kebab-case.
 */
function toKebabCase(string){
    return string
    .replace(/([A-Z])([A-Z]+)/g,($,$1,$2)=>{
        return $1+$2.toLowerCase()
    })
    .replace(/([a-z])([A-Z])/g,($,$1,$2)=>{
        return $1+'-'+$2
    })
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g,($,$1,$2,$xx)=>{
        return '-'+$2
    })
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,'')
    .toLowerCase()
}
/**
 * Mengubah string menjadi format Title Case.
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format Title Case.
 */
function toTitleCase(string){
    return string
    .replace(/([A-Z])([A-Z]+)/g,($,$1,$2)=>{
        return $1+$2.toLowerCase()
    })
    .replace(/([a-z])([A-Z])/g,($,$1,$2)=>{
        return $1+' '+$2
    })
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g,($,$1,$2,$xx)=>{
        return ' '+($2.toUpperCase())
    })
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,'')
}

// var data=[
//     'PascalCasePascalCASE',
//     'camelCaseCamelCASE',
//     'snake_case_snake_CASE',
//     'kebab-case-kebab-CASE',
//     'Title Case Title CASE',

//     '-PascalCasePascalCASE-',
//     '--camelCaseCamelCASE--',
//     '_snake_case_snake_CASE_',
//     '__kebab-case-kebab-CASE__',
//     '-_Title Case Title CASE-_',
// ]

// console.log(data.map(string=>toPascalCase(string)))
// console.log(data.map(string=>toCamelCase(string)))
// console.log(data.map(string=>toSnakeCase(string)))
// console.log(data.map(string=>toKebabCase(string)))
// console.log(data.map(string=>toTitleCase(string)))

module.exports={
    toPascalCase,
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    toTitleCase,
}