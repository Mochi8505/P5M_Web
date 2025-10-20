// util/Encryptor.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "mySecretKey123";

export const encryptId = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptId = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// ✅ Alias untuk backward compatibility
export const encryptData = encryptId;
export const decryptData = decryptId;
