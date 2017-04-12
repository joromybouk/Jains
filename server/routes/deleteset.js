import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to delete set from database");
	var exercisename = req.body.parent;
	var musclename = req.body.grandParent;
	var set = req.body.set;
	var email = req.body.email;

	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email,musclename,exercisename,set);
});
function findProfile(db,res,email,musclename,exercisename,set){
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

			infoObject['muscles'][index].exercises[index2].sets = set;
			var json = JSON.stringify(infoObject);
			db.run("UPDATE workouts SET info='"+ json +"' WHERE id=" + id);
		})
	});
	res.json({
		success:true
	});
	
}

export default router;