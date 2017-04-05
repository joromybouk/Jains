import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateLogin';	
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req,res) => {
	const { errors, isValid } = validateInput(req.body);

	if(isValid){
		const email = req.body.email;
		const password = req.body.password + "";
		var fs = require("fs");
		var file = "./jains.db";
		var exists = fs.existsSync(file);
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
		checkEmail(db,res,errors,email,password);
	}
	else
	{
		//return error 400 if user input is invalid
		res.status(400).json();
	}
});

function checkEmail(db,res,errors,email,password){
	db.serialize(function(){
		db.all("SELECT * from users", function(err, row){
			var validEmail = false;
			for(var i = 0; i < row.length; i ++){
				if(row[i].email == email){
					validEmail = true;
					//Password and email are valid
					if(bcrypt.compareSync(password,row[i].password)){

						const token = jwt.sign({email: row[i].email}, 
							config.jwtSecret);

						res.json({
							token
						});

					}
					else{
						errors.password = 'Password is incorrect';
						res.status(401).json(errors);
					}
				}
			}
			if(!validEmail){
				errors.email = 'Email does not exist';
				res.status(401).json(errors);
			}
		});
		db.close();
	});

}


export default router;