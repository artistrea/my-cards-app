import { routeMatcher } from "./routes/routeMatcher.js";

export const handleApiRequest = async (req, res) => {
  const { method, originalUrl } = req;

  const passwordHeader = req.get("X-Password");

  if (method !== "GET" && !authorized(passwordHeader)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const apiUrl = originalUrl.replace("/api/", "/");

  const { params, handler } = routeMatcher(method, apiUrl);

  if (handler) {
    await handler(req, res, params);
  } else {
    res.status(404).json({ message: "Route Not found" });
  }
};

function authorized(passwordHeader) {
  console.log("passwordHeader", passwordHeader);
  console.log("process.env.PASSWORD", process.env.PASSWORD);

  if (process.env.PASSWORD) {
    return passwordHeader === process.env.PASSWORD;
  }
  return passwordHeader === "test";
}
