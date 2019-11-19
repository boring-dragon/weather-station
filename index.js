var express = require('express');

var app = express();
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 4000...");
})

var io = require('socket.io')(server); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM5'); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
const parser = port.pipe(new Readline({
    delimiter: '\r\n'
})); //Read the line only when new line comes.
parser.on('data', (data) => { //Read data
    dataArray = data.split(",");

    temperature = dataArray[0];
    humidity = dataArray[1];

    jsonData = `data: {Temperature: ${temperature}, Humidity: ${humidity} }`;

    console.log(JSON.stringify(jsonData, null, 2));
    var today = new Date();
    var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    weekday = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"
    ];
    var day = weekday[today.getDay()];
    var secondDay = weekday[today.getDay() + 1];
    var thirdDay = weekday[today.getDay() + 2];
    var fourthDay = weekday[today.getDay() + 3];
    io.sockets.emit('data', {
        humidity: humidity,
        temperature: temperature,
        date: date,
        day: day,
        secondDay: secondDay,
        thirdDay: thirdDay,
        fourthDay: fourthDay
    });
});

io.on('connection', (socket) => {
    var address = socket.handshake.address;
    var time = socket.handshake.time;
    console.log(address + " connected. at " + time);
})