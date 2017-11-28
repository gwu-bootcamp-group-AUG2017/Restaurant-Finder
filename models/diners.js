// Node Dependency
var orm = require('../config/orm.js');


// create the code that will call the ORM functions using burger specific input for the ORM.
var diners = {

  selectAll: function(callback){
    orm.selectAll(function(res){
      callback(res);
    });
  },

  insertOne: function(name, email, price, type, callback){
    orm.insertOne(name, email, price, type, function(res){
      callback(res);
    });
  },

  updateOne: function(id, type, price, callback){
    orm.updateOne(id,type, price, function(res){
      callback(res);
    });
  }

};


// Export at the end of the burger.js file.
module.exports = diners;