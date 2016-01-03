$(document).on('submit', '#find', function(evt) {
	evt.preventDefault();
	var course = $('#course').val();
	console.log("clicked");

	$("#result td").parent().remove();
	$.post('/', {course: course}).done(function(response) {
		console.log("here");
		console.log(response);
		console.log(response.content);

		courses = response.content[0];
		actions = response.content[1];

		for (i=0; i < courses.length; i++){
			course1 = JSON.stringify(courses[i][0]['course']);
			grade1 = JSON.stringify(courses[i][0]['grade']);
			course2 = JSON.stringify(courses[i][1]['course']);
			grade2 = JSON.stringify(courses[i][1]['grade']); 
			action = JSON.stringify(actions[i])

			var row = $("<tr><td>"+course1+"</td><td>"+grade1
				+"</td><td>"+course2+"</td><td>"+grade2
				+"</td><td>"+action+"</td></tr>");
			
       		$("#result > tbody").append(row);


			// $('#result').text(response.content[i]);
		}
		
	});
});