const express = require("express");
const router =  express.Router();

const workoutController = require("../controllers/workoutController");

const verify = require("../auth.js");

router.post("/addWorkout", workoutController.addWorkout);
router.get("/getMyWorkouts", workoutController.getMyWorkouts);
router.put("/updateWorkout/:id", workoutController.updateMyWorkouts);
router.delete("/deleteWorkout/:id", workoutController.deleteMyWorkouts);
router.get("/completeWorkoutStatus", workoutController.completedWorkoutStatus);

// Exportable Router
module.exports = router;