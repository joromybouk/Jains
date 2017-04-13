import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add new weight record");
	var index = req.body.index;
	var email = req.body.email;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	

	db.serialize(function(){
		db.all("SELECT * from weights where email is '"+email+"'", function(err, row){
			var id = row[index].ID;
			db.run("DELETE from weights where id is " + id);
			db.close();
		});
		
	});
	res.json({
		success:true
	});
});

export default router;