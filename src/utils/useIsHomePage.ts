import { Paths } from "enums";
import { useLocation } from "react-router-dom";

const HOME_PAGES: Array<string> = [Paths.Home];

export const useIsHomePage = () => {
  const { pathname } = useLocation();

  return HOME_PAGES.includes(pathname);
};
