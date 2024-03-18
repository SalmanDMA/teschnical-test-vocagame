import { decryptDataManual } from "./changeData";

export async function changeCookieKeysToIterable(cookies: any) {
  const cookieKeys: Record<string, string>[] = Object.keys(cookies).map(
    (key) => {
      return {
        name: key,
        value: cookies[key],
      };
    },
  );
  return cookieKeys;
}

// Mendekripsi semua kunci dan nilai dalam cookies
// Console.log satu satu kalau lupa
export async function findCookieKeys(cookies: any): Promise<string[]> {
  const cookieKeys: Record<string, Record<string, string>> = {};
  for (const cookie of cookies) {
    const decryptedKey = await decryptDataManual(cookie.name);
    let decryptedCookiesValue: Record<string, string> = {};
    const parsedValue = JSON.parse(cookie.value);
    for (const key in parsedValue) {
      const decryptedKey = await decryptDataManual(key);
      const decryptedValue = await decryptDataManual(
        JSON.stringify(parsedValue[key]),
      );
      decryptedCookiesValue[decryptedKey] = decryptedValue;
    }

    cookieKeys[decryptedKey] = decryptedCookiesValue;
  }
  return Object.keys(cookieKeys);
}

// Memeriksa apakah kunci "user" ada di antara cookies yang telah didekripsi
export function checkUserKeys(cookieKeys: string[]): boolean {
  const userKeysRegister = cookieKeys.filter((key) =>
    key.startsWith("userRegister"),
  );
  const userKeysLogin = cookieKeys.filter((key) => key.startsWith("userLogin"));

  let result = false;
  if (userKeysRegister.length > 0) {
    result = false;
  } else if (userKeysLogin.length > 0) {
    result = true;
  } else if (userKeysRegister.length > 0 && userKeysLogin.length > 0) {
    result = true;
  } else {
    result = false;
  }
  return result;
}
