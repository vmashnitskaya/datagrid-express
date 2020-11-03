const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/users/', require('./routes/userData.routes'));
app.use('/api/apps/', require('./routes/appData.routers'));
app.use('/api/locations/', require('./routes/locationData.routes'));


const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        console.log(process.env.MONGOURI);
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();