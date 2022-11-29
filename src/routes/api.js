const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const ApiController = require('../app/controllers/ApiController');

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

// Scan qr code
router.get('/scanqrcode/:id', ApiController.scanQRCode);

// Co so nuoi trong
router.post('/cosonuoitrong/create', ApiController.CSNTCreate);
router.get('/cosonuoitrong/:id/list', ApiController.CSNTList);
router.get('/cosonuoitrong/:id/edit', ApiController.CSNTEdit);
router.put('/cosonuoitrong/:id', ApiController.CSNTUpdate);
router.delete('/cosonuoitrong/:id', ApiController.CSNTDelete);

// Ao nuoi
router.post('/aonuoi/create', ApiController.AoNuoiCreate);
router.get('/aonuoi/:id/list', ApiController.AoNuoiList);
router.get('/aonuoi/:id/edit', ApiController.AoNuoiEdit);
router.put('/aonuoi/:id', ApiController.AoNuoiUpdate);
router.delete('/aonuoi/:id', ApiController.AoNuoiDelete);

// Loai Con Giong
router.get('/loaicongiong/list', ApiController.LoaiConGiongList);

// NCC Con Giong
router.post('/nhacungcapcongiong/create', ApiController.NCCConGiongCreate);
router.get('/nhacungcapcongiong/:id/list', ApiController.NCCConGiongList);
router.get('/nhacungcapcongiong/:id/edit', ApiController.NCCConGiongEdit);
router.put('/nhacungcapcongiong/:id', ApiController.NCCConGiongUpdate);
router.delete('/nhacungcapcongiong/:id', ApiController.NCCConGiongDelete);

// Con Giong
router.post('/congiong/create', ApiController.ConGiongCreate);
router.get('/congiong/:id/list', ApiController.ConGiongList);
// router.get('/congiong/:id/edit', ApiController.ConGiongEdit);
// router.put('/congiong/:id', ApiController.ConGiongUpdate);
// router.delete('/congiong/:id', ApiController.ConGiongDelete);

// Dot nuoi
router.post('/dotnuoi/create', ApiController.DotNuoiCreate);
router.get('/dotnuoi/:id/list', ApiController.DotNuoiList);
// router.get('/dotnuoi/:id/edit', ApiController.DotNuoiEdit);
// router.put('/dotnuoi/:id', ApiController.DotNuoiUpdate);
// router.delete('/dotnuoi/:id', ApiController.DotNuoiDelete);

router.get('/free-endpoint', ApiController.freeEndPoint);
router.get('/auth-endpoint', auth, ApiController.authEndPoint);

// router.get('/manage', ApiController.index);

// router.get('/create', ApiController.create);
// router.post('/store', ApiController.store);
// router.get('/:id/edit', ApiController.edit);
// router.put('/update-detail/:id', ApiController.updateDetail);
// router.patch('/:id/restore', ApiController.restore);
// router.delete('/:id', ApiController.destroy);
// router.get('/:slug', ApiController.show);

module.exports = router;
