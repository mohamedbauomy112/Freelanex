var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var walletSchema = new Schema({

tiker:{type:String, require:true},
address:{type:String, require:true},
privat_key:{type:String, require:true}

});

module.exports = mongoose.model('CommonWallet',walletSchema);
