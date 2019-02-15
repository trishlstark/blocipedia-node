'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
     role: {
     type: DataTypes.STRING,
     allowNull: false,
     defaultValue: "Standard"
   }
    
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });

  User.hasMany(models.Collaborator, {
      foreignKey: 'userId',
      as: 'collaborators'
    });  

  User.prototype.isAdmin = function() {
     return this.role === "admin";
   };

  User.prototype.isStandard = function(){
    return this.role === "standard";
  };

  User.prototype.isPremium = function(){
    return this.role === "premium";
  }
  };


  return User;
};