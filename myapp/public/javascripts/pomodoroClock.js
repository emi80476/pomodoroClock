
var pomodoro = {
	startTime: 25 * 60,
	timeRemaining: 25 * 60,
	timeoutID: null,
	breakTimeout: 1,
	running: 0,
	setPomodoro: function(time){
		this.timeRemaining = time * 60;
		this.startTime = time * 60;

		this.running = 0;
		var mins = Math.floor(this.timeRemaining / 60);
		var secs = this.timeRemaining % 60;

		document.getElementById('minutes').innerHTML = ('0' + mins).slice(-2);
		document.getElementById('seconds').innerHTML = ('0' + secs).slice(-2);

	},
	startPause: function(){
		var that = this;
		if (this.running === 0) {
			this.running = 1;
			document.getElementById('start').innerHTML = 'Pause';
			this.timeoutID = setInterval(function(){
				var mins = Math.floor(that.timeRemaining / 60);
				var secs = that.timeRemaining % 60;
				if (that.timeRemaining < 0) {
					that.breakTimeout++;
					if (that.breakTimeout % 2 === 0) {
						document.getElementById('label').innerHTML = "BREAK";
						var number = $('#break').text();
						number = parseInt(number, 10);
						pomodoro.timeRemaining = number * 60;
					} else {
						document.getElementById('label').innerHTML = "SESSION";
						that.timeRemaining = that.startTime;
					}
				} else {
					document.getElementById('minutes').innerHTML = ('0' + mins).slice(-2);
					document.getElementById('seconds').innerHTML = ('0' + secs).slice(-2);
					that.timeRemaining--;
				}}, 1000);
		} else {
			this.running = 0;
			document.getElementById('start').innerHTML = 'Resume';
			clearInterval(this.timeoutID);
		}
	},
	stopPomodoro: function(){    
		this.running = 0;
		clearInterval(this.timeoutID);
		document.getElementById('start').setAttribute('class', 'btn btn-info');
		document.getElementById('break').innerHTML = 1
		document.getElementById('session').innerHTML = 25;
		document.getElementById('start').innerHTML = 'Start';
		document.getElementById('label').innerHTML = "SESSION";
	}
};

pomodoro.setPomodoro(25);

$('#sessionUp').click(function(){
	var number = $('#session').text();
	number = parseInt(number, 10) + 1
	pomodoro.setPomodoro(number);
	document.getElementById('session').innerHTML = ('0' + number).slice(-2);
  //console.log(pomodoro.timeRemaining);
});
$('#sessionDown').click(function(){
	var number = $('#session').text();
	number = parseInt(number, 10) - 1;
  //document.getElementById('session').innerHTML = ('0' + number).slice(-2);
  if (number - 1 >= 0) {
  	document.getElementById('session').innerHTML = number;
  } else {
  	number = 0;
  	document.getElementById('session').innerHTML = number;
  }
  pomodoro.setPomodoro(number);
  //console.log(pomodoro.timeRemaining);
});
$('#breakUp').click(function(){
	var number = $('#break').text();
	number = parseInt(number, 10) + 1;
	document.getElementById('break').innerHTML = number;
});
$('#breakDown').click(function(){
	var number = $('#break').text();
	number = parseInt(number, 10) - 1;
	if (number - 1 >= 0) {
		document.getElementById('break').innerHTML = number;
	} else {
		document.getElementById('break').innerHTML = 0;
	}
});
$('#start').click(function(){
	pomodoro.startPause();});
$('#stop').click(function(){
	pomodoro.stopPomodoro();
	pomodoro.setPomodoro(25);
});