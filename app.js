const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
const wordCount = {};

readStream.on('data', (chunk) => {
  
  const data = chunk;
  const words = data.split(/\W+/);

  for (let word of words) {
    if (!word) continue;
    word = word.toLowerCase();
    wordCount[word] = (wordCount[word] || 0) + 1;
  }
});

readStream.on('end', () => {
  console.log('Word Frequency:');
  console.log(wordCount);
});

readStream.on('error', (err) => {
  console.error('Error reading file:', err.message);
});
