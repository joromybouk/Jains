import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add Muscle: " + req.body.name + " to database");
	var musclename = req.body.name;
	var email = req.body.email;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email,musclename)
});
function findProfile(db,res,email,musclename){
	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') GROUP BY email", function(err, row){
			var id = row[0].ID;
			var str = row[0].info;

			var infoObject = JSON.parse(str);
			infoObject['muscles'].push({"name":musclename, "exercises":[]})
			var json = JSON.stringify(infoObject);
			db.run("UPDATE workouts SET info='"+ json +"' WHERE id=" + id);
		})
	});
	res.json({
		success:true
	});
	console.log("Muscle added to database");
}

export default router;