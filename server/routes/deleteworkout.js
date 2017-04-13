import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to delete workout from database");
	var email = req.body.email;
	var index = req.body.index;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);

	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') ORDER BY ID DESC", function(err, row){
			var id = row[index].ID;
			db.run("DELETE from workouts where id is " + id);
			res.json({
				success:true
			});
			console.log("workout removed from database");
			db.close();
		})
	});
});

export default router;