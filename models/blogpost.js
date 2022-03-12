module.exports = (sequelize, dataTypes) => {
  const blogPost = sequelize.define('blogPost', {
    title: dataTypes.STRING,
    content: dataTypes.STRING,
    userId: dataTypes.INTEGER,
    published: dataTypes.DATE,
    updated: dataTypes.DATE,
  },
    {
    timestamps: false,
  });
  
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return blogPost;
};