
const Product = require('../models/product.model');

module.exports = {
   async index(req, res) {
        const product = await Product.find();
        res.json(product)
    },

   async details(req, res) {
        const {_id} = req.params;
        const product = await Product.findOne({_id});
        res.json(product)
    },

    async create(req,res){
        const {nameWine, describe, harvest, type, grape, country, region, winery, minPrice, maxPrice, priceAvg, tagsHarm} = req.body;
        let data = {};
        let product =  await Product.findOne({nameWine});
        
        if(!product){
            data = {nameWine, describe, harvest, type, grape, country, region, winery, minPrice, maxPrice, priceAvg, tagsHarm};

            product = await Product.create(data);
            return res.status(200).json(product);
        }else{
            return res.status(500).json(product);
        }
    },

    async delete(req,res){
        const {_id} = req.params;

        const product = await Product.findByIdAndDelete({_id});
        return res.json(product);
    },

    async update(req,res){
        const {_id, nameWine, describe, harvest, type, grape, country, region, winery, minPrice, maxPrice, priceAvg, tagsHarm} = req.body;

        const data = {nameWine, describe, harvest, type, grape, country, region, winery, minPrice, maxPrice, priceAvg, tagsHarm};
        const product = await Product.findOneAndUpdate({_id}, data,{new:true});

        res.json(product);
    }
}