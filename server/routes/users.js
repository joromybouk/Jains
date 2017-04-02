import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();

router.post('/', (req,res) => {
	const { errors, isValid } = validateInput(req.body);

	if(isValid){
		res.json({
			success:true
		})

		//create new user
			// const email = req.body.email;
			// const password = req.body.password + "";
			// const password_hashed = bcrypt.hashSync(password,10);
			// console.log(password_hashed);

			// var fs = require("fs");
			// var file = "./jains.db";
			// var exists = fs.existsSync(file);

			// var sqlite3 = require("sqlite3").verbose();
			// var db = new sqlite3.Database(file);

			// db.serialize(function() {
			// 	if(!exists){
			// 		db.run("CREATE TABLE users(email TEXT UNIQUE, password TEXT)");
			// 	}
	  
	  //   	db.run("INSERT INTO users VALUES('"+ email+"','"+ password_hashed+"')");
			// });
			// db.close();
			// res.json({
			// 	success:true
			// });
	}
	else
	{
		//return error 400 if user input is invalid
		res.status(400).json(errors);
	}

});



export default router;