import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validatePassChange';	
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req,res) => {
	const { errors, isValid } = validateInput(req.body);
	if(isValid){
		const email = req.body.email;
		const password = req.body.user.password + "";
		const newpassword = req.body.user.newpassword;
		const confirmnewpassword = req.body.user.confirmnewpassword;
		var fs = require("fs");
		var file = "./jains.db";
		var exists = fs.existsSync(file);
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
		checkEmail(db,res,errors,email,password,newpassword,confirmnewpassword);
	}
	else
	{
		//return error 400 if user input is invalid
		res.status(400).json();
	}
});
function checkEmail(db,res,errors,email,password,newpassword,confirmnewpassword){
	db.serialize(function(){
		console.log(email);
		db.all("SELECT * from users where email is '"+email+"'", function(err, row){
			console.log("change");
			console.log(password);
			console.log(row[0].password);
				if(bcrypt.compareSync(password,row[0].password)){
					//change password
					console.log("wag1");
					var pass = req.body.newpassword + "";
					const password_hashed = bcrypt.hashSync(pass,10);
					db.run("UPDATE users set password = '" + password_hashed  +"' where email is '" + email + "'");
					res.json({
						success:true
					});		
					db.close();	
				}
				else{
					errors.password = 'Password is incorrect';
					res.status(401).json(errors);
					db.close();
				}
				
			});		
	});
}


export default router;