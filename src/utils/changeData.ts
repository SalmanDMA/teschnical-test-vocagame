import CryptoJS from "crypto-js";

async function encryptDataManual(data: string): Promise<string> {
  return new Promise((resolve) => {
    const encryptedData = btoa(data); // Mengenkripsi data menggunakan base64
    const encryptedKey = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET_KEY;
    resolve(encryptedData + encryptedKey);
  });
}

async function decryptDataManual(encryptedData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const decryptedData = atob(encryptedData); // Mendekripsi data menggunakan base64;
      resolve(decryptedData);
    } catch (error) {
      reject("Invalid encrypted data"); // Mengembalikan pesan kesalahan jika terjadi kesalahan dekripsi
    }
  });
}

export { encryptDataManual, decryptDataManual };
