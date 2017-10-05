// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDuFPwXHx2FFIz-N0jGukSdolVYJ5TekWc",
    authDomain: "train-scheduler-eaf79.firebaseapp.com",
    databaseURL: "https://train-scheduler-eaf79.firebaseio.com",
    projectId: "train-scheduler-eaf79",
    storageBucket: "train-scheduler-eaf79.appspot.com",
    messagingSenderId: "407941652653"
  };
  firebase.initializeApp(config);

//Global Variables
  var database = firebase.database();
  var trainName = "";
  var destination ="";
  var firstTrainTime = 0;
  var frequency = 0;
  var nextArrival = 0;
  var minutesAway = 0;

  $("#add-train").on("click", function() {
      
      // name = $("#employee-name-input").val().trim();
      // console.log(name);
      // role = $("#role-input").val().trim();
      // monthsWorked = $("#start-input").val().trim();
      // rate = $("#rate-input").val().trim();

      //add the inputs then sends to the database
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#first-train-time").val().trim();
      frequency = $("#frequency").val().trim();

      // Prevent the page from refreshing
      event.preventDefault();

      // Saving Keys onto the databse
      //push() creates a new object
      database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway 
      });

});

//listens to a new object or child being created
database.ref().on("child_added", function(childSnapShot){

  console.log(childSnapShot.val());

  //reassign variables for onto firebase
  var trainName = childSnapShot.val().trainName;
  var destination = childSnapShot.val().destination;
  var firstTrainTime = childSnapShot.val().firstTrainTime;
  var frequency = childSnapShot.val().frequency; 


//displays each variable coming from firebase onto html
//<tr> = table <td> = cell inside a table
$("#train-scheduler ").append("<tr><td>" + trainName + "</td><td>" +  destination + "</td><td>"
  + frequency + "</td><td>");


});