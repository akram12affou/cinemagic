export const getUser = () => {
  const userLS: any = window.localStorage.getItem("cinemagicUser");
  return JSON.parse(userLS);
};
