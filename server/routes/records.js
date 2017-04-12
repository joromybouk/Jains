import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to retrieve records from database");
	var email = req.body.email;
	var numRecords = req.body.num;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);
	findProfile(db,res,email,numRecords);

});

function findProfile(db,res,email,numRecords){
	var responseObj = [];	
	var responseDates = [];
	var count = 0;
	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') ORDER BY ID DESC", function(err, row){
			for(var i = 0; i < row.length; i ++){
				var id = row[i].ID;
				var str = row[i].info;
				var date = row[i].date;
				var infoObject = JSON.parse(str);
				responseObj.push(infoObject);
				responseDates.push(date);

			}	
			if(row.length == 0){
				//no records
				console.log("No records found");
				res.status(404).json();
			}
			else{
				//return records 
				console.log("Records found");
				var toReturn = {
					info : responseObj,
					dates: responseDates,
				}
				
				res.status(200).json(toReturn);
			}


			db.close();
		})
		
	});
	
}

export default router;