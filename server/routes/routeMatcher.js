import { routes as allRoutes } from "./index.js";

export function routeMatcher(method, route) {
  const routeParts = route.split("/").filter(Boolean);

  const curRoutes = allRoutes[method];

  return matchPart(routeParts, curRoutes);

  function matchPart(routeParts, curRoutes, params = {}, apiRoute = "") {
    if (routeParts.length === 0) {
      if (typeof curRoutes === "function") {
        return { params, handler: curRoutes };
      }
      if (typeof curRoutes["/"] === "function") {
        return { params, handler: curRoutes["/"] };
      }
    }

    const nextRoutePart = routeParts.shift();

    if (curRoutes[nextRoutePart]) {
      return matchPart(
        routeParts,
        curRoutes[nextRoutePart],
        params,
        `${apiRoute}/${nextRoutePart}`
      );
    }

    const routeParam = Object.keys(curRoutes).find((key) =>
      key.startsWith(":")
    );

    if (routeParam) {
      const paramName = routeParam.slice(1);
      params[paramName] = nextRoutePart;
      return matchPart(
        routeParts,
        curRoutes[routeParam],
        params,
        `${apiRoute}/${routeParam}`
      );
    }

    throw new Error(
      `Some error happened at: ${apiRoute}\nFull route: ${route}`
    );
  }
}
