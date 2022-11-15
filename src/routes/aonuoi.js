const express = require('express');
const router = express.Router();

const AoNuoiController = require('../app/controllers/AoNuoiController');

router.get('/create', AoNuoiController.create);
router.post('/store', AoNuoiController.store);
router.get('/:id/edit', AoNuoiController.edit);
router.put('/:id', AoNuoiController.update);
router.patch('/:id/restore', AoNuoiController.restore);
router.delete('/:id', AoNuoiController.destroy);
router.delete('/:id/force', AoNuoiController.forceDestroy);

module.exports = router;
