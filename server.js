const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000

require('./routes/api_routes')(app);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/master_db",
  { useNewUrlParser: true }
);

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});