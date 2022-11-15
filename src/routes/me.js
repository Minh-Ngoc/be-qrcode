const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/taikhoan', meController.storedTaikhoans);
// router.get('/stored/vaitro', meController.storedVaiTros);
router.get('/stored/dotnuoi', meController.storedDotNuois);
router.get('/stored/aonuoi', meController.storedAoNuois);
router.get('/stored/cosonuoitrong', meController.storedCoSoNuoiTrongs);
router.get('/stored/congiong', meController.storedConGiongs);
router.get('/stored/loaicongiong', meController.storedLoaiConGiongs);
router.get('/stored/ncccongiong', meController.storedNCCConGiongs);
router.get('/stored/thuonglai', meController.storedThuongLais);
router.get('/stored/congdoanchebien', meController.storedCDCBs);
router.get('/stored/sanpham', meController.storedSanPhams);

router.get('/trash/taikhoan', meController.trashTaikhoans);
router.get('/trash/dotnuoi', meController.trashDotNuois);

module.exports = router;
