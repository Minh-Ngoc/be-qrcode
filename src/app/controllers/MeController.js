const TaiKhoan = require('../models/TaiKhoan');
const ThuongLai = require('../models/ThuongLai');
const DotNuoi = require('../models/DotNuoi');
const AoNuoi = require('../models/AoNuoi');
const ConGiong = require('../models/ConGiong');
const LoaiConGiong = require('../models/LoaiConGiong');
const NCCConGiong = require('../models/NCCConGiong');
const CongDoanCheBien = require('../models/CongDoanCheBien');
const CoSoNuoiTrong = require('../models/CoSoNuoiTrong');
const SanPham = require('../models/SanPham');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const  ObjectID = require('mongodb').ObjectId;
class MeController {
    // [GET] /me/stored/taikhoans
    storedTaikhoans(req, res, next) {
        Promise.all([TaiKhoan.find({}), TaiKhoan.countDocumentsDeleted()])
            .then(([taikhoans, deletedCount]) =>
                res.render('me/stored-taikhoans', {
                    deletedCount,
                    taikhoans: mutipleMongooseToObject(taikhoans),
                }),
            )
            .catch(next);
    }

    // storedVaiTros(req, res, next) {
    //     Promise.all([VaiTro.find({}), VaiTro.countDocumentsDeleted()])
    //         .then(([vaitros, deletedCount]) =>
    //             res.render('me/stored-vaitros', {
    //                 deletedCount,
    //                 vaitros: mutipleMongooseToObject(vaitros),
    //             }),
    //         )
    //         .catch(next);
    // }

    storedThuongLais(req, res, next) {
        Promise.all([ThuongLai.find({}), ThuongLai.countDocumentsDeleted()])
            .then(([thuonglais, deletedCount]) =>
                res.render('me/stored-thuonglais', {
                    deletedCount,
                    thuonglais: mutipleMongooseToObject(thuonglais),
                }),
            )
            .catch(next);
    }

    async storedDotNuois(req, res, next) {

        DotNuoi.aggregate([
            {
                $unwind: '$ctcongiong'
            },
            {
                "$lookup": {
                "from": "congiongs",
                "localField": "ctcongiong.congiongId",
                "foreignField": "_id",
                "as": "ctcongiong.congiongs"
                }
            },
            {
                $unwind: '$ctcongiong.congiongs'
            },

            //      Ao Nuoi
            {
                "$lookup": {
                    "from": "aonuois",
                    "localField": "aonuoiId",
                    "foreignField": "_id",
                    "as": "aonuois"
                }
            },
            {   $unwind:"$aonuois" },

            {
                $group: {
                    _id: '$_id',
                    "ctcongiong": { $push: "$ctcongiong" },
                    "aonuois": { $push: "$aonuois" },
                }
            },
            {
                $lookup: {
                    from: 'dotnuois',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'dotnuoiDetails'
                }
            },
            {
                $unwind: {
                    path: '$dotnuoiDetails'
                }
            },
            

            {
                $addFields: {
                    'dotnuoiDetails.ctcongiong': '$ctcongiong',
                    'dotnuoiDetails.aonuois': '$aonuois',
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$dotnuoiDetails'
                }
            },
            
            
          ],

        function(err, data) {
            if (err) throw err;
            console.log(data);
            res.render('me/stored-dotnuois', {
                // deletedCount,
                dotnuois: (data),
            })         
        })


   };

    // async storedDotNuois(req, res, next) {
    //     let dotnuois, congiongs, getcongiong, ctcongiongs;
    //     let promise = [];
    //     Promise.all([
    //         dotnuois = await DotNuoi.find({}), 

    //         await AoNuoi.find({_id: dotnuois.aonuoiId}), 
    //         DotNuoi.countDocumentsDeleted()
    //     ])
    //         .then(([dotnuois, aonuois, deletedCount]) => {
    //             getcongiong = dotnuois.map(async (dotnuoi) => {
    //                 ctcongiongs = dotnuoi.ctcongiong.map(async (ctcongiong) => {
    //                     congiongs = await ConGiong.findById({_id: ctcongiong.congiongId})
    //                     console.log(congiongs);
    //                     return congiongs
    //                 })
    //                 return ctcongiongs
    //             });
    //             res.render('me/stored-dotnuois', {
    //                     deletedCount,
    //                     dotnuois: mutipleMongooseToObject(dotnuois),
    //                     aonuois: mutipleMongooseToObject(aonuois),
    //                 // congiongs: mutipleMongooseToObject(congiongs),
    //             })                
    //         })
    //         .catch(next);
    // }

    storedAoNuois(req, res, next) {
        Promise.all([AoNuoi.find({}), AoNuoi.countDocumentsDeleted()])
            .then(([aonuois, deletedCount]) =>
                res.render('me/stored-aonuois', {
                    deletedCount,
                    aonuois: mutipleMongooseToObject(aonuois),
                }),
            )
            .catch(next);
    }

    storedCoSoNuoiTrongs(req, res, next) {
        Promise.all([CoSoNuoiTrong.find({}), CoSoNuoiTrong.countDocumentsDeleted()])
            .then(([cosonuoitrongs, deletedCount]) =>
                res.render('me/stored-cosonuoitrongs', {
                    deletedCount,
                    cosonuoitrongs: mutipleMongooseToObject(cosonuoitrongs),
                }),
            )
            .catch(next);
    }

    storedConGiongs(req, res, next) {
        Promise.all([ConGiong.find({}), ConGiong.countDocumentsDeleted()])
            .then(([congiongs, deletedCount]) =>
                res.render('me/stored-congiongs', {
                    deletedCount,
                    congiongs: mutipleMongooseToObject(congiongs),
                }),
            )
            .catch(next);
    }

    storedLoaiConGiongs(req, res, next) {
        Promise.all([LoaiConGiong.find({}), LoaiConGiong.countDocumentsDeleted()])
            .then(([loaicongiongs, deletedCount]) =>
                res.render('me/stored-loaicongiongs', {
                    deletedCount,
                    loaicongiongs: mutipleMongooseToObject(loaicongiongs),
                }),
            )
            .catch(next);
    }

    storedNCCConGiongs(req, res, next) {
        Promise.all([NCCConGiong.find({}), NCCConGiong.countDocumentsDeleted()])
            .then(([ncccongiongs, deletedCount]) =>
                res.render('me/stored-ncccongiongs', {
                    deletedCount,
                    ncccongiongs: mutipleMongooseToObject(ncccongiongs),
                }),
            )
            .catch(next);
    }

    storedCDCBs(req, res, next) {
        Promise.all([CongDoanCheBien.find({}), CongDoanCheBien.countDocumentsDeleted()])
            .then(([congdoanchebiens, deletedCount]) =>
                res.render('me/stored-congdoanchebiens', {
                    deletedCount,
                    congdoanchebiens: mutipleMongooseToObject(congdoanchebiens),
                }),
            )
            .catch(next);
    }
   
    storedSanPhams(req, res, next) {
        Promise.all([SanPham.find({}), CongDoanCheBien.find({}), SanPham.countDocumentsDeleted()])
            .then(([sanphams, congdoanchebiens, deletedCount]) =>
                res.render('me/stored-sanphams', {
                    deletedCount,
                    sanphams: mutipleMongooseToObject(sanphams),
                    congdoanchebiens: mutipleMongooseToObject(congdoanchebiens),
                }),
            )
            .catch(next);
    }


    // [GET] /me/trash/taikhoans
    trashTaikhoans(req, res, next) {
        TaiKhoan.findDeleted({})
            .then((taikhoans) =>
                res.render('me/trash-taikhoans', {
                    taikhoans: mutipleMongooseToObject(taikhoans),
                }),
            )
            .catch(next);
    }

    trashDotNuois(req, res, next) {
        DotNuoi.findDeleted({})
            .then((dotnuois) =>
                res.render('me/trash-dotnuois', {
                    dotnuois: mutipleMongooseToObject(dotnuois),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();



        // 10 nguoi
