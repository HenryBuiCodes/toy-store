import { AUTH_TOKEN, USER_ID, USER_NAME } from "../constant";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID);
};

export const setUserId = (userId) => {
  if (userId) {
    localStorage.setItem(USER_ID, userId);
  }
};

export const getUserName = () => {
  return localStorage.getItem(USER_NAME);
};

export const setUserName = (userName) => {
  if (userName) {
    localStorage.setItem(USER_NAME, userName);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
