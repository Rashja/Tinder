import { ComponentType, useEffect } from "react";
import { apiProfileComplete } from "../../apis/user/user";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

enum ROUTES {
  PROFILE = "/profile",
  EXPLORE = "/explore",
  HOME = "/",
}

export const ComponentWrapper = <TProps extends {}>(
  Component: ComponentType<TProps>
) => {
  return (props: TProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
      apiProfileComplete().then((res) => {
        const completeProfile = res.data?.completeProfile;
        if (pathname === ROUTES.HOME) {
          if (completeProfile) {
            navigate(ROUTES.EXPLORE);
          }
          if (completeProfile === false) {
            navigate(ROUTES.PROFILE);
          }
        }
        if (pathname === ROUTES.PROFILE) {
          if (completeProfile) {
            navigate(ROUTES.EXPLORE);
          }
          if (completeProfile === undefined) {
            navigate(ROUTES.HOME);
            Cookies.remove("auth_token");
          }
        }
        if (pathname === ROUTES.EXPLORE) {
          if (completeProfile === false) {
            navigate(ROUTES.PROFILE);
          }
          if (completeProfile === undefined) {
            navigate(ROUTES.HOME);
            Cookies.remove("auth_token");
          }
        }
      });
    }, [pathname]);
    return <Component {...props} />;
  };
};
