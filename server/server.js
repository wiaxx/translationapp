require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getFile } = require('./components/excelFile.js');
const { getTranslations } = require('./components/getTranslations.js');
const { createNewWB } = require('./components/createWB.js');

const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json({ limit: '128kb' })); // Format data to json
app.use(bodyParser.urlencoded({ limit: '128kb', extended: true }));

const PORT = 5000;

app.get('/', (req, res) => {
  //when we get an http get request to the root/homepage
  res.send('Server running...');
});

app.post('/api/translate', async (req, res) => {
  const filepath = req.body.path;
  const iso = req.body.iso;

  if (!filepath || !iso) {
    res.status(400).send({ message: 'Filepath and/or language is missing' });
  }

  try {
    // read file and return file, text to translate in string, records from excel
    const [file, records, params] = getFile(filepath);

    if (!file) {
      return res
        .status(404)
        .send({ message: 'No file found or cannot reach file' });
    }

    if (records.length === 0) {
      return res.status(404).send({
        message: `There is no records in sheet "${file.SheetNames[0]}"`,
      });
    }

    // fetch DeepL for text translations
    const [translatedTexts, status] = await getTranslations(
      params,
      iso,
      records
    );

    if (translatedTexts.length === 0) {
      return res.status(status).send({
        message:
          'Someting went wrong, no texts have been translated. Please try again',
      });
    }

    if (status === 200) {
      // create new worksheet in excelfile
      createNewWB(records, translatedTexts, iso, file, filepath);
      return res.status(200).send({
        message: `Translation done and saved to workbook in sheet ${iso}`,
      });
    }
  } catch (error) {
    console.error('From server.js: ', error);
    return res.status(500).send({ error: error.message });
  }
});

// Listen to server
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
