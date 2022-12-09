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

router.put('/aonuoi/addcsmtdetail/:id', ApiController.addCSMTDetail);
router.put('/aonuoi/addthuocthuysansd/:id', ApiController.addThuocThuySanSD);
router.put('/aonuoi/addnhatkyxuatao/:id', ApiController.addNhatKyXuatAo);
router.get('/nhatkyxuatao/:id/list', ApiController.NKXAList);

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
router.get('/dotnuoi/:id/edit', ApiController.DotNuoiEdit);
// router.put('/dotnuoi/:id', ApiController.DotNuoiUpdate);
// router.delete('/dotnuoi/:id', ApiController.DotNuoiDelete);

// Giai doan nuoi
router.post('/giaidoan/create', ApiController.GiaiDoanCreate);
router.get('/giaidoan/:id/list', ApiController.GiaiDoanList);
router.put('/giaidoan/addthucansd/:id', ApiController.AddThucAnSD);

// router.get('/giaidoan/:id/edit', ApiController.GiaiDoanEdit);
// router.put('/giaidoan/:id', ApiController.GiaiDoanUpdate);
// router.delete('/giaidoan/:id', ApiController.GiaiDoanDelete);

// Thưc an
router.post('/thucan/create', ApiController.ThucAnCreate);
router.get('/thucan/:id/list', ApiController.ThucAnList);
// router.get('/thucan/:id/edit', ApiController.ThucAnEdit);
// router.put('/thucan/:id', ApiController.ThucAnUpdate);
// router.delete('/thucan/:id', ApiController.ThucAnDelete);

// Chi so moi truong
router.post('/chisomoitruong/create', ApiController.CSMTCreate);
router.get('/chisomoitruong/:id/list', ApiController.CSMTList);
// router.get('/thucan/:id/edit', ApiController.ThucAnEdit);
// router.put('/thucan/:id', ApiController.ThucAnUpdate);
// router.delete('/thucan/:id', ApiController.ThucAnDelete);

// Thuoc Thuy San
router.post('/thuocthuysan/create', ApiController.ThuocThuySanCreate);
router.get('/thuocthuysan/:id/list', ApiController.ThuocThuySanList);
// router.get('/thucan/:id/edit', ApiController.ThucAnEdit);
// router.put('/thucan/:id', ApiController.ThucAnUpdate);
// router.delete('/thucan/:id', ApiController.ThucAnDelete);

// Thuong Lai
router.post('/thuonglai/create', ApiController.ThuongLaiCreate);
router.get('/thuonglai/:id/list', ApiController.ThuongLaiList);
// router.get('/thucan/:id/edit', ApiController.ThucAnEdit);
// router.put('/thucan/:id', ApiController.ThucAnUpdate);
// router.delete('/thucan/:id', ApiController.ThucAnDelete);

router.get('/free-endpoint', ApiController.freeEndPoint);
router.get('/auth-endpoint', auth, ApiController.authEndPoint);

module.exports = router;
