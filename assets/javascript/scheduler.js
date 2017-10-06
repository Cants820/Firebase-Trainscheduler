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

      console.log("Hello I'm a listener"); //on click listener
       // Prevent the page from refreshing
       event.preventDefault();
      // name = $("#employee-name-input").val().trim();
      // console.log(name);
      // role = $("#role-input").val().trim();
      // monthsWorked = $("#start-input").val().trim();
      // rate = $("#rate-input").val().trim();

      //add the inputs then sends to the database
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#first-train-time").val().trim();
      frequency = parseInt($("#frequency").val().trim());
      
      
      var splitTime = firstTrainTime.split(":"); 
      console.log("split first train " + splitTime);
      var newTime = moment().hours(splitTime[0]).minutes(splitTime[1]).second(00);
      // console.log("new time " + newTime);
      
      var difference = (moment().diff(moment(newTime),"minutes"));
      console.log(difference);  
      //turn minutes into positive
      //Math.abs(difference);
      //console.log(Math.abs(difference));
      
      while(difference >  0) {
      //adding newTime to frequency
      //next arrival = first train time + frequency
      newTime = moment(newTime).add(frequency,"minutes"); 
      console.log("new time " + newTime);

  
      //subtracting the newtime (with frequency added) to current time    
      //minutes away = current - newTime  
      difference = moment().diff(moment(newTime),"minutes");
      console.log("new Diference " + difference);
      //pushes the variable onto firebase
      nextArrival = (newTime).format("hh:mm");
      //when first train time is greater than current time, get the absolute value of the time away.
      minutesAway = Math.abs(difference);
      }



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

      // var convertFrequency = moment(frequency, "m mm");
      // console.log("convert frequency to minutes " + convertFrequency);
  
  //reassign variables for onto firebase
  var trainName = childSnapShot.val().trainName;
  var destination = childSnapShot.val().destination;
  var firstTrainTime = childSnapShot.val().firstTrainTime;
  var frequency = childSnapShot.val().frequency; 
  var nextArrival = childSnapShot.val().nextArrival;
  var minutesAway = childSnapShot.val().minutesAway;

   
      
//displays each variable coming from firebase onto html
//<tr> = table <td> = cell inside a table
$("#train-scheduler ").append("<tr><td>" + trainName + "</td><td>" +  destination + "</td><td>"
  + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td></tr>" );


});