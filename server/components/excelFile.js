const xlsx = require('xlsx');
const { htmlToText } = require('html-to-text');

module.exports.getFile = (filepath) => {
  // get excel-file to read from, filepath from user
  const file = xlsx.readFile(`${filepath}`);
  // use first sheet from excel-file
  const ws = file.Sheets[file.SheetNames[0]];
  // convert content from sheet above to json
  const records = xlsx.utils.sheet_to_json(ws);
  // splice text from records into chunks of 49, limit 50 per request
  // const newRecords = sliceIntoChunks(records, 49);

  let params = {};
  // map the converted excel-json and combine text for translate with param and &
  records.map(
    (text, i) =>
      (params = {
        ...params,
        [i]: htmlToText(text.Text_SV, { wordwrap: null }),
      })
  );

  // return [file, textToTranslate, records, params];
  return [file, records, params];
};
