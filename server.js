const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000

require('./routes/api_routes')(app);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/thelist_db",
  { useNewUrlParser: true }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});