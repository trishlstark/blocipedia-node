const wiki = require("./models").Wiki;
const User = require("./models").User;
const Authorizer = require("../policies/application");


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

  deleteWiki(id, callback){
      return Wiki.destroy({
          where: {id}
      })
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  },


  
  updateWiki(id, updatedWiki, callback){
      return Wiki.findById(id)
      .then((wiki) => {
          if(!wiki){
              return callback("Wiki not found");
          }

          wiki.update(updatedWiki, {
              fields: Object.keys(updatedWiki)
          })
          .then(() => {
              callback(null, wiki);
          })
          .catch((err) => {
              callback(err);
          });
      });
  }

}