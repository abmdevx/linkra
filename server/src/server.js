import app from "./app.js";
import "dotenv/config"; // Automatically loads the .env file
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend Working");
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});