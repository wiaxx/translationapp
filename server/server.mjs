import dotenv from 'dotenv';
dotenv.config();
import express from 'express';   // Import exrepss, a light-weight framework
import bodyParser from 'body-parser';
import cors from 'cors';        // Allow cross-origin requests 
import getFile from './components/excelFile.mjs';
import getTranslations from './components/getTranslations.mjs';
import createNewWB from './components/createWB.mjs';

const app = express();

app.use(cors());            // Allow cross-origin requests 
app.use(bodyParser.json()); // Format data to json
app.use(bodyParser.urlencoded({ extended: true }))
//middleware

const PORT = process.env.PORT || 5000;

let filepath = '';
let iso = '';

app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
    res.send("Hello World");
  });

app.post('/api/translate', async (req, res) => {
    filepath = req.body.path;
    iso = req.body.iso;

    try {
        // read file and return file, text to translate in string, records from excel and
        const [file, textToTranslate, records, params] = getFile(filepath)

        // fetch DeepL for text translations
        const [translatedTexts, status] = await getTranslations(params, iso)

        if (status === 200) {
            // create new worksheet in excelfile
            createNewWB(records, translatedTexts, iso, file, filepath)
            res.status(200).send(file)
        } else {
            res.send("Somethings wrong")
        }
    } catch (error) {
        console.error('From server.js: ', error)
        res.sendStatus(500)
    }
});

// Listen to server
app.listen(PORT, () => console.log(`Running on port ${PORT}`));