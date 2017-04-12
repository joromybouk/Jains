import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to delete exercise: " + req.body.exercise + " from database");
	var exercisename = req.body.exercise;
	var email = req.body.email;
	var muscle = req.body.muscle;

	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email,exercisename,muscle)
});
function findProfile(db,res,email,exercisename,muscle){
	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') GROUP BY email", function(err, row){
			var id = row[0].ID;
			var str = row[0].info;
			var index = -1;
			var infoObject = JSON.parse(str);

			var list = (infoObject['muscles']);

			for(var i = 0; i < list.length; i ++){
				if(list[i].name === muscle){
					index = i;
					break;
				}
			}
			if(index === -1){
				console.log("Unable to find muscle linked with exercise");
				db.close();
				res.status(401);
				return;
			}
			var index2 = -1;
			list = (infoObject['muscles'][index].exercises);
			for(var i = 0; i < list.length; i ++){

				if(list[i].name === exercisename){
					index2 = i;
					break;
				}
			}
			if(index2 === -1){
				console.log("Unable to find exercise");
				db.close();
				res.status(401);
				return;
			}
			infoObject['muscles'][index].exercises.splice(index2,1);
			var json = JSON.stringify(infoObject);
			db.run("UPDATE workouts SET info='"+ json +"' WHERE id=" + id);
		})
	});
	res.json({
		success:true
	});
	console.log("Exercise added to database");
}

export default router;