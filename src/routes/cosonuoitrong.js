const express = require('express');
const router = express.Router();

const CoSoNuoiTrongController = require('../app/controllers/CoSoNuoiTrongController');

router.get('/create', CoSoNuoiTrongController.create);
router.post('/store', CoSoNuoiTrongController.store);
router.get('/:id/edit', CoSoNuoiTrongController.edit);
router.put('/:id', CoSoNuoiTrongController.update);
router.patch('/:id/restore', CoSoNuoiTrongController.restore);
router.delete('/:id', CoSoNuoiTrongController.destroy);
router.delete('/:id/force', CoSoNuoiTrongController.forceDestroy);

module.exports = router;
