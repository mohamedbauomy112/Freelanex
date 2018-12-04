var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenTransaction = new Schema({

  token_amount:{type:Number, require:true},
  date_time:{type:Date, require:true},
  tx_hash:{type:String, require:true},
  from_address:{type:String, require:true},
  to_address:{type:String, require:true},
  is_confirmed:{type:Boolean, require:true}

});

module.exports = mongoose.model('TokenTransaction',tokenTransaction);
