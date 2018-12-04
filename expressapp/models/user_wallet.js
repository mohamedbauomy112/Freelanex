var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userWallet = new Schema({

  tiker:{type:String, require:true},
  address:{type:String, require:true},
  privat_key:{type:String, require:true},

  user_id:{type:String} // ok// i did as i searched//ok great create and run whare we can see db
});

module.exports = mongoose.model('UserWallet',userWallet);
