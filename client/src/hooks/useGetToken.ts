import { useCookies } from "react-cookie";
export const useGetToken = () => {
  const [cookies, _] = useCookies(["accestoken"]);

  return {
    headers: { token : cookies.accestoken },
  };
};