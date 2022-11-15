const express = require('express');
const router = express.Router();

const DotNuoiController = require('../app/controllers/DotNuoiController');

router.get('/create', DotNuoiController.create);
router.post('/store', DotNuoiController.store);
router.get('/:id/edit', DotNuoiController.edit);
router.get('/:id/add-detail', DotNuoiController.addDetail);
router.put('/:id', DotNuoiController.qrcode);
router.put('/update-detail/:id', DotNuoiController.updateDetail);
router.put('/:id', DotNuoiController.update);
router.patch('/:id/restore', DotNuoiController.restore);
router.delete('/:id', DotNuoiController.destroy);
router.delete('/:id/force', DotNuoiController.forceDestroy);
router.get('/:slug', DotNuoiController.show);

module.exports = router;
