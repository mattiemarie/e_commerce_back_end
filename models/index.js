// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Check To See if these are setup Correctly

// Products belongsTo Category
Category.hasOne(Product, {
  foreignKey: '',
  onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
  foreignKey: '',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: '',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
ProductTag.hasOne(Product, {
  foreignKey: '',
  onDelete: 'CASCADE',
});

Product.belongsTo(ProductTag, {
  foreignKey: '',
});

// Tags belongToMany Products (through ProductTag)
Product.hasMany(ProductTag, {
  foreignKey: '',
  onDelete: 'CASCADE',
});

Product.belongsTo(ProductTag, {
  foreignKey: '',
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
