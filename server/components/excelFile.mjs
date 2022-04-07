import xlsx from 'xlsx';
import { htmlToText } from 'html-to-text';

let textToTranslate = '';

/*
You can make parallel requests by calling the translate function 
from several threads/processes.

= Multiple fetch requests
*/

// function from https://stackabuse.com/how-to-split-an-array-into-even-chunks-in-javascript/
/*
const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    // console.log("from excelFile: ", res)
*/

const getFile = (filepath) => {
    // get excel-file to read from, filepath from user
    const file = xlsx.readFile(`${filepath}`);
    // use first sheet from excel-file 
    const ws = file.Sheets['Blad1'];
    // convert content from sheet above to json 
    const records = xlsx.utils.sheet_to_json(ws);
    // splice text from records into chunks of 4, to prevent to long url request
    // const newRecords = sliceIntoChunks(records, 2)

    let params = {}
    // map the converted excel-json and combine text for translate with param and &
    // records.map(text => textToTranslate += htmlToText(`text = ${text.Text_SV} & `))
    records.map((text, i) => params = {...params, [i]: htmlToText(text.Text_SV)})

    return [file, textToTranslate, records, params];
}

export default getFile;