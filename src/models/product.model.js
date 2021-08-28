const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nameWine:String,
    describe:String,
    harvest: String,
    type: String,
    grape: String,
    country: String,
    region: String,
    winery: String,
    minPrice: Number,
    maxPrice: Number,
    priceAvg: Number,
    tagsHarm: Array
},{
    timestamps:true
});

const produtos = mongoose.model('Produtos',DataSchema);
module.exports = produtos;