const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })

const app = express();

var corsOptions = {
  origin: "http://localhost:4200/"
};

let URL = process.env.DATABASE

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));

const db = require("./app/models");
const Role = db.role;

db.mongoose.connect(URL, () => ({
  useNewUrlParser: true,
  useFindAndModify: false
}))
  .then(() => console.log('DB Connected'), initial())
  .catch((err) => {
    console.log('connection failed');
  });


app.get("/", (req, res) => {
  res.status(200).send("Welcome to Mean Application");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}