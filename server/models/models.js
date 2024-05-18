const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const categories = [
    "FOOD",
    "HOUSING",
    "TRANSPORT",
    "MEDICINE",
    "ENTERTAINMENT",
    "CLOTHING",
    "TRAVEL",
    "UTILITIES",
    "DEBT PAYMENTS",
    "HOUSEHOLD APPLIANCES",
    "SALARY",
    "RENT",
    "BONUSES",
    "PROPERTY SALES",
    "OTHER"
];

const types = [
    "SPENDING",
    "INCOMING"
]

const CostGroup = sequelize.define("costGroup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Cost = sequelize.define("cost", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cost: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.ENUM(...categories), allowNull: false },
    type: { type: DataTypes.ENUM(...types), allowNull: false }
});

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

User.hasMany(CostGroup);
CostGroup.belongsTo(User);

CostGroup.hasMany(Cost);
Cost.belongsTo(CostGroup);

User.hasMany(Cost);
Cost.belongsTo(User);

CostGroup.belongsToMany(User, { through: "GroupUser" });
User.belongsToMany(CostGroup, { through: "GroupUser" });

module.exports = {
    User,
    CostGroup,
    Cost
}
