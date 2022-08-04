const crypto = require("crypto");
const events = require("events");

// piece of code

class Text {
    static toKebabCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "-")
            .toLowerCase();
    }

    static toSnakeCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "_")
            .toLowerCase();
    }

    static toPascalCase(string) {
        return string.replace(/^([^\w]|_)|([^\w]|_)$/g, "").replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2) => $2.toUpperCase());
    }

    static toCamelCase(string) {
        return string.replace(/^([^\w]|_)|([^\w]|_)$/g, "").replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? $2.toLowerCase() : $2.toUpperCase()));
    }

    static toTitleCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i > 0 ? " " : "") + $2.toUpperCase());
    }

    static getMessage(message, regexp, ...data) {
        if (!(regexp instanceof RegExp)) {
            data = [regexp, ...data];
            regexp = /\<(\w+)\>/g;
        }
        const [object] = data;
        if (typeof object == "object") data = object;
        let i = -1;

        return message.replace(regexp, function ($, $1) {
            ++i;
            return data[$1] ?? data[i] ?? Object.values(data)[i] ?? "";
        });
    }

    static escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
// // Text
// //
// // Usage
// //
// var examples=[
//     'lorem ipsum dolor sit amet',//text
//     '-lorem-ipsum-dolor-sit-amet-',//invalid kebab case
//     '_lorem_ipsum_dolor_sit_amet_',//invalid snake case
//     ' Lorem Ipsum Dolor Sit Amet ',//invalid title case
//     ' LoremIpsumDolorSitAmet ',//invalid pascal case
//     ' loremIpsumDolorSitAmet ',//invalid camel case
// ]
// console.log(examples.map(Text.toKebabCase))
// console.log(examples.map(Text.toSnakeCase))
// console.log(examples.map(Text.toPascalCase))
// console.log(examples.map(Text.toCamelCase))
// console.log(examples.map(Text.toTitleCase))
// //
// var template='hi my name is <name>, and im from <city>'
// console.log(Text.getMessage(template))
// console.log(Text.getMessage(template,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,['ndiing','pacitan']))
// console.log(Text.getMessage(template,'ndiing','pacitan'))
// var template='hi my name is $name, and im from $city'
// var regexp=/\$(\w+)/g
// console.log(Text.getMessage(template,regexp))
// console.log(Text.getMessage(template,regexp,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,regexp,['ndiing','pacitan']))
// console.log(Text.getMessage(template,regexp,'ndiing','pacitan'))
// var template='hi my name is %s, and im from %s'
// var regexp=/(%s)/g
// console.log(Text.getMessage(template,regexp))
// console.log(Text.getMessage(template,regexp,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,regexp,['ndiing','pacitan']))
// console.log(Text.getMessage(template,regexp,'ndiing','pacitan'))
// //
// console.log(Text.escapeRegExp('at+cgmi\r\n'))

function structuredClone(object) {
    return JSON.parse(JSON.stringify(object));
    // return Object.assign({},object)
    // return { ...object };
}
// // structuredClone
// let data = { nama: 1 };
// let data2 = structuredClone(data);
// data.name = 2;
// console.log(data);
// console.log(data2);

class DateTime extends Date {
    get minMax() {
        return {
            YYYY: [this.YYYY, this.YYYY],
            M: [1, 12],
            D: [1, (() => 32 - new Date(this.YYYY, this.M - 1).getDate())()],
            H: [0, 23],
            m: [0, 59],
            s: [0, 59],
        };
    }

    constructor(...args) {
        super(...args);
        this.setValue();
        this.rate = {
            YYYY: 3.154e10,
            M: 2.628e9,
            W: 6.048e8,
            D: 8.64e7,
            H: 3.6e6,
            m: 60000,
            s: 1000,
        };
    }

    getKey(name) {
        return (
            {
                years: "YYYY",
                year: "YYYY",
                months: "M",
                month: "M",
                days: "D",
                day: "D",
                weeks: "W",
                week: "W",
                date: "W",
                hours: "H",
                hour: "H",
                minutes: "m",
                minute: "m",
                seconds: "s",
                second: "s",
            }[name] ?? name
        );
    }

    setValue(date = this) {
        this.YYYY = date.getFullYear();
        this.M = date.getMonth() + 1;
        this.D = date.getDate();
        this.H = date.getHours();
        this.m = date.getMinutes();
        this.s = date.getSeconds();
        this.YY = String(this.YYYY).slice(-2);
        this.MM = String(this.M).padStart(2, 0);
        this.DD = String(this.D).padStart(2, 0);
        this.HH = String(this.H).padStart(2, 0);
        this.mm = String(this.m).padStart(2, 0);
        this.ss = String(this.s).padStart(2, 0);

        if (this !== date) {
            this.setFullYear(this.YYYY);
            this.setMonth(this.M - 1);
            this.setDate(this.D);
            this.setHours(this.H);
            this.setMinutes(this.m);
            this.setSeconds(this.s);
        }
    }

    getValue() {
        return [this.YYYY, this.M - 1, this.D, this.H, this.m, this.s];
    }

    format(string = "") {
        return string.replace(/\b(YYYY|M|D|H|m|s|YY|MM|DD|HH|mm|ss)\b/g, ($, $1) => this[$1]);
    }

    add(value, name) {
        this.setValue(new Date(this.valueOf() + this.rate[this.getKey(name)]));
        return this;
    }

    substract(value, name) {
        this.setValue(new Date(this.valueOf() - this.rate[this.getKey(name)]));
        return this;
    }

    startOf(name) {
        const key = this.getKey(name);
        let skip = true;

        for (const name in this.minMax) {
            if (key == name) skip = false;
            if (skip) continue;
            this[name] = this.minMax[name][0];
        }
        this.setValue(new Date(...this.getValue()));
        return this;
    }

    endOf(name) {
        const key = this.getKey(name);
        let skip = true;

        for (const name in this.minMax) {
            if (key == name) skip = false;
            if (skip) continue;
            this[name] = this.minMax[name][1];
        }
        this.setValue(new Date(...this.getValue()));
        return this;
    }
}
// // DateTime
// var date = new DateTime();
// console.log(date.format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "weeks").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "week").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "W").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "weeks").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "week").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "W").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("year").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("month").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("day").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("hour").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("minute").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("second").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("year").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("month").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("day").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("hour").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("minute").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("second").format("YYYY-MM-DD HH:mm:ss"));

class Crypto {
    static encrypt(data, options = {}) {
        const { algorithm = "aes256", key = "", iv = "", chunk = data, encoding = "hex" } = options;
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        return Buffer.concat([cipher.update(chunk), cipher.final()]).toString(encoding);
    }

    static decrypt(data, options = {}) {
        const { algorithm = "aes256", key = "", iv = "", chunk = data, encoding = "hex" } = options;
        const cipher = crypto.createDecipheriv(algorithm, key, iv);
        return Buffer.concat([cipher.update(chunk, encoding), cipher.final()]).toString();
    }

    static privateEncrypt(data, options = {}) {
        const { privateKey = "", encoding = "hex" } = options;
        return crypto.privateEncrypt(privateKey, Buffer.from(data)).toString(encoding);
    }

    static publicDecrypt(data, options = {}) {
        const { publicKey = "", encoding = "hex" } = options;
        return crypto.publicDecrypt(publicKey, Buffer.from(data, encoding)).toString();
    }

    static publicEncrypt(data, options = {}) {
        const { publicKey = "", encoding = "hex" } = options;
        return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString(encoding);
    }

    static privateDecrypt(data, options = {}) {
        const { privateKey = "", encoding = "hex" } = options;
        return crypto.privateDecrypt(privateKey, Buffer.from(data, encoding)).toString();
    }

    static sign(data, options = {}) {
        const { algorithm = "sha256", encoding = "hex" } = options;
        const buffer = crypto.createSign(algorithm);
        buffer.update(data);
        buffer.end();
        return buffer.sign(privateKey, encoding);
    }

    static verify(data, signature, options = {}) {
        const { algorithm = "sha256", encoding = "hex" } = options;
        const buffer = crypto.createVerify(algorithm);
        buffer.update(data);
        buffer.end();
        return buffer.verify(privateKey, signature, encoding);
    }

    static base64Encode(data) {
        return Buffer.from(data).toString("base64");
    }

    static base64Decode(data) {
        return Buffer.from(data, "base64").toString();
    }

    static base64UrlEncode(data) {
        return Buffer.from(data).toString("base64url");
    }

    static base64UrlDecode(data) {
        return Buffer.from(data, "base64url").toString();
    }

    static hash(data, options = {}) {
        const { algorithm = "sha256", encoding = "hex" } = options;
        return crypto.createHash(algorithm).update(data).digest(encoding);
    }

    static hmac(data, options = {}) {
        const { algorithm = "sha256", key = "", encoding = "hex" } = options;
        return crypto.createHmac(algorithm, key).update(data).digest(encoding);
    }
}
// // Crypto
// //
// // Usage
// //
// var data = "message";
// var key = crypto.randomBytes(16).toString("hex");
// var iv = crypto.randomBytes(8).toString("hex");
// //
// var encrypted = Crypto.encrypt(data, { key, iv });
// console.log(encrypted)
// console.log(Crypto.decrypt(encrypted, { key, iv }));
// //
// var { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//         type: "spki",
//         format: "pem",
//     },
//     privateKeyEncoding: {
//         type: "pkcs8",
//         format: "pem",
//     },
// });
// var options={privateKey, publicKey}
// var data='message'
// //
// var encrypted = Crypto.privateEncrypt(data, options);
// console.log(encrypted);
// console.log(Crypto.publicDecrypt(encrypted, options));
// var encrypted = Crypto.publicEncrypt(data, options);
// console.log(encrypted);
// console.log(Crypto.privateDecrypt(encrypted, options));
// var signature=Crypto.sign(encrypted, options)
// console.log(signature);
// console.log(Crypto.verify(encrypted,signature, options));
// //
// var encoded=Crypto.base64Encode('message')
// console.log(encoded)
// console.log(Crypto.base64Decode(encoded))
// //
// var encoded=Crypto.base64UrlEncode('message')
// console.log(encoded)
// console.log(Crypto.base64UrlDecode(encoded))
// //
// console.log(Crypto.hash("password"));
// console.log(Crypto.hmac("password", { key: "secret" }));

class JWT {
    static encode(data, options = {}) {
        data = {
            // iss:'',// (Issuer) Claim
            // sub:'',// (Subject) Claim
            // aud:'',// (Audience) Claim
            exp: new DateTime().add(1, "minute").valueOf(), // (Expiration Time) Claim
            // nbf:'',// (Not Before) Claim
            iat: Date.now(), // (Issued At) Claim
            // jti:'',// (JWT ID) Claim
            ...data,
        };
        headers = Crypto.base64UrlEncode(JSON.stringify(headers));
        data = Crypto.base64UrlEncode(JSON.stringify(data));
        const signature = this.sign(`${headers}.${data}`, options);
        return `${headers}.${data}.${signature}`;
    }

    static decode(data, options = {}) {
        let headers;
        let signature;
        [headers, data, signature] = data.split(".");
        headers = JSON.parse(Crypto.base64UrlDecode(headers));
        data = JSON.parse(Crypto.base64UrlDecode(data));
        // signature
        return { headers, data, signature };
    }

    static sign(data, options = {}) {
        const { secret = "",headers: { alg='HS256' } = options.headers } = options;
        const algorithm = {
            HS256: "sha256",
            HS384: "sha384",
            HS512: "sha512",
        }[alg];
        let headers;
        let signature;
        [headers, data, signature] = data.split(".");
        return Crypto.hmac(`${headers}.${data}`, { algorithm, key: secret, encoding: "base64url" });
    }

    static verify(data, signature, options = {}, callback = function () {}) {
        const err = new Error();
        // signature?
        if (signature !== this.sign(data, options)) {
            err.code = "INVALID_SIGNATURE";
            err.message = "Invalid Signature";
            throw err;
        }

        // exp?
        ({ data } = this.decode(data));

        if (Date.now() > data.exp) {
            err.code = "EXPIRED_TOKEN";
            err.message = "Expired Token";
            throw err;
        }

        callback(data);

        return true;
    }
}
// // JWT
// //
// // Usage
// //
// var secret = "your-256-bit-secret";
// var headers = { alg: "HS256", typ: "JWT" };// alg=HS256/HS384/HS512
// var options = { headers, secret };
// var data = {
//     // sub: "1234567890",
//     // name: "John Doe",
//     // iat: 1516239022,
// };
// //
// var encoded = JWT.encode(data, options);
// // encoded = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTk1OTA1NDY0NDYsImlhdCI6MTY1OTU5MDQ4NjQ0OX0.v7Ze1oYNa1BazPJaRcvq2bOO1QOSvk8VaDHyLjMaw7w";
// console.log(encoded);
// console.log(JWT.decode(encoded));
// var signature = JWT.sign(encoded, options);
// console.log(signature);
// console.log(
//     JWT.verify(encoded, signature, options, async (data) => {
//         console.log(data);
//     })
// );

// console.log(Buffer.from('your-256-bit-secret').toString('base64'))
// console.log(Buffer.from('your-256-bit-secret').toString('base64url'))
// console.log(Buffer.from('your-256-bit-secret').toString('hex'))
// console.log(Buffer.from('your-256-bit-secret').toString('utf16le'))

class EventEmitter extends events {
    on(eventName, listener) {
        super.on(eventName.source ?? eventName, listener);
    }

    emit(eventName, ...args) {
        super.emit(eventName, ...args);

        for (const name in this._events) {
            const regexp = new RegExp("^" + name + "$");

            if (regexp.test(name) && eventName !== name) {
                super.emit(name, eventName, ...args);
            }
        }
    }
}
// // EventEmitter
// // events with regexp
// //
// // Usage
// const event = new EventEmitter();
// event.on("hi", console.log);
// event.on(".*", console.log);
// event.on(/.*/, console.log);
// event.emit("hi", "ndiing");

module.exports = {
    Text,
    DateTime,
    Crypto,
    JWT,
    EventEmitter,
};
