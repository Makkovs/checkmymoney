const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const types = [
    "SPENDING",
    "INCOMING"
]

const imgIds = [
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

const CostGroup = sequelize.define("costGroup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false }
});

const Cost = sequelize.define("cost", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM(...types), allowNull: false }
});

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imgId: { type: DataTypes.ENUM(...imgIds), allowNull: false },
    isStandart: { type: DataTypes.BOOLEAN, allowNull: false },
})

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

CostGroup.hasMany(Cost);
Cost.belongsTo(CostGroup);

CostGroup.hasMany(Category);
Category.belongsTo(CostGroup);

Category.hasMany(Cost);
Cost.belongsTo(Category);

User.hasMany(Cost);
Cost.belongsTo(User);

CostGroup.belongsToMany(User, { through: "GroupUser" });
User.belongsToMany(CostGroup, { through: "GroupUser" });

module.exports = {
    User,
    CostGroup,
    Cost,
    Category,
}
