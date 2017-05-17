import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add new weight record");
	var email = req.body.email;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email);
});

function findProfile(db,res,email){
	db.serialize(function(){
		db.all("SELECT * from weights where email is '"+email+"'", function(err, row){
			var weightList = [];
			if(row.length === 0){
				console.log("No weight records found");
				var text = 'Start tracking your weight';
				var toSend={
					text: text,
					weights: [],
				}
				res.status(200).json(toSend);
				db.close();
			}
			else{
				for(var i = 0; i < row.length; i++){
					var weight = {
						date: row[i].date,
						time:row[i].time,
						unit: row[i].unit,
						weight: row[i].weight,
					}
					weightList.push(weight);
				}
				var toSend={
					text: '',
					weights: weightList,
				}
				res.status(200).json(toSend);
				db.close();
			}
		});
	});
}

export default router;