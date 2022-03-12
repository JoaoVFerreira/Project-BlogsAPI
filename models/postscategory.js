module.exports = (sequelize, _dataTypes) => {
  const postsCategory = sequelize.define('postsCategory', {},
    {
    timestamps: false });
    postsCategory.associate = (models) => {
    models.blogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.blogPost, {
      as: 'blogposts',
      through: postsCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };
  return postsCategory;
};
