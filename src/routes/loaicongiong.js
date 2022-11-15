const express = require('express');
const router = express.Router();

const LoaiCGController = require('../app/controllers/LoaiCGController');

router.get('/create', LoaiCGController.create);
router.post('/store', LoaiCGController.store);
router.get('/:id/edit', LoaiCGController.edit);
router.put('/:id', LoaiCGController.update);
router.patch('/:id/restore', LoaiCGController.restore);
router.delete('/:id', LoaiCGController.destroy);
router.delete('/:id/force', LoaiCGController.forceDestroy);
router.get('/:slug', LoaiCGController.show);

module.exports = router;
