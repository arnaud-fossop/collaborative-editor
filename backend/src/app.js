const express = require('express');
const cors = require('cors')
const runners = require("./runners");

const app = express();
app.use(cors()); // this is of course, not production ready :)
app.use(express.json());

app.get("/status", (req, res) => {
   const status = {
      "Status": "Running"
   };

   res.send(status);
});

/**
 * Run entrypoint
 */
app.post("/run", async (req, res) => {
   const {
      body: payload
   } = req;
   language = payload.language;
   code = payload.code;
   console.log(`Running in Language ${language}, code\n ${code}`);
   result = ""
   try {
      await runners.runner(language, code, (output) => {
         console.log("Result returned");
         result = output;
      });
      res.send({ "output": result });
   }
   catch(err) {
      //TODO need to better define the errors
      res.statusCode = 422;
      res.send("Invalid request");
   }
   
})

/**
 * Login entrypoint
 * TODO: complete
 */
app.post("/login", (req, res) => {
   res.send({ status: "succeed", token: "mytoken" });
})

module.exports = app
