const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('config');
const path = require('path');
const port = process.env.PORT || 5000;

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

// DB Config
const mongoURI = config.get('mongoURI');

// Connect To MongoDB
mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => console.log("MongoDB Connected ..."))
    .catch(err => console.log(err))


// Using The Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve The Sattic Assets (if in Production)
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));