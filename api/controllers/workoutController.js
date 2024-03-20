const workoutModel = require('../models/workoutModel')
const mongo = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {

    // Retrieves workouts from schema, and sorts them in descending order.
    const workouts = await workoutModel.find({}).sort({createdAt: -1})

    // send workouts to client
    res.status(200).json(workouts)

}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    // Check if id exists in mongo db
    if (!mongo.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout does not exist'})
    }
    const workout = await workoutModel.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    res.status(200).json(workout)
}

//create workout
const createWorkout = async(req, res) => {
    const title = req.body.title
    const load = req.body.load
    const reps = req.body.reps
    try {
        const workout = await workoutModel.create({title,load,reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete workout
const deleteWorkout = async(req, res) => {
    const {id} = req.params
    // Checks if id is in mongo db
    if (!mongo.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout does not exist'})
    }
    // Deletes workout through mongo's object methods
    const delWorkout= await workoutModel.findOneAndDelete({_id: id})

    // Check if workout found
    if (!delWorkout){
        res.status(404).json({error: 'Workout does not exist'})
    }
    res.status(200).json({delWorkout})
}

//update workout

const updateWorkout = async(req, res) => {
    // Grab id from request
    const {id} = req.params
    // Checks if id is in mongo db
    if (!mongo.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout does not exist'})
    }

    // Updates workout through mongo's object methods
    const patchWorkout = await workoutModel.findOneAndUpdate({_id: id} , {
        ...req.body
    })

    // Check if workout found
    if (!patchWorkout){
        res.status(404).json({error: 'Workout does not exist'})
    }
    res.status(200).json({patchWorkout})
   
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}