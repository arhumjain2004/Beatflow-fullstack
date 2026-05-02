require('dotenv').config()

const app = require("./src/app")
const connectDb = require("./src/db/db")


// ✅ connect DB
connectDb()

// ✅ IMPORTANT: bind to localhost properly
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

