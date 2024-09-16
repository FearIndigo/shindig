import addSessionMiddleware from "./session.js";

export default async function addMiddleware(rxServer) {
  addSessionMiddleware(rxServer);
}
