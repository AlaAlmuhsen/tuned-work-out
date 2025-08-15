import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;


class DataBase {
    static instanse = null;
    _workoutDb;

    constructor() {
    }

    /**
     * 
     * @returns {DataBase}
     */
    static getInstanse() {
        if (!DataBase.instanse) {
            DataBase.instanse = new DataBase();
        }

        return DataBase.instanse;
    }

    // create connection and assign it to the workoutDb
    async initWorkoutDb() {
        if (this._workoutDb) {
            return;
        }

        console.debug(
            `Trying to Connect to ${DB_NAME} ` +
            `mysql ${DB_HOST} -u ${DB_USER} -p ${DB_PASSWORD}`
        );

        const sequelize = new Sequelize(
            DB_NAME, // database name
            DB_USER, // username
            DB_PASSWORD, // password
            {
                host: DB_HOST,
                dialect: "mysql",
                port: 3306,
                logging: (msg) => {
                    console.log("[MYSQL]", msg)
                },
                define:{
                    freezeTableName:true
                }
            },
            
        );

        await sequelize.authenticate();
        console.debug("Connected to workout Db Sucessfully")
        this._workoutDb = sequelize;
    }

    /**
     * 
     * @returns {Sequelize}
     */
    getWorkoutDb(){
        return this._workoutDb
    }
}


export default DataBase;