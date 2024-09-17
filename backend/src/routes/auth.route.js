import passport from "passport";
import OpenIDConnectStrategy from "passport-openidconnect";
import server from "../index.js";
import { v4 as uuidv4 } from "uuid";

passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
      authorizationURL: process.env.AUTH_KEYCLOAK_AUTH_URL,
      tokenURL: process.env.AUTH_KEYCLOAK_TOKEN_URL,
      userInfoURL: process.env.AUTH_KEYCLOAK_USER_URL,
      clientID: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      callbackURL: "http://localhost:443/auth/callback",
    },
    function verify(issuer, profile, cb) {
      const db = server.database;

      db.providers
        .findOne({
          selector: {
            provider: issuer,
            userId: profile.id,
          },
        })
        .exec()
        .then((provider) => {
          if (!provider) {
            // The account at the OpenID Provider (OP) has not logged in to this app
            // before. Create a new user account and associate it with the account
            // at the OP.
            db.users
              .insert({
                id: profile.id,
                name: profile.username,
                email: profile.emails[0].value,
              })
              .then((user) => {
                db.providers
                  .insert({
                    id: uuidv4(),
                    provider: issuer,
                    userId: user.id,
                  })
                  .then((provider) => {
                    return cb(null, user.toJSON());
                  });
              });
          } else {
            // The account at the OpenID Provider (OP) has previously logged in to
            // the app. Get the user account associated with the account at the OP
            // and log the user in.
            db.users
              .findOne({
                selector: {
                  id: profile.id,
                },
              })
              .exec()
              .then((user) => {
                if (!user) {
                  return cb(null, false);
                }
                return cb(null, user.toJSON());
              });
          }
        });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default function addAuthRoutes(rxServer) {
  rxServer.serverApp.use(passport.session());

  rxServer.serverApp.get("/auth/login", passport.authenticate("openidconnect"));

  rxServer.serverApp.get(
    "/auth/callback",
    passport.authenticate("openidconnect", {
      failureRedirect: "/auth/login",
      failureMessage: true,
    }),
    function (req, res) {
      res.redirect(process.env.FRONTEND_URI);
    }
  );

  rxServer.serverApp.post("/auth/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.FRONTEND_URI);
    });
  });

  rxServer.serverApp.get("/auth/session", (req, res) => {
    res.json(req.session);
  });
}
