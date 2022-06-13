const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categories);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its assoiated Products
  try {
    const catId    = req.params.id
    const category = await Category.findByPk(catId, {
      include: [{ model: Product }]
    });
    res.status(200).json(category);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  const body = req.body;
  console.log(body);
  Category.create(body).then((category) => {
    res.status(200).json(category);
  }).catch((error) => {
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const catId    = req.params.id
  const body = req.body;
  Category.update(body, {
    where: {id: catId}
  }).then((category) => {
    res.status(200).json(category);
  }).catch((error) => {
    res.status(500).json(error);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catId    = req.params.id
    const category = await Category.destroy({
      where: {
        id: catId
      }
    });
    if(!category) {
      res.status(404).json({message: 'No Category found with the selected id!'});
      return;
    }
    res.status(200).json(category);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
