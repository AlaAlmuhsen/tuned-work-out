import Student from "./models/Student.js";
import sequelize from "./test.js";


sequelize.sync().then(() => {
    console.log("Database & tables created!");
}).catch(err => {
    console.error("Error creating database & tables:", err);
});



const st = await Student.findByPk(1)

