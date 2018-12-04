
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transaction = new Schema({

  token_amount:{},
  date_time:{},
  tx_hash:{},
  from_address:{},
  to_address:{},
  is_confirmed:{}

});
