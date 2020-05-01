const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'main.html'));
});

app.listen(2222, () => {
  console.log('Server is running on port 2222');
});
