
const { Parser } = require('json2csv');

const generateCSV = (data) => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(data);
};

module.exports = generateCSV;
