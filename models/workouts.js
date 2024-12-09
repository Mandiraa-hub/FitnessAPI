const mongoose = require('mongoose');

const workoutSchema= new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Name is required']
	},
	duration:{
		type:String,
		required:[true,'duration is required']
	},
	status:{
		type:String,
		required:[true,'status is required']
	},
	dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('Workout',workoutSchema);