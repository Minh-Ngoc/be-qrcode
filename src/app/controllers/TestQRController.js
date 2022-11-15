const DotNuoi = require('../models/DotNuoi');

const  ObjectID = require('mongodb').ObjectId;

class TestQRController {
    async index(req, res, next) {        
        DotNuoi.aggregate([
            { 
                $match: {"_id": ObjectID(`${req.params.id}`) 
                }
            },
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

            //      Loai con giong
            {
                "$lookup": {
                    "from": "loaicongiongs",
                    "localField": "ctcongiong.congiongs.lcgId",
                    "foreignField": "_id",
                    "as": "loaicongiongs"
                }
            },
            {   $unwind:"$loaicongiongs" },

            //      Nha cung cap con giong
            {
                "$lookup": {
                    "from": "ncccongiongs",
                    "localField": "ctcongiong.congiongs.ncccgId",
                    "foreignField": "_id",
                    "as": "ncccongiongs"
                }
            },
            {   $unwind:"$ncccongiongs" },

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

            //      Co so nuoi trong
            {
                "$lookup": {
                    "from": "cosonuoitrongs",
                    "localField": "aonuois.csntId",
                    "foreignField": "_id",
                    "as": "cosonuoitrongs"
                }
            },
            {   $unwind:"$cosonuoitrongs" },
            
            // Group ve model dotnuois
            {
                $group: {
                    _id: '$_id',
                    "ctcongiong": { $push: "$ctcongiong" },
                    "loaicongiongs": { $push: "$loaicongiongs" },
                    "ncccongiongs": { $push: "$ncccongiongs" },
                    "aonuois": { $push: "$aonuois" },
                    "cosonuoitrongs": { $push: "$cosonuoitrongs" },
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
                    'dotnuoiDetails.loaicongiongs': '$loaicongiongs',
                    'dotnuoiDetails.ncccongiongs': '$ncccongiongs',
                    'dotnuoiDetails.aonuois': '$aonuois',
                    'dotnuoiDetails.cosonuoitrongs': '$cosonuoitrongs',
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
            res.render('testqr', {
                dotnuois: (data),
                layout: false,
            });       
        })
    }
    
}

module.exports = new TestQRController();
