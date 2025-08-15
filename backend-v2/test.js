import { Sequelize } from "sequelize";

const sequelize = new Sequelize('workout', 'workout', 'Aa12345#', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // logging: false,
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


export default sequelize;   


// // add student model to the sequelize instance
// sequelize.addModels([Student]);

// sequelize.sync()

