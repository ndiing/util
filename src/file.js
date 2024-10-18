const path = require("path");
const fs = require("fs");

/**
 * @module file
 */

/**
 * Membaca konten dari file dengan nama yang diberikan.
 *
 * @memberof module:file
 * @param {string} filename - Nama file yang akan dibaca.
 * @returns {string|null} - Mengembalikan konten file dalam bentuk string atau `null` jika terjadi kesalahan.
 */
function read(filename) {
    let data;
    try {
        data = fs.readFileSync(filename, { encoding: "utf8" });
    } catch (error) {}
    return data;
}

/**
 * Menulis data ke file dengan nama yang diberikan.
 * Jika direktori tidak ada, direktori akan dibuat.
 *
 * @memberof module:file
 * @param {string} filename - Nama file di mana data akan ditulis.
 * @param {string} data - Konten yang akan ditulis ke file.
 */
function write(filename, data) {
    const dirname = path.dirname(filename);
    try {
        fs.readdirSync(dirname);
    } catch (error) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(filename, data);
}

module.exports = {
    read,
    write,
};
