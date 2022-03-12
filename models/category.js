module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  },
    {
    timestamps: false,
  });
  return Category;
};