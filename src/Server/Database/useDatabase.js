import { ERROR } from "../error";
import { ACTION } from "./actions";
import { QUERIES } from "./queries";

export function setData(key, value) {
  const dataString = JSON.stringify(value);

  try {
    localStorage.setItem(key, dataString);
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      return ERROR.DATABASE_FULL;
    }
  }
}

export function getData(key) {
  const data = localStorage.getItem(key);
  if (data === null) return null;
  else return JSON.parse(data);
}