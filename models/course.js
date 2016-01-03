var mongoose = require("mongoose");

var courseSchema = mongoose.Schema({
  course: String,
  prerequisites: Object,
});

var courseModel = mongoose.model("course", courseSchema);

var course = (function course() {
  var that = Object.create(course.prototype);


  that.findPrereqs = function(course, callback) {
  	console.log('hi');
    course_list = []
    action_list = []
    // var cursor =courseModel.find({ "courses.course": course } );
    courseModel.find({ "courses.course": course}, function(err, res){
    // cursor.each(function(err, doc) {
      // assert.equal(err, null);
      res = JSON.stringify(res);
      // console.log(JSON.stringify(res));

      console.log(res);
      res = JSON.parse(res)[0];
      console.log(res);
      // console.log(typeof(res[0]));
      // console.log(res[0]);
      // console.log(res[0].courses);


      if (res != null) {
         for (i = 0; i < res.courses.length; i++){
          if (res.courses[i].course == course){
            prereqs = res.courses[i].prerequisites;
            for (j = 0; j < prereqs.length; j++){
              courses = prereqs[j].courses;
              action = prereqs[j].action_needed;
              course_list.push(courses);
              action_list.push(action);
            }
          }         
        }
        console.log(course_list);
        console.log(action_list);
        return callback([course_list, action_list]);
      } 
    });
  };

  Object.freeze(that);
  return that;

})();

module.exports = course;