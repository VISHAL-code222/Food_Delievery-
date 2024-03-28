const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes/apiRoutes');
const app = express();

app.use(bodyParser.json());


app.use('/api', apiRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
