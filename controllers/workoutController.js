const Workout = require("../models/workouts.js");
const bcrypt=require("bcrypt");
const auth = require("../auth.js");

module.exports.addWorkout=(req,res)=>{
	const {name, duration, status} = req.body;
	  if (!name || !duration || !status) {
            return res.status(400).send({ message: 'All fields are required (name, duration, status).' });
        }
        const newWorkout = new Workout({
            name :req.body.name,
            duration:req.body.duration,
            status:req.body.status
        })

        return newWorkout.save()
        .then((result)=>res.status(201).send({
        	message:'Workout added Successfully',
        	workout: result
        }))
        .catch(error => errorHandler(error,req,res));
};

module.exports.getMyWorkouts=(req,res) =>{
	Workout.find()
        .then((workouts) => {
            if (workouts.length === 0) {
                return res.status(404).send({
                    message: 'No workouts found.'
                });
            }
            return res.status(200).send({
                message: 'Workouts retrieved successfully.',
                workouts
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error retrieving workouts.',
                error: error.message
            });
        });
};

module.exports.updateMyWorkouts=(req,res)=>{
	 const { id } = req.params; // Get the workout ID from the URL
    const { name, duration, status } = req.body; // Get the fields to update from the request body

    // Check if the required fields are provided
    if (!name && !duration && !status) {
        return res.status(400).send({
            message: 'At least one field (name, duration, or status) must be provided to update.'
        });
    }

    // Update the workout
    Workout.findByIdAndUpdate(
        id, // The ID of the workout to update
        { name, duration, status }, // Fields to update
        { new: true, runValidators: true } // Return the updated document and validate fields
    )
        .then((updatedWorkout) => {
            if (!updatedWorkout) {
                return res.status(404).send({
                    message: `Workout with ID ${id} not found.`
                });
            }
            return res.status(200).send({
                message: 'Workout updated successfully.',
                workout: updatedWorkout
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error updating workout.',
                error: error.message
            });
        });
};

module.exports.deleteMyWorkouts=(req,res)=>{
	 const { id } = req.params; // Get the workout ID from the URL

    Workout.findByIdAndDelete(id)
        .then((deletedWorkout) => {
            if (!deletedWorkout) {
                return res.status(404).send({
                    message: `Workout with ID ${id} not found.`
                });
            }
            return res.status(200).send({
                message: 'Workout deleted successfully.',
                workout: deletedWorkout
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error deleting workout.',
                error: error.message
            });
        });
};

module.exports.completedWorkoutStatus = (req, res) => {
    Workout.find({ status: 'Completed' }) // Find all workouts with status "Completed"
        .then((completedWorkouts) => {
            if (completedWorkouts.length === 0) {
                return res.status(404).send({
                    message: 'No workouts with status "Completed" found.'
                });
            }
            return res.status(200).send({
                message: 'Completed workouts retrieved successfully.',
                workouts: completedWorkouts
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: 'Error retrieving completed workouts.',
                error: error.message
            });
        });
};


   