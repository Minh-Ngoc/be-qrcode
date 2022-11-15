const express = require('express');
const router = express.Router();

const CDCBController = require('../app/controllers/CDCBController');

router.get('/create', CDCBController.create);
router.post('/store', CDCBController.store);
router.get('/:id/edit', CDCBController.edit);
router.put('/:id', CDCBController.update);
router.patch('/:id/restore', CDCBController.restore);
router.delete('/:id', CDCBController.destroy);
router.delete('/:id/force', CDCBController.forceDestroy);
router.get('/:slug', CDCBController.show);

module.exports = router;
