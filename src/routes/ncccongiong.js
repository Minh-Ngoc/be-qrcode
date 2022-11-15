const express = require('express');
const router = express.Router();

const NCCConGiongController = require('../app/controllers/NCCConGiongController');

router.get('/create', NCCConGiongController.create);
router.post('/store', NCCConGiongController.store);
router.get('/:id/edit', NCCConGiongController.edit);
router.put('/:id', NCCConGiongController.update);
router.patch('/:id/restore', NCCConGiongController.restore);
router.delete('/:id', NCCConGiongController.destroy);
router.delete('/:id/force', NCCConGiongController.forceDestroy);
router.get('/:slug', NCCConGiongController.show);

module.exports = router;
