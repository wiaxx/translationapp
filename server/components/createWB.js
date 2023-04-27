const xlsx = require('xlsx');

module.exports.createNewWB = (records, texts, iso, file, filepath) => {
  let updated = [];

  records.forEach((org, index) => {
    const translated = texts[index].text;
    let newOne = { ...org, [iso]: translated };
    updated.push(newOne);
  });

  const newWS = xlsx.utils.json_to_sheet(updated);
  xlsx.utils.book_append_sheet(file, newWS, iso);
  xlsx.writeFile(file, filepath);
};
