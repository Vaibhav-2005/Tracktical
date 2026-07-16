import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.route.js";
import stageRoutes from "./routes/stages.route.js";
import {auth} from "./middlewares/passport.js";
import passport from "passport";
import { isAuthenticated } from "./middlewares/authentication.middleware.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());

let corsOptions = {
  origin:[ process.env.ORIGIN_URL , "http://localhost:5500"],
  credentials: true
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Working just fine..." });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", isAuthenticated, applicationRoutes);
app.use("/api/v1", isAuthenticated, stageRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running successfully from port: " + process.env.PORT + "...");
});
