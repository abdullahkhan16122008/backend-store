let express = require('express')
require('dotenv').config()
let cors = require('cors')
let cookieParser = require('cookie-parser')
let mongoose = require('mongoose')
let app = express();
let router = require('./routes/index.router.js')
let port = process.env.PORT;


mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected successfully'))
  .catch((e) => {
    console.error('Database connection failed:', e.message);
  });

app.use(cors({origin: ["http://localhost:3000","http://localhost:4000"],credentials: true}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use(router)

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});