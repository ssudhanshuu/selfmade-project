require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
