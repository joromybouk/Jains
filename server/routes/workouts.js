import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add workout to database");
	var email = req.body.email;
	var data ={ 
    		"muscles":[]
    };
	var json = JSON.stringify(data);
	console.log(json);
	var today = new Date();
	var date;
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear();

	if(dd<10){
    	dd ='0'+dd;
	} 
	if(mm<10){
    	mm ='0'+mm;
	}
	date = dd + "/" + mm + "/" + yy;

	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);
	db.serialize(function(){
		db.run("INSERT INTO workouts (email,date,info) VALUES('"+ email+"','"+ date+"','"+ json+"')");
	});
	db.close();
	console.log("Workout added to database");
	res.json({
		success:true
	});
});

export default router;