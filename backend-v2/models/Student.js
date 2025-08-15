import { DataTypes } from "sequelize";
import sequelize from "../test.js";
console.log("sss")
const Student = sequelize.define('Student', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
})



export default Student;