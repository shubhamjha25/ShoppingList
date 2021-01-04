const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

// DB Config
const mongoURI = 'mongodb+srv://Shubham:sj2512@shoppingcluster.zihop.mongodb.net/test?retryWrites=true&w=majority';

// Connect To MongoDB
mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => console.log("MongoDB Connected ..."))
    .catch(err => console.log(err))


// Using The Routes
app.use('/api/items', items);

app.listen(port, () => console.log(`Server running on port ${port}`));