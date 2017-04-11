import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();


router.post('/', (req,res) => {
	console.log("Attempting to add exercise: " + req.body.name + " to database");
	var exercisename = req.body.name;
	var email = req.body.email;
	var parentName = req.body.parent;

	var fs = require("fs");
	var file = "./jains.db";
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);	
	findProfile(db,res,email,exercisename,parentName)
});
function findProfile(db,res,email,exercisename,parentName){
	db.serialize(function(){
		db.all("SELECT id,email,date,info from workouts WHERE (email is '"+ email+ "') GROUP BY email", function(err, row){
			var id = row[0].ID;
			var str = row[0].info;
			var index = -1;
			var infoObject = JSON.parse(str);

			var list = (infoObject['muscles']);

			for(var i = 0; i < list.length; i ++){
				if(list[i].name === parentName){
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
			infoObject['muscles'][index].exercises.push({"name":exercisename, "sets":[]});
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