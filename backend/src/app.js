const express = require('express');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
    const status = {
       "Status": "Running"
    };
    
    res.send(status);
 });

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });