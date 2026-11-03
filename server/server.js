import app from "./src/app.js";
import "dotenv/config";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  res.send("Backend Working");
});

try {
  await connectDB();
  console.log("[Linkra] Database connected successfully.");

  app.listen(PORT, HOST, () => {
    console.log(`[Linkra] Backend running at http://${HOST}:${PORT}`);
    console.log(`[Linkra] API base URL: http://${HOST}:${PORT}/api/v1`);
  });
} catch (error) {
  console.error("[Linkra] Startup failed:", error.message);
  process.exitCode = 1;
}
