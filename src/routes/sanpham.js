const express = require('express');
const router = express.Router();

const SanPhamController = require('../app/controllers/SanPhamController');

router.get('/create', SanPhamController.create);
router.post('/store', SanPhamController.store);
router.get('/:id/edit', SanPhamController.edit);
router.put('/:id', SanPhamController.update);
router.patch('/:id/restore', SanPhamController.restore);
router.delete('/:id', SanPhamController.destroy);
router.delete('/:id/force', SanPhamController.forceDestroy);
router.get('/:slug', SanPhamController.show);

module.exports = router;
