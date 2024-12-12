const express = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');

const app = express();
const port = 3000;

// Setup for SerialPort to read data from Arduino
const serialPort = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }); // Change the path to your Arduino's port

let binStatus = 'empty';

// Parse data from Arduino (Full or Empty)
serialPort.on('data', function (data) {
  const status = data.toString().trim();  // Data sent from Arduino (either 'full' or 'empty')
  if (status === 'full') {
    binStatus = 'full';
    console.log('Bin is full');
  } else if (status === 'empty') {
    binStatus = 'empty';
    console.log('Bin is empty');
  }
});

// Endpoint to get the current bin status
app.get('/status', (req, res) => {
  res.json({ status: binStatus });
});

// Frontend notification logic can go here (e.g., send push notifications)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
