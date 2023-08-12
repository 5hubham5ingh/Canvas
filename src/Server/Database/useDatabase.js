import { ERROR } from "../error";
import lzString from 'lz-string';

export function setData(key, value) {
  const dataString = lzString.compress(JSON.stringify(value));

  try {
    localStorage.setItem(key, dataString);
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      return ERROR.DATABASE_FULL;
    }
  }
}

export function getData(key) {
  const data = lzString.decompress(localStorage.getItem(key));
  if (data === null) return null;
  else return JSON.parse(data);
}

export function deleteAccount(accountName) {
  localStorage.removeItem(accountName);
}
