const natural = require('natural');
const fs = require('fs');
const sw = require('stopword');
const {frequencies, createInvertedIndex, createTermByDocMatrix} = require('./frequencies_remap');

let collectionPath;

/**
 * Preprocess files into json stemmed files and return inverted index
 * @param {Array<string>} files Files to be processed
 * @return {Map<string, Array<{file: string, weight: number}>>} Inverted index created from processed files
 */
function preprocessFiles(files) {
    let termFreq = [];
    let numberOfFiles = 0;
    files.forEach((filename) => {
        let trimmed = trim(fs.readFileSync(collectionPath + filename, 'utf-8'));
        termFreq = [...termFreq, ...(frequencies(trimmed, filename))];
        numberOfFiles++;
    });
    let invertedIndex = createInvertedIndex(termFreq, numberOfFiles);
    fs.writeFileSync(`data/inverted_index.json`, JSON.stringify(invertedIndex, null, 2));
    return invertedIndex;
}

/**
 * Stem and remove duplicates from loaded data
 * @param {string} data Content of the file to be processed
 * @return {Array<string>} Stemmed and tokenized data
 */
function trim(data) {
    const withoutStops = sw.removeStopwords(data.split(' '));
    return natural.PorterStemmer.tokenizeAndStem(withoutStops.join(' '));
}

/**
 * Processes the files in collection path
 * @param {string} cltPath Collection path
 * @return {Map<string, Array<{file: string, weight: number}>>} Inverted index either loaded from previous processing or created from processed files
 */
function processDocuments(cltPath) {
    collectionPath = cltPath;
    const path = 'data/inverted_index.json';
    const orig = fs.readdirSync(collectionPath);
    if (fs.existsSync(path)){
        console.log("Inverted index is created.");
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    }
    else{
        console.log("Creating inverted index. Be patient, it takes a while.");
        return preprocessFiles(orig);
    }
}

module.exports = processDocuments;