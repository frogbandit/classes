var mongoose = require("mongoose");

var courseSchema = mongoose.Schema({
  course: String,
  prerequisites: Object,
});

var courseModel = mongoose.model("course", courseSchema);

var course = (function course() {
  var that = Object.create(course.prototype);


  that.findPrereqs = function(course, callback) {
    course_list = []
    action_list = []
    courseModel.find({ "courses.course": course}, function(err, res){

      res = JSON.stringify(res);
      res = JSON.parse(res)[0];
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
        return callback([course_list, action_list]);
      } 
    });
  };

  Object.freeze(that);
  return that;

})();

module.exports = course;