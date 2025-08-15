import DataBase from "../db/connection.js";
import User from "./User.js";
import Workout from "./Workout.js";

async function initModels(){
    const workoutDb = DataBase.getInstanse().getWorkoutDb();

    User.initilize(workoutDb);
    Workout.initilize(workoutDb);

    User.hasMany(Workout, {
        foreignKey: 'user_id', // foreign key in Workout table
        as: 'workouts' // alias for the association
    });

    Workout.belongsTo(User, {
        foreignKey: 'user_id', // foreign key in Workout table
        as: 'user' // alias for the association
    }); 


    await workoutDb.sync({ force: true });
}

export default initModels;