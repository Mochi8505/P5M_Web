import { encryptData, decryptData } from "./Encryptor.js";

// Kunci untuk penyimpanan
const USER_KEY = "activeUser";
const TOKEN_KEY = "jwtToken";

// ✅ Simpan data user + token
export const saveUserSession = (user, token) => {
  try {
    const encryptedUser = encryptData(JSON.stringify(user));
    localStorage.setItem(USER_KEY, encryptedUser);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    console.log("UserSession: Saved successfully");
  } catch (e) {
    console.error("UserSession: Failed to save", e);
  }
};

// ✅ Ambil data user
export const getUserSession = () => {
  const encryptedUser = localStorage.getItem(USER_KEY);
  if (!encryptedUser) {
    console.log("UserSession: No user session found");
    return null;
  }

  try {
    const decrypted = decryptData(encryptedUser);
    const user = JSON.parse(decrypted);
    return user;
  } catch (e) {
    console.error("UserSession: Failed to decrypt or parse user", e);
    return null;
  }
};

// ✅ Ambil token
export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ✅ Hapus session
export const clearUserSession = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  console.log("UserSession: Cleared successfully");
};
