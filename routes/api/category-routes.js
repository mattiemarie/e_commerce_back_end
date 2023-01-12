const router = require('express').Router();
const { Category, Product } = require('../../models');


// FIND all Categories
router.get('/', async(req, res) => {
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryData => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);

    }) 
});

// GET a single Category - include associated Products
router.get('/:id', async (req, res) => {
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id','product_name','price','stock', 'category_id']
      }
    ]
  })
    .then(categoryData => {

      if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
      }
      res.json(categoryData) 
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);

    }) 
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// UPDATE a category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a category 
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
