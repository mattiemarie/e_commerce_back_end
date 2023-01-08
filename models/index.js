// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Check To See if these are setup Correctly

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Tag.belongssToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
  }
 
});

// Tags belongToMany Products (through ProductTag)cd u
Tag.belongsTo(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id'
  }
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
