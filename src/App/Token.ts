const tokenStorageName = "token";
export const readJWT = (): string | false =>
  window.localStorage.getItem(tokenStorageName) ?? false;

export const storeJWT = (jwt: string) => {
  window.localStorage.setItem(tokenStorageName, jwt);
};

export const clearJWT = () => {
  window.localStorage.removeItem(tokenStorageName);
};
