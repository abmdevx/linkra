import app from "./src/app.js";
import "dotenv/config"; // Automatically loads the .env file
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

connectDB();