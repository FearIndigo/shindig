import cors from "cors";

export default function addCorsMiddleware(rxServer) {
  // Add cors middleware.
  let allowedOrigins = ["http://localhost:443", process.env.FRONTEND_URI];
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions = {
      origin: allowedOrigins.includes(req.header("Origin")),
      credentials: true,
    };
    callback(null, corsOptions);
  };
  rxServer.serverApp.use(cors(corsOptionsDelegate));
}
