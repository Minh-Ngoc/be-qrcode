const express = require('express');
const router = express.Router();

const ThuongLaiController = require('../app/controllers/ThuongLaiController');

router.get('/create', ThuongLaiController.create);
router.post('/store', ThuongLaiController.store);
router.get('/:id/edit', ThuongLaiController.edit);
router.put('/:id', ThuongLaiController.update);
router.patch('/:id/restore', ThuongLaiController.restore);
router.delete('/:id', ThuongLaiController.destroy);
router.delete('/:id/force', ThuongLaiController.forceDestroy);
router.get('/:slug', ThuongLaiController.show);

module.exports = router;
