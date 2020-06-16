const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const register = require('./controllers/register');

const db = knex({
	client: "pg",
	connection: {
		host: "postgresql-amorphous-31183",
		user: "Ismail",
		password: "",
		database: "smart-brain",
	},
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.send('it is working!')})
app.post("/signin", signIn.handlesignIn(db, bcrypt));
app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req,res) => {
	profile.handleProfileGet(req, res, db)});
app.put("/image", (req,res) => {
	image.handleImage(req,res,db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
	console.log("app is running on port ${process.env.PORT}")});