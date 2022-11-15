const express = require('express');
const router = express.Router();

const ConGiongController = require('../app/controllers/ConGiongController');

router.get('/create', ConGiongController.create);
router.post('/store', ConGiongController.store);
router.get('/:id/edit', ConGiongController.edit);
router.put('/:id', ConGiongController.update);
router.patch('/:id/restore', ConGiongController.restore);
router.delete('/:id', ConGiongController.destroy);
router.delete('/:id/force', ConGiongController.forceDestroy);
router.get('/:slug', ConGiongController.show);

module.exports = router;
