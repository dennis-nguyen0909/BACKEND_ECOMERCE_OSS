const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    keyword: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;