var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/classes';
// var mongodbUri = 'mongodb://jamesxue100:abcd@ds037185.mongolab.com:37185/courses';
var mongodbUri = 'mongodb://heroku_d5x2mctr:ar6kctuibnmb57crd2tv5s73kv@ds037205.mongolab.com:37205/heroku_d5x2mctr';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Courses' });
});

router.post('/', function(req, res){
    course = req.body.course;

    MongoClient.connect(mongodbUri, function(err, db) {
      console.log(course);
      assert.equal(null, err);
      findPrereqs(db, course, function(response) {
          courses = response[0];
          actions = response[1]; 
          console.log(courses);
          console.log(actions);
          db.close();
          res.status(200).json({success:true, content:[courses, actions]}).end();
      });
      // console.log(courses);
      
    });   
});

var findPrereqs = function(db, course, callback) {
    course_list = []
    action_list = []
    var cursor =db.collection('classes').find({ "courses.course": course } );
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         for (i = 0; i < doc.courses.length; i++){
          if (doc.courses[i].course == course){
            prereqs = doc.courses[i].prerequisites;
            for (j = 0; j < prereqs.length; j++){
              courses = prereqs[j].courses;
              action = prereqs[j].action_needed;
              course_list.push(courses);
              action_list.push(action);
            }
          }         
        }
        return callback([course_list, action_list]);
      } 
    });
};

module.exports = router;

