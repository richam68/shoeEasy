import { getCurrentRoute } from "./redux/navigationSlice";

export const handleRouteChangeClick = (route, dispatch) => {
  dispatch(getCurrentRoute(route));
};
