import { Cookies } from "react-cookie";

const cookies = new Cookies();

// export const setCookie = (name, value, options) => {
//   return cookies.set(name, value, [...option])
// }

export const getCookie = () => {
  return cookies.get(name);
}
