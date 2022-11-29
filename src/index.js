require('dotenv').config({path: __dirname + '/.env' })

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const cors = require('cors');
const hdb = require('handlebars');

const route = require('./routes');
const db = require('./config/db');

const app = express();

app.use(cors());

app.use(express.json());
// Connect to DB

db.connect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });



const port = process.env.PORT || 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        handlebars: allowInsecurePrototypeAccess(hdb),
        helpers: {
            sum: (a, b) => a + b,
            
            checkQR: (qr, id) => {
                if(!qr) {
                    return new hdb.SafeString(`<form action="/dotnuoi/`+ id +`?_method=PUT" method="POST">
                                                <button class="btn btn-primary">Cấp mã</button>
                                            </form>`)
                } else {
                    return new hdb.SafeString("<span>Đã cấp mã</span>");
                }
            },
            checkImage: image => {
                if(!image) {
                    return new hdb.SafeString("<span>Chưa cấp mã QR</span>");
                } else {
                    return new hdb.SafeString(`<img style="width: 100px;" src="`+ image +`" class="img-thumbnail" alt="...">`)
                }
            }, 
            
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
