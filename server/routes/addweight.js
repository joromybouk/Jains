import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add new weight record");
	var weightData = req.body.weightData;
	var email = req.body.email;
	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	
	var date = weightData.date;
	var time = weightData.time;
	var unit = weightData.unit;
	var weight = weightData.weight;

	db.serialize(function(){
		db.run("INSERT INTO weights (email,date,weight,unit,time) VALUES('"+ email+"','"+ date+"','"+ weight+"','" + unit+"','" + time+"')");
	});
	db.close();
	console.log("Weight record added to database");
	res.json({
		success:true
	});
});

export default router;