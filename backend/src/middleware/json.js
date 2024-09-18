import { json } from "express";

export default function addJsonMiddleware(rxServer) {
  // Add json middleware.
  rxServer.serverApp.use(json());
}
