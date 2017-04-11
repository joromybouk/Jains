import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add set to database");
	var exercisename = req.body.parent;
	var musclename = req.body.grandParent;
	var unit = req.body.unit;
	var weight = req.body.weight;
	var reps = req.body.reps;
	var email = req.body.email;

	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email,musclename,exercisename,weight,unit,reps);


});
function findProfile(db,res,email,musclename,exercisename,weight,unit,reps){
	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') GROUP BY email", function(err, row){
			var id = row[0].ID;
			var str = row[0].info;
			var index = -1;
			var infoObject = JSON.parse(str);

			var list = (infoObject['muscles']);
			for(var i = 0; i < list.length; i ++){
				if(list[i].name === musclename){
					index = i;
					break;
				}
			}
			if(index === -1){
				console.log("Unable to find muscle");
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
			console.log(weight[0]);

			infoObject['muscles'][index].exercises[index2].sets.push({"weight":weight[0],"unit": unit[0], "reps":reps[0]});
			var json = JSON.stringify(infoObject);
			db.run("UPDATE workouts SET info='"+ json +"' WHERE id=" + id);
		})
	});
	res.json({
		success:true
	});
	console.log("Set added to database");
}

export default router;