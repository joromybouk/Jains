import express from 'express';
import Validator from 'validator';
import validateInput from '../shared/validation/validateSignup';	

let router = express.Router();

router.post('/', (req,res) => {
	const { errors, isValid } = validateInput(req.body);

	if(isValid){
		res.json({
			success:true
		})
	}
	else
	{
		//return error 400 if user input is invalid
		res.status(400).json(errors);
	}

});



export default router;