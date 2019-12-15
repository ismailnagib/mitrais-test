const path = require('path');
const fs = require('fs');
const camelCase = require('lodash/camelCase');

const loadFile = (dirname, basename) => {
  const load = {};
  console.log(dirname, basename);
  fs.readdirSync(dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const pathFile = path.join(dirname, file);
      const filename = camelCase(path.basename(file, '.js'));

      load[filename] = require(pathFile);
    });

  return load;
};

const basename = path.basename(__filename);

module.exports = loadFile(__dirname, basename);
