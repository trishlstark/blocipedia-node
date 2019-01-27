const wiki = require("./models").Wiki;
const User = require("./models").User;
const Authorizer = require("../policies/application");
require("dotenv").config();


module.exports = {

  getAllwikis(callback){
    return wiki.all()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getwiki(id, callback){
  return wiki.findById(id)
   .then((wiki) => {
     callback(null, wiki);
   })
   .catch((err) => {
     callback(err);
   })
 },
  
  addwiki(newwiki, callback){
    return wiki.create({
      title: newwiki.title,
      body: newwiki.body,
      private: newWiki.private,
      userId: newWiki.userId
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteWiki(req, callback){
    return Wiki.findById(req.params.id)
    .then((wiki) => {
      const authorized = new Authorizer(req.user, wiki).destroy();
      if(authorized) {
        wiki.destroy()
        .then((res) => {
          callback(null, wiki);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  
  updateWiki(req, updatedWiki, callback){
    return Wiki.findById(req.params.id)
    .then((wiki) => {

      if(!wiki){
        return callback("Wiki not found");
      }

      const authorized = new Authorizer(req.user, wiki).update();

      if(authorized){
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        })
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    })
  },

  privateToPublic(id){
    return Wiki.all()
      .then((wiki) => {
        wikis.forEach((wiki) => {
          if(wiki.userId == id && wiki.private == true){
            wiki.update({
              private:false
            })
          }
        })
      })
      .catch((err) => {console.log(err);})
  }

}