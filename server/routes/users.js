import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	
var bcrypt = require('bcrypt');
let router = express.Router();


var insert;

router.post('/', (req,res) => {
	const { errors, isValid } = validateInput(req.body);

	if(isValid){

		insert = true;

		//create new user
			const email = req.body.email;
			const password = req.body.password + "";
			const password_hashed = bcrypt.hashSync(password,10);
			console.log(password_hashed);

			var fs = require("fs");
			var file = "./jains.db";
			var exists = fs.existsSync(file);

			var sqlite3 = require("sqlite3").verbose();
			var db = new sqlite3.Database(file);
			db.serialize(function() {
				if(!exists){
					db.run("CREATE TABLE users(email TEXT UNIQUE, password TEXT)");
				}
			});
			checkEmail(db,res,email,errors,password_hashed);
	}
	else
	{
		//return error 400 if user input is invalid
		res.status(400).json(errors);
	}
});
function checkEmail(db,res,email,errors,password_hashed){
	db.serialize(function(){
		db.all("SELECT email from users", function(err, row){
			for(var i = 0; i < row.length; i ++){
				if(row[i].email == email){
					insert = false;
				}
			}
			handleResult(email,res,db,errors,password_hashed);
		});
		
	});
}
function handleResult(email,res,db,errors,password_hashed){
	db.serialize(function(){
		if(insert){
			db.run("INSERT INTO users VALUES('"+ email+"','"+ password_hashed+"')");
		}
	});
	db.close();
	closeDb(res,errors);
}
function closeDb(res,errors){
	if(!insert){
		errors.email = 'Email has been taken';
		res.status(400).json(errors);
	}
	else{
	res.json({
		success:true
	});
	}
}
export default router;