const express = require('express');
const cors = require('cors')
const runners = require("./runners");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
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
   await runners.pythonRunner(language, code, (output) => {
      console.log("Result returned");
      result = output;
   });
   res.send({"Status": result});
 })

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });