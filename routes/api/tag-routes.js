const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// GET all tags - include its assoiciated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id','product-name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(tagData => res.json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  })
});

// GET one tag - include associated Product Data
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
      include: [
        { model: Product,
          attributes: ['id', 'product_name', 'price', 'stock','category_id']
        }
      ]
    })
      .then(tagData => {

        if (!tagData) {
          res.status(404).json({ message: 'No tag found with this id!' });
          return;
        }
        res.json(tagData)
      })
      
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      })
});


// CREATE a new tag
router.post('/', async(req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

//DELETE a tag
router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
