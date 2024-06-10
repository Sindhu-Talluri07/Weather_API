const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = 'a421f643ca3877ca59711292b2d37503';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;
        res.render('index', {
            weather: `It's ${weather.main.temp} degrees in ${weather.name}!`,
            error: null
        });
    } catch (error) {
        res.render('index', {
            weather: null,
            error: 'Error, please try again'
        });
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
