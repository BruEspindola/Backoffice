const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
},{
    timestamps:true
});

DataSchema.pre('save', function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

DataSchema.pre('findOneAndUpdate', function (next){
    let pass = this.getUpdate().password+'';
    if(pass.length < 55){
        this.getUpdate().password = bcrypt.hashSync(pass,10)
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (pass, callback){
    bcrypt.compare(pass, this.password, function(err, same) {
        if(err){
            callback(err);
        } else {
            callback(err, same);
        }
    })
}
const usuarios = mongoose.model('Usuarios',DataSchema);
module.exports = usuarios;