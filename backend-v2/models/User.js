import { DataTypes, Model } from "sequelize";

class User extends Model {
    static initilize(sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            password : {
                type : DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true, // adds createdAt and updatedAt fields
        })
    }
}

export default User;