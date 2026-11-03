import app from "./src/app.js";
import "dotenv/config";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend Working");
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
