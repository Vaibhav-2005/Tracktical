import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

let corsOptions = {
  origin:[ process.env.ORIGIN_URL , "http://localhost:5500"],
  credentials: true
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Working just fine..." });
});

app.use("/api/v1", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running successfully from port: " + process.env.PORT + "...");
});
