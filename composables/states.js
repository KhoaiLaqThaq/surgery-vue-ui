export const useRouteActive     = () => useState("routeActive", (routeName) => routeName);
export const useLayoutActive    = () => useState("layout", (layoutActive) => layoutActive);
export const useToken           = () => useState("token", (token) => token);
export const useHeader          = () => useState("header", (header) => header);
export const useCurrentRole     = () => useState("currentRole", (currentRole) => currentRole);
export const useCurrentUser     = () => useState("currentUser", (currentUser) => currentUser);
