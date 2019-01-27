const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
    })
    .then((user) => {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: newUser.email,
      from: 'test@example.com',
      subject: 'New User Confirmation',
      text: 'Welcome to Blocidpedia',
      html: '<strong>You have succesfully created a new account</strong>',
    };
  //console.log(msg);
  sgMail.send(msg);
  callback(null, user);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  getUser(id, callback){
    let result = {};
    User.findById(id)
    .then((user) => {
      if(!user) {
        callback(404);
      } else {
        result["user"] = user;
       }
    })
  },

  upgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else{
      return user.updateAttributes({role: "premium"});
    }
    }) .catch((err) =>{
      callback(err);
    })
  },

  downgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else{
        return user.updateAttributes({role: "standard"})
      }
    }) .catch((err) => {
      callback(err);
    })
  }

 
  

}
