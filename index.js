const express = require("express");
const auth = require("./auth");
const app = express();
const PORT = 3001;
//accept json and body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/v1`, auth);
app.listen(PORT, () => {
  console.log("App is running at ", PORT);
});
