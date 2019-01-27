const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");
const secretKey = process.env.SECRET_KEY;
const publishableKey = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")("sk_test_bqj6L4FqV1wKd98ClWdhv1mQ");

module.exports = {
    signUp(req, res, next){
      res.render("users/signup");
    },

    create(req, res, next){

        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        userQueries.createUser(newUser, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/signup");
            }else{
                passport.authenticate("local")(req, res, () => {
                    console.log('succesful sign up')
                    req.flash("notice", "You've successfully signed in!");
                    res.redirect("/");
                })
            }
        });
    },

    signInForm(req, res, next){
        res.render("users/sign_in");
    },

    signIn(req,res,next){
        passport.authenticate("local")(req,res,function () {
            if(!req.user){
                req.flash("notice", "Sign in failed. Please try again");
                res.redirect("/users/sign_in");
            }else{
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },

    signOut(req,res,next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },

    show(req, res, next){
         userQueries.getUser(req.params.id, (err, result) => {
     
           if(err || result.user === undefined){
             req.flash("notice", "No user found with that ID.");
             res.redirect("/");
           } else {
             res.render("users/show", {...result});
           }
         });
         },


    upgrade(req, res, next){
        res.render("users/upgrade", {publishableKey});
  },

    payment(req, res, next){
        stripe.customers.create({
            email: req.body.stripeEmail,
            source:req.body.stripeToken,
    }) .then((customer) => {
      stripe.charges.create({
        amount: 1500,
        description: "Blocipedia Premium Membership Charge",
        currency: "usd",
        customer: customer.id,
      })
    }) .then((charge) => {
      userQueries.upgrade(req.user.dataValues.id);
      res.render("users/payment_success");
    })
  },

    downgrade(req,res,next){
        userQueries.downgrade(req.user.dataValues.id);
            wikiQueries.privateToPublic(req.user.dataValues.id);

        req.flash("notice","you have downgraded to standard user");
        res.redirect("/");
    }
         
       

    
}