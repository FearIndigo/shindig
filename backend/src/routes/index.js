import addAuthRoutes from "./auth.route.js";
import addCommentRoutes from "./comment.route.js";
import addEventRoutes from "./event.route.js";
import addInteractionRoutes from "./interaction.route.js";
import addResponseRoutes from "./response.route.js";
import addUserRoutes from "./user.route.js";

export default async function addRoutes(rxServer) {
  // Add auth routes.
  addAuthRoutes(rxServer);

  // Add comment routes.
  addCommentRoutes(rxServer);

  // Add event routes.
  addEventRoutes(rxServer);

  // Add interaction routes.
  addInteractionRoutes(rxServer);

  // Add response routes.
  addResponseRoutes(rxServer);

  // Add user routes.
  addUserRoutes(rxServer);
}
