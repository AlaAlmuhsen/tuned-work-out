import { DataTypes, Model } from "sequelize";

class Workout extends Model {
     static initilize(sequelize) {
            Workout.init({
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                reps: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                load: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            }, {
                sequelize,
                modelName: 'Workout',
                tableName: 'workouts',
                timestamps: true, // adds createdAt and updatedAt fields
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            })
        }
}

export default Workout;