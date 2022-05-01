require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getFile } = require('./components/excelFile.js');
const { getTranslations } = require('./components/getTranslations.js');
const { createNewWB } = require('./components/createWB.js');

const app = express();

app.use(cors());            // Allow cross-origin requests 
app.use(bodyParser.json({limit: '128kb'})); // Format data to json
app.use(bodyParser.urlencoded({ limit: '128kb' , extended: true }))

const PORT = 5000;

let filepath = '';
let iso = '';

app.get("/", (req, res) => {
    //when we get an http get request to the root/homepage
    res.send("Server running...");
});

app.post('/api/translate', async (req, res) => {
    filepath = req.body.path;
    iso = req.body.iso;

    try {
        // read file and return file, text to translate in string, records from excel and
        // const [file, textToTranslate, records, params] = getFile(filepath)
        const [file, records, params] = getFile(filepath);

        // fetch DeepL for text translations
       const [translatedTexts, status] = await getTranslations(params, iso, records);

        if (status === 200) {
            // create new worksheet in excelfile
            createNewWB(records, translatedTexts, iso, file, filepath)
            res.status(200).send(file)
        } else {
            res.send("Something's wrong")
        }
    } catch (error) {
        console.error('From server.js: ', error)
        res.sendStatus(500)
    }
});

// Listen to server
app.listen(PORT, () => console.log(`Running on port ${PORT}`));