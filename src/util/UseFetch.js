// src/util/UseFetch.js
import { decryptId } from "./Encryptor.js";
import API_BASE_URL from "./Constant.js";

const fetchData = async (url, param = {}, method = "POST") => {
  let activeUser = "";
  let response;

  // Ambil data user dan token dari localStorage browser
  const cookie = localStorage.getItem("activeUser");
  const jwtToken = localStorage.getItem("jwtToken");

  if (cookie) {
    try {
      activeUser = JSON.parse(decryptId(cookie)).username;
    } catch (e) {
      console.error("Failed to parse cookie:", e);
    }
  }

  try {
    if (method === "POST") {
      const paramToSend = {
        ...param,
        activeUser: activeUser === "" ? undefined : activeUser,
      };

      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(paramToSend),
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken && { Authorization: "Bearer " + jwtToken }),
        },
      });
    } else if (method === "GET") {
      response = await fetch(url, {
        headers: {
          ...(jwtToken && { Authorization: "Bearer " + jwtToken }),
        },
      });
    }

    const result = await response.json();
    return response.ok ? result : "ERROR";
  } catch (err) {
    console.error("Fetch error:", err);
    return "ERROR";
  }
};

export default fetchData;
