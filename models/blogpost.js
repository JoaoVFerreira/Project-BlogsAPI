module.exports = (sequelize, dataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: dataTypes.STRING,
    content: dataTypes.STRING,
    userId: dataTypes.INTEGER,
    createdAt: { field: 'published', type: dataTypes.DATE },
    updatedAt: { field: 'updated', type: dataTypes.DATE },
  });
  
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return BlogPost;
};