/* eslint-disable */
import CryptoJS from 'crypto-js'

export function aesEncodeBase64(str) {
    var key = PaddingLeft(process.env.VUE_APP_AES_KEY, 32);
    key = CryptoJS.enc.Utf8.parse(key);
    console.log("key", key)
    var encryptedData = CryptoJS.AES.encrypt(str, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.ciphertext.toString(CryptoJS.enc.Base64)
}

export function aesDecryptBase64(str) {
    const srcs = CryptoJS.enc.Utf8.parse(atob(str))
    const KEY = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_KEY) // ''中与后台一样  密码
    var encryptedData = CryptoJS.AES.encrypt(srcs, KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.toString();
}

function PaddingLeft(key, length) {
    let pkey = key.toString();
    let l = pkey.length;
    if ( l < length ) {
        pkey = new Array(length - l + 1).join('0') + pkey;
    } else if ( l > length ) {
        pkey = pkey.slice(length);
    }
    return pkey;
}