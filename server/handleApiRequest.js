import { routeMatcher } from "./routes/routeMatcher.js";

export const handleApiRequest = async (req, res) => {
  const { method, originalUrl } = req;

  const apiUrl = originalUrl.replace("/api/", "/");

  const { params, handler } = routeMatcher(method, apiUrl);

  console.log("handler", handler);

  if (handler) {
    await handler(req, res, params);
  } else {
    res.status(404).json({ message: "Route Not found" });
  }
};
