import addCorsMiddleware from "./cors.js";
import addJsonMiddleware from "./json.js";
import addSessionMiddleware from "./session.js";

export default async function addMiddleware(rxServer) {
  addCorsMiddleware(rxServer);
  addJsonMiddleware(rxServer);
  addSessionMiddleware(rxServer);
}
