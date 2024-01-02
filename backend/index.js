const express = require('express');

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.send('This is the main page.')
})

app.listen(port, () => {
    console.log(`The backend server is running at http://localhost:${port}`);
})