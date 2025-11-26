const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3001;
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.post("/led/on", (req, res) => {
    fs.writeFile("/dev/gpioctrl", "1", err => {
        if (err) {
            console.error("LED On ERROR:", err);
            return res.status(500).send("Error turning LED on");
        }
        res.send("LED ON");
    });
});

app.post("/led/off", (req, res) => {
    fs.writeFile("/dev/gpioctrl", "0", err => {
        if (err) {
            console.error("LED OFF ERROR:", err);
            return res.status(500).send("Error turning LED off");
        }
        res.send("LED OFF");
    });
});

app.listen(PORT, '10.102.11.39', () => console.log(`Express running on port ${PORT}`));

