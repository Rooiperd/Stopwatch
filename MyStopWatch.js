//STOPWATCH OBJECT FOR CARRYING OUT LOGIC BEHIND FRONT END
var objectStopWatch = {
  //INITIALISE STOPWATCH COMPONENTS
  swTime : null,
  swReset : null,
  swToggle : null,
  //LINK STOPWATCH COMPONENT OBJECT VARIABLES TO RELEVANT HTML ELEMENTS
  init : function () {
    objectStopWatch.swTime = document.getElementById("timeDisplay")
    objectStopWatch.swReset = document.getElementById("resetButton")
    objectStopWatch.swToggle = document.getElementById("toggleButton")
  //ENABLE BUTTONS AND LISTEN FOR CLICK EVENT TO EXECUTE RELEVANT FUNCTION
    objectStopWatch.swReset.addEventListener("click", objectStopWatch.reset);
    objectStopWatch.swReset.disabled = false;
    objectStopWatch.swToggle.addEventListener("click", objectStopWatch.start);
    objectStopWatch.swToggle.disabled = false;
  },

  //TIMER FUNCTIONALITY
  timer : null, //initiate timer object
  now : 0, //current elapsed time
  tick : function () { //TIMER TICKING FUNCTION THAT INCREMENTS EVERY SECOND USING setInterval() IN START FUNCTION
    //COMPUTE HOURS, MINUTES AND SECONDS
    objectStopWatch.now++;
    var remain = objectStopWatch.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var minutes = Math.floor(remain / 60);
    remain -= minutes * 60;
    var seconds = remain;
    //UPDATE TIMER
    if (hours<10) {hours = "0" + hours;}
    if (minutes<10) {minutes = "0" + minutes;}
    if (seconds<10) {seconds = "0" + seconds;}
    objectStopWatch.swTime.innerHTML = hours + ":" + minutes + ":" + seconds
  },

  //START FUNCTION, KICKS IN WHEN CLICK EVENT OCCURS ON TOGGLE BUTTON DISPLAYING START
  start : function () {
    objectStopWatch.timer = setInterval(objectStopWatch.tick, 1000); //CALL TICK FUNCTION EVERY 1 SEC ACTIVATING TIMER OBJECT
    objectStopWatch.swToggle.value = "STOP"; //CHANGE TOGGLE BUTTON VALUE
    objectStopWatch.swToggle.removeEventListener("click", objectStopWatch.start);//REMOVE START EVENT LISTENER
    objectStopWatch.swToggle.addEventListener("click", objectStopWatch.stop);//ADD STOP EVENT LSITENER
  },

  //STOP FUNCTION, KICKS IN WHEN CLICK EVENT OCCURS ON TOGGLE BUTTON DISPLAYING STOP
  stop : function () {
    clearInterval(objectStopWatch.timer);//STOP TIMER OBJECT FROM CALLING TICK AT 1 SEC INTERVALS
    objectStopWatch.timer = null;//RESET TIMER OBJECT TO NULL
    objectStopWatch.swToggle.value = "START"; //CHANGE TOGGLE BUTTON VALUE
    objectStopWatch.swToggle.removeEventListener("click", objectStopWatch.stop);//REMOVE STOP EVENT LISTENER
    objectStopWatch.swToggle.addEventListener("click", objectStopWatch.start);//ADD START EVENT LSITENER
  },

  //RESET FUNCTION, KICKS IN WHEN CLICK EVENT OCCURS ON RESET BUTTON
  reset : function () {
    if (objectStopWatch.timer != null) {objectStopWatch.stop();}
    objectStopWatch.now = -1;
    objectStopWatch.tick();
  }

};
window.addEventListener("load", objectStopWatch.init);
