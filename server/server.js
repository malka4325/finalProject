require ("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const path = require("path");

const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const verifyJWT = require("../server/middleware/verifyJWT")
const multer = require("multer");

const PORT= process.env.PORT||1300
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/trips",require("./routes/tripRouter"))
app.use("/api/vacations",require("./routes/vacationRouter"))
app.use("/api/auth", require("./routes/authRouter"))
app.use("/api/users", require("./routes/userRouter"))
app.use("/api/orders",require("./routes/orderRouter"))
  

const storage = multer.diskStorage({
    destination: "public/uploads/", 
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  
  const upload = multer({ storage });
  
  // נתיב להעלאת תמונה
  app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` }); // שינוי הנתיב כך שיתאים ל-public
  });
mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB')
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
})
mongoose.connection.on('error',err=>{
    console.log(err);
})