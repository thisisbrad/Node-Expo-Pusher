const express = require('express');
const path = require('path');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');

const Pusher = require('./src/services/pusher');

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Expo Push Notification tester',
    message: 'Expo Push Notification tester'
  });
});

app.post('/token', function(req, res) {
  const { token, message } = req.body;
  // TODO: Make a way to figure out one token or multiple
  const pusher = new Pusher([token], message);
  pusher.push();
  res.render('token', { token, message });
});

const server = app.listen(PORT, () => {
  console.log(`### Server is listening on PORT: ${server.address().port} ###`);
});
