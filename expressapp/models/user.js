var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({

    email : {
      type:String,
      require:true,
      lowercase: true,
      validate: {
        isAsync: true,
        validator: function(value, isValid){
          const self = this;
          return self.constructor.findOne({email:value}).exec(function(err, user){
            if(err){
              throw err;
          }
          else if(user){
            if(self.id === user.id){
              return isValid(true);
            }
            return isValid(false);
          }
          else{
            return isValid(true);
          }
          })
        },
        message: 'The email address is already taken!'
      }
    },
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true},
    // new
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);
