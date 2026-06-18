import app from "./src/app.js";
import "dotenv/config"; // Automatically loads the .env file
import { connectDB } from "./src/config/db.js";
import cors from "cors"

const PORT = process.env.PORT || 3000;

console.log(process.env.FRONT_END_ORIGIN);

app.use(
    cors({
        origin: process.env.FRONT_END_ORIGIN
    })
)

app.get("/", (req, res) => {
  res.send("Backend Working");
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});