const path = require('path');
// load dependencies
const env = require('dotenv');
const csrf = require('csurf');
const cors = require('cors');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store
const Departmentconfig = require("./app/models/Departmentconfig");
const Examschedule = require("./app/models/Examschedule");
const Report = require("./app/models/Report");
const Cheifexaminer = require("./app/models/Cheifexaminer");
const Student = require("./app/models/Student");
const Room = require('./app/models/room');


const app = express();
const csrfProtection = csrf();
const router = express.Router();

//Loading Routes
const webRoutes = require('./routes/web');
const sequelize = require('./config/database');
const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(cors({
	origin: 'http://localhost:5173', // Replace with your frontend URL
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// required for csurf
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  	cookie: { path: '/', httpOnly: true, maxAge: 1209600000 }, // maxAge two weeks in milliseconds, remove secure: true for local development
    store: new SequelizeStore({
    	db: sequelize,
    	table: "sessions",
    }),
}));

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	// res.locals.csrfToken = req.csrfToken();
	next();
});

app.engine(
	'hbs',
	expressHbs.engine({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'web_layout',
		partialsDir: [
			"views/partials/",
		],
		extname: 'hbs'
	})
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(webRoutes);
app.use(errorController.pageNotFound);

sequelize
	//.sync({force : true})
	.sync()
	.then(() => {
		app.listen(process.env.PORT);
		//pending set timezone
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});
