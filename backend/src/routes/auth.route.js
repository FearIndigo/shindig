import { ExpressAuth } from "@auth/express";
import Cognito from "@auth/express/providers/cognito";

export default function useAuth(serverApp) {
  serverApp.set("trust proxy", true);
  serverApp.use(
    "/auth/*",
    ExpressAuth({ providers: [Cognito], trustHost: true })
  );
}
