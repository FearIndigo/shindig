import initRxDB from "~/rxdb";
import type { Database } from "~/rxdb/types";

export default defineNuxtPlugin({
  name: "rxdb-plugin",
  enforce: "pre",
  parallel: true,
  async setup() {
    const db = (await initRxDB()) as Database | null;

    return {
      provide: {
        db,
      },
    };
  },
});
