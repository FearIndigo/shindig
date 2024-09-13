import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

export default function addRxPlugins() {
  // Add DevMode plugin for development environment.
  if (process.env.NODE_ENV === "development") {
    addRxPlugin(RxDBDevModePlugin);
  }
}
