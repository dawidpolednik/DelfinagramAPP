const APP_ID = "785697",
  APP_KEY = "cb07f7748e4b1e281535",
  APP_SECRET =
    "df06e85e-fcdd-4025-a8ea-734b835c3fe7:S99ENcpSkJv13YrQRwPmc71+np4uis1MfDmxHaGC4xw=",
  APP_CLUSTER = "eu",
  APP_LOCATOR = "v1:us1:1212f49a-0211-4f71-80dc-bbe873c80dd0";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: APP_LOCATOR,
  key: APP_SECRET
});
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users", (req, res) => {
  const { user } = req.body;
  const userData = {
    name: `${user.GivenName} ${user.Name} `,
    id: user.Id,
    avatarURL: user.Photo
  };
  chatkit
    .createUser(userData)
    .then(() => {
      console.log("Created user ", userData.name);
      res.status(201).json(userData);
    })
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        console.log("User already exists ", userData.name);
        res.status(201).json(userData);
      } else {
        console.error(error);
        res.status(error.status).json(error);
      }
    });
});

app.listen(3001);
console.log("Running on port 3001");
