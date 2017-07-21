// when the document is ready, call this "anonymous" function
$(document).ready( function() {

	// when the element (id='get-students') is clicked, call this anonymous function with the click event as the first parameter
	$("#get-students").click( function(event) {
		
		// jQuery logic below will do these things:
		//
		// 1) Send an HTTP request to the server (with host name "localhost") on port 8888
		//    asking for the /students resource. Convert the response data from JSON to JavaScript object(s)
		//
		// 2) If successful call the anonymous function passed to the "done" function
		//    with the JavaScript object(s) as the first argument (ie. an array of student objects.) See: app.js
		//
		// 2.1) Get the #students element
		//
		// 2.2) For each student in the server's response data
		//
		// 2.2.1) Create a <li> element with the student's id as the element's id
		//
		// 2.2.2) Append this new <li> element to the #students <ul> element
		//
		// 3) If the server response fails for any reason call the anonymous
		//    function passed to "fail" function
		//
		// 3.1) Log the error to the console
		//
		// 4) Regardless of server's response status (successful or error) call the
		//    anonymous function passed to the always function
		//
		// 4.1) Log the string "Finally!" to the console

		$.getJSON("http://localhost:8888/students")         // #1
		 .done( function(students) {                        // #2
			
			let studentsElement = $("#students");           // #2.1
			
			for (let student of students) {                 // #2.2
				let studentItem = `<li id="${student.id}">${student.firstName}</li>`; // #2.2.1 (ES6 version)
				studentsElement.append(studentItem);        // #2.2.2
			} // for loop
			
		}).fail( function(error) {                          // #3
			console.log("Error: " + JSON.stringify(error)); // #3.1
		}).always( function() {                             // #4
			console.log("Finally!");                        // #4.1
		});
	}); // click handler
}); // ready handler


// #2.2.1 (ES5 version)
// let studentItem =
// 	"<li id='" +
// 	student.id +
// 	"'>" +
// 	student.firstName +
// 	"</li>";
