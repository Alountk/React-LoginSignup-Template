const express = require('express');
const cors = require('cors')
const app = express();


//Variables Routes
const users = require('./routes/users')
const notes = require('./routes/notes')

//settings
app.set('port', process.env.PORT || 4000)


//

//middleware CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.PUBLIC_DOMAIN);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use('/api/users', users);
app.use('/api/notes', notes)

module.exports = app;