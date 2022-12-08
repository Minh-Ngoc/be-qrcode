const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TaiKhoan = require('../models/TaiKhoan');
const CoSoNuoiTrong = require('../models/CoSoNuoiTrong');
const AoNuoi = require('../models/AoNuoi');
const DotNuoi = require('../models/DotNuoi');
const LoaiConGiong = require('../models/LoaiConGiong');
const NCCConGiong = require('../models/NCCConGiong');
const ConGiong = require('../models/ConGiong');
const GiaiDoan = require('../models/GiaiDoan');
const ThucAn = require('../models/ThucAn');
const ChiSoMoiTruong = require('../models/ChiSoMoiTruong');
const ThuocThuySan = require('../models/ThuocThuySan');
const ThuongLai = require('../models/ThuongLai');
const  ObjectID = require('mongodb').ObjectId;

class ApiController {
    index (req, res, next) {
        res.json({ message: "Hey! This is your server response!" });
        next();
    }

    async register (req, res, next) {
        Promise.all([TaiKhoan.findOne({ username: req.body.username }), bcrypt.hash(req.body.password, 10)])
            .then(([users, hashedPassword]) => {
                if(users) {
                    return res.status(505).send()
                } else {
                    // create a new user instance and collect the data
                    const user = new TaiKhoan({
                        username: req.body.username,
                        password: hashedPassword,
                        ten: req.body.ten,
                        sdt: req.body.sdt,
                        diachi: req.body.diachi,
                    });
    
                    // save the new user
                    user
                        .save()
                        // return success if the new user is added to the database successfully
                        .then((result) => {
                            res.status(201).send({
                                message: "User Created Successfully",
                                result,
                            });
                        })
                        // catch error if the new user wasn't added successfully to the database
                        .catch((error) => {
                            res.status(500).send({
                                message: "Error creating user",
                                error,
                            });
                        });
                }       
            })
            
        
    }

    async login (req, res, next) { 
        // check if username exists
        TaiKhoan.findOne({ username: req.body.username })

        // if username exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(req.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {

                    // check if password matches
    
                    if(!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            username: user.username,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );

                    //   return success res
                    res.status(200).send({
                        message: "Login Successful",
                        userId: user._id,
                        user: user,
                        token,
                    });
                })  
                // catch error if password do not match
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if username does not exist
        .catch((e) => {
            res.status(404).send({
                message: "username not found",
                e,
            });
        });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Scan QR code ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async scanQRCode (req, res, next) {
        // console.log(req.params.id)
            Promise.all([
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
                    
                    //      Giai Doan
                    {
                        "$lookup": {
                            "from": "giaidoans",
                            "localField": "aonuois._id",
                            "foreignField": "aonuoiId",
                            "as": "giaidoans"
                        }
                    },
                    {   $unwind:"$giaidoans" },
        
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
                            "giaidoans": { $push: "$giaidoans" },
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
                            'dotnuoiDetails.giaidoans': '$giaidoans',
                            'dotnuoiDetails.cosonuoitrongs': '$cosonuoitrongs',
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: '$dotnuoiDetails'
                        }
                    },
                ]),
                ThucAn.find({})
            ])
            .then(([dotnuoiDetail, thucans]) => {
                console.log(thucans)
                res.status(200).send({
                    dotnuoi: dotnuoiDetail,
                    thucan: thucans,
                })  
            })
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không thể scan mã QR",
                    error,
                });
            });
    }


    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Co so nuoi trong ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    async CSNTCreate (req, res, next) {
        // console.log(req.body);
        CoSoNuoiTrong.find({ tkId: req.body.tkId })
            .then(csnts => {
                if(csnts.length === 0){
                    const cosonuoitrong = new CoSoNuoiTrong({
                        ten: req.body.ten,
                        chusohuu: req.body.chusohuu,
                        diachi: req.body.diachi,
                        sdt: req.body.sdt,
                        dientich: req.body.dientich,
                        dtmatnuoc: req.body.dtmatnuoc,
                        namdangky: req.body.namdangky,
                        tkId: req.body.tkId,
                    });
            
                    // save the new user
                    cosonuoitrong
                        .save()
                        // return success if the new user is added to the database successfully
                        .then((result) => {
                            res.status(201).send({
                                errCode: 201,
                                message: "Thêm cơ sở nuôi trồng thành công",
                                csnt: csnts,
                            });
                        })
                        // catch error if the new user wasn't added successfully to the database
                        .catch((error) => {
                            res.status(500).send({
                                errCode: 500,
                                message: "Thêm cơ sở nuôi trồng không thành công",
                                error,
                            });
                        });
                } else {
                    csnts.map(csnt => {
                        let checkName;
                        if(csnt.ten === req.body.ten){
                            return res.status(505).send()
                        } else {
                            // create a new user instance and collect the data
                            const cosonuoitrong = new CoSoNuoiTrong({
                                ten: req.body.ten,
                                chusohuu: req.body.chusohuu,
                                diachi: req.body.diachi,
                                sdt: req.body.sdt,
                                dientich: req.body.dientich,
                                dtmatnuoc: req.body.dtmatnuoc,
                                namdangky: req.body.namdangky,
                                tkId: req.body.tkId,
                            });
                    
                            // save the new user
                            cosonuoitrong
                                .save()
                                // return success if the new user is added to the database successfully
                                .then((result) => {
                                    res.status(201).send({
                                        errCode: 201,
                                        message: "Thêm cơ sở nuôi trồng thành công",
                                        result,
                                    });
                                })
                                // catch error if the new user wasn't added successfully to the database
                                .catch((error) => {
                                    res.status(501).send({
                                        errCode: 501,
                                        message: "Thêm cơ sở nuôi trồng không thành công",
                                        error,
                                    });
                                });
                        }
                    })
                }
            })
        
    }

    async CSNTList (req, res, next) {
        CoSoNuoiTrong.find({tkId: req.params.id})
            .then(csnts => res.status(200).send({
                csnt: csnts
            }))
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có cơ sở nuôi trồng nào được tạo!",
                    error,
                });
            });
        
    }

    async CSNTEdit (req, res, next) {
        const idCSNT = req.params.id;
        // const idUser = req.query.tkId;
        // console.log(idCSNT)
        CoSoNuoiTrong.findById(idCSNT)
            .then(csnt => {
                res.status(200).send({
                    csnt: csnt,
                    })
                }
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Cập nhật không thành công!",
                    error,
                });
            });
    }

    async CSNTUpdate(req, res, next) {
        // console.log(await CoSoNuoiTrong.find({tkId: req.body.tkId}))
        await CoSoNuoiTrong.find({tkId: req.body.tkId})
            .then(csnts => {
                csnts.map(csnt => {
                    if(csnt.ten === req.body.ten){
                        return res.status(505).send({
                            errCode: 505,
                        });
                    } 

                    CoSoNuoiTrong.updateOne({ _id: req.params.id }, req.body)
                        .then(() => 
                            res.status(201).send({
                            errCode: 201,
                            csnt: csnts
                        }))
                        .catch(next);
                    
                })
            })
            .catch(next => {
                res.status(500).send({
                    errCode: 500,
                    message: "Cập nhật không thành công!",
                });
            })
            
    }

    async CSNTDelete (req, res, next) {
        Promise.all([CoSoNuoiTrong.deleteOne({ _id: req.params.id }), CoSoNuoiTrong.find({tkId: req.query.tkId})])
            .then(([csntDelete, csnts]) => {
                // console.log(csnts)
                    res.status(201).send({
                        errCode: 201,
                        csnt: csnts
                    })
                }
            )
            .catch(next => {
                res.status(500).send({
                    errCode: 500,
                    message: "Xóa không thành công!",
                });
            });
    }


    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Ao Nuoi ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    async AoNuoiCreate (req, res, next) {
        // console.log(req.body);
        CoSoNuoiTrong.find({ tkId: req.body.tkId })
            .then(csnts => {
                if(csnts.length === 0){
                    return res.status(504).send({
                        errCode: 504,
                        message: 'Bạn chưa có co sở nuôi trồng nào! Vui lòng thêm ao nuôi để tạo ao nuôi!',
                    })
                } else if (csnts !== 0) {
                    AoNuoi.find({csntId: req.body.csntId})
                        .then(aonuois => {
                            if(aonuois.length === 0) {
                                const aonuoi = new AoNuoi({
                                    ten: req.body.ten,
                                    dientich: req.body.dientich,
                                    csntId: req.body.csntId,
                                });
                        
                                // save the new user
                                aonuoi
                                    .save()
                                    // return success if the new user is added to the database successfully
                                    .then((result) => {
                                        res.status(201).send({
                                            errCode: 201,
                                            message: "Thêm ao nuôi thành công",
                                            aonuoi: aonuois,
                                        });
                                    })
                                    // catch error if the new user wasn't added successfully to the database
                                    .catch((error) => {
                                        res.status(500).send({
                                            errCode: 500,
                                            message: "Thêm ao nuôi không thành công",
                                            error,
                                        });
                                    });
                            } else {
                                aonuois.map(aonuoi => {
                                    if(aonuoi.ten === req.body.ten){
                                        return res.status(505).send()
                                    } else {
                                        // create a new user instance and collect the data
                                        const aonuoi = new AoNuoi({
                                            ten: req.body.ten,
                                            dientich: req.body.dientich,
                                            csntId: req.body.csntId,
                                        });
                                
                                        // save the new user
                                        aonuoi
                                            .save()
                                            // return success if the new user is added to the database successfully
                                            .then((result) => {
                                                res.status(201).send({
                                                    errCode: 201,
                                                    message: "Thêm ao nuôi thành công",
                                                });
                                            })
                                            // catch error if the new user wasn't added successfully to the database
                                            .catch((error) => {
                                                res.status(500).send({
                                                    errCode: 500,
                                                    message: "Thêm ao nuôi không thành công",
                                                    error,
                                                });
                                            });
                                    }
                                })
                            }
                        })
                } 
                
            })
        
    }

    async AoNuoiList (req, res, next) {        
        // console.log(req.params.id);
        Promise.all([
            CoSoNuoiTrong.aggregate([
                {
                    $match: {
                        tkId: new ObjectID(req.params.id)
                    }
                },
                {
                    "$lookup": {
                    "from": "cosonuoitrongs",
                    "localField": "_id",
                    "foreignField": "_id",
                    "as": "cosonuoitrongs"
                    }
                },
                {
                    $unwind: '$cosonuoitrongs'
                },
    
                {
                    "$lookup": {
                    "from": "aonuois",
                    "localField": "_id",
                    "foreignField": "csntId",
                    "as": "aonuois"
                    }
                },
                {
                    $unwind: '$aonuois'
                },
    
                {
                    $group: {
                        _id: '$_id',
                        "cosonuoitrongs": { $push: "$cosonuoitrongs" },
                        "aonuois": { $push: "$aonuois" },
                    }
                },
                {
                    $lookup: {
                        from: 'cosonuoitrongs',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'cosonuoitrongDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$cosonuoitrongDetails'
                    }
                },
                
    
                {
                    $addFields: {
                        'cosonuoitrongDetails.aonuois': '$aonuois',
                        'cosonuoitrongDetails.aonuois': '$aonuois',
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: '$cosonuoitrongDetails'
                    }
                },
                
            ]),
            ChiSoMoiTruong.find({}),
            ThuocThuySan.find({})
        ])
        .then(([datas, csmts, thuocthuysans]) => {
            res.status(200).send({
                errCode: 200,
                dataLists: datas,
                chisomoitruong: csmts,
                thuocthuysan: thuocthuysans,
            }) 
        })
        .catch((error) => {
            res.status(500).send({
                errCode: 500,
                error,
            });
        });
    }

    async AoNuoiEdit (req, res, next) {
        const idAN = req.params.id;
        // const idUser = req.query.tkId;
        // console.log(idAN)
        Promise.all([AoNuoi.findById(idAN), CoSoNuoiTrong.find({tkId: req.query.tkId})])
            .then(([aonuoi, csnts]) => {
                // console.log(csnts)
                res.status(200).send({
                    aonuoi: aonuoi,
                    csnt: csnts,
                    })
                }
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Cập nhật không thành công!",
                    error,
                });
            });
    }

    async AoNuoiUpdate(req, res, next) {
        // console.log(req.params.id)
        AoNuoi.updateOne({ _id: req.params.id }, req.body)
            .then(() => 
                res.status(201).send({
                errCode: 201,
            }))
            .catch(next => {
                res.status(500).send({
                    errCode: 500,
                    message: "Cập nhật không thành công!",
                });
            }) 
    }

    async AoNuoiDelete (req, res, next) {
        AoNuoi.deleteOne({ _id: req.params.id })
            .then(() => {
                    res.status(201).send({
                        errCode: 201,
                    })
                }
            )
            .catch(next => {
                res.status(500).send({
                    errCode: 500,
                    message: "Xóa không thành công!",
                });
            });
    }

    async addCSMTDetail (req, res, next) {
        console.log(req.params.id);
        await AoNuoi.updateOne(
            {_id : req.params.id}, 
            { $push: {
                "chisomoitruong": {
                    thoidiem: req.body.thoidiem,
                    chiso: req.body.chiso,
                    ghichu: req.body.ghichu,
                    csmtId: req.body.csmtId,
            }
          }
        })
        .then(() => res.status(200).send({
            errCode: 200,
        }))
        .catch(err => res.status(500).send({
            errCode: 500,
            err,
        }));
    }

    async addThuocThuySanSD (req, res, next) {
        console.log(req.body);
        await AoNuoi.updateOne(
            {_id : req.params.id}, 
            { $push: {
                "thuocthuysan": {
                    lieuluong: req.body.lieuluong,
                    thoidiem: req.body.thoidiem,
                    thuocthuysanId: req.body.thuocthuysanId,
            }
          }
        })
        .then(() => res.status(200).send({
            errCode: 200,
        }))
        .catch(err => res.status(500).send({
            errCode: 500,
            err,
        }));
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Dot Nuoi ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    async DotNuoiCreate (req, res, next) {
        console.log(req.body)
        Promise.all([CoSoNuoiTrong.find({ tkId: req.body.tkId }), ConGiong.find({})])
            .then(([csnts, congiongs]) => {
                if(csnts.length === 0){
                    return res.status(504).send({
                        errCode: 504,
                        message: 'Bạn chưa có cơ sở nuôi trồng nào! Vui lòng thêm cơ sở nuôi trồng để tạo đợt nuôi!',
                    })
                } else if (csnts.length !== 0) {
                    const dotnuoi = new DotNuoi({
                        ten: req.body.ten,
                        namnuoi:  req.body.namnuoi,
                        thoidiem: req.body.thoidiem,
                        trangthai: req.body.trangthai,
                        tinhtrang: req.body.tinhtrang,
                        aonuoiId: req.body.aonuoiId,
                        ctcongiong: {
                            soluong:  req.body.soluong,
                            ngaytuoi:  req.body.ngaytuoi,
                            chatluong:  req.body.chatluong,
                            congiongId: req.body.congiongId,
                        }
                    });
            
                    // save the new user
                    dotnuoi
                        .save()
                        // return success if the new user is added to the database successfully
                        .then((result) => {
                            res.status(201).send({
                                errCode: 201,
                                message: "Thêm đợt nuôi thành công!",
                                // aonuoi: aonuois,
                            });
                        })
                        // catch error if the new user wasn't added successfully to the database
                        .catch((error) => {
                            res.status(500).send({
                                errCode: 500,
                                message: "Thêm đợt nuôi không thành công",
                                error,
                            });
                        });
                }
            })
                
    }
    
    async DotNuoiList (req, res, next) {
        // console.log(req.params.tkId)
        await CoSoNuoiTrong.find({tkId: req.params.id})
            .then(csnts => 
                AoNuoi.find({csntId: csnts})
                    .then(aonuois => 
                        Promise.all([DotNuoi.find({aonuoiId: aonuois}), ConGiong.find({})])
                            .then(([dotnuois, congiongs]) => {
                                console.log(aonuois);
                                res.status(200).send({
                                    dotnuoi: dotnuois,
                                    aonuoi: aonuois,
                                    congiong: congiongs, 
                                })
                                    
                                
                            })    
                    )
            )
    }

    async DotNuoiEdit (req, res, next) {
        DotNuoi.findById(req.params.id)
            .then(dotnuoi => {
                // console.log(csnts)
                res.status(200).send({
                    dotnuoi: dotnuoi,
                    })
                }
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Cập nhật không thành công!",
                    error,
                });
            });
    }
    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Loai Con Giong ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async LoaiConGiongList (req, res, next) {
        // console.log(req.params)
        await LoaiConGiong.find({})
            .then(loaicongiongs => res.status(200).send({
                    errCode: 200,
                    loaicongiong: loaicongiongs,
                })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có loại con giống nào!",
                    error,
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  NCC Con Giong ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    async NCCConGiongCreate (req, res, next) {
        // console.log(req.body);
        const ncccongiong = new NCCConGiong({
                ten: req.body.ten,
                hinhanh: req.body.hinhanh,
                mota: req.body.mota,
                lcgId: req.body.lcgId,
                ncccgId: req.body.ncccgId,
            }
        );
            ncccongiong
                .save()
                .then(() => res.status(201).send({
                                errCode: 201,
                                message: 'Thêm nhà cung cấp con giống thành công!',
                            }))
                .catch((error) => {
                    res.status(500).send({
                        errCode: 500,
                        message: "Thêm nhà cung cấp con giống không thành công",
                        error,
                    });
                });
    }

    async NCCConGiongList (req, res, next) {
        await NCCConGiong.find({})
            .then(ncccongiongs => res.status(200).send({
                    errCode: 200,
                    ncccongiong: ncccongiongs,
                })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có nhà cung cấp con giống nào được tạo!",
                    error,
                });
            });
    }

    async NCCConGiongEdit (req, res, next) {
        // console.log(req.params.id)
        await NCCConGiong.findById(req.params.id)
            .then((ncccongiong) =>
                res.status(201).send({
                    errCode: 201,
                    ncccongiong: ncccongiong,
                })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không thể cập nhật nhà cung cấp con giống",
                    error,
                });
            });
    }

    async NCCConGiongUpdate (req, res, next) {
        await NCCConGiong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(201).send({
                    errCode: 201,
                })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không thể cập nhật nhà cung cấp con giống",
                    error,
                });
            });
    }

    async NCCConGiongDelete (req, res, next) {
        // console.log(req.params.id)
        Promise.all([NCCConGiong.deleteOne({ _id: req.params.id }), NCCConGiong.find({})])
            .then(([ncccongiongDelete, ncccongiongs]) => {
                // console.log(csnts)
                    res.status(201).send({
                        errCode: 201,
                        ncccongiong: ncccongiongs
                    })
                }
            )
            .catch(next => {
                res.status(500).send({
                    errCode: 500,
                    message: "Xóa không thành công!",
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Con Giong ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async ConGiongCreate (req, res, next) {
        // console.log(req.body);
        const congiong = new ConGiong(req.body);
            congiong
                .save()
                .then(() => res.status(201).send({
                                errCode: 201,
                                message: 'Thêm con giống thành công!',
                            }))
                .catch((error) => {
                    res.status(500).send({
                        errCode: 500,
                        message: "Thêm con giống không thành công",
                        error,
                    });
                });
    }

    async ConGiongList (req, res, next) {
        ConGiong.aggregate([
            {
                $unwind: '$ncccgId'
            },
            {
                "$lookup": {
                "from": "ncccongiongs",
                "localField": "ncccgId",
                "foreignField": "_id",
                "as": "ncccongiongs"
                }
            },
            {
                $unwind: '$ncccongiongs'
            },

            //      Ao Nuoi
            {
                "$lookup": {
                    "from": "loaicongiongs",
                    "localField": "lcgId",
                    "foreignField": "_id",
                    "as": "loaicongiongs"
                }
            },
            {   $unwind:"$loaicongiongs" },

            {
                $group: {
                    _id: '$_id',
                    "ncccongiongs": { $push: "$ncccongiongs" },
                    "loaicongiongs": { $push: "$loaicongiongs" },
                }
            },
            {
                $lookup: {
                    from: 'congiongs',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'congiongDetails'
                }
            },
            {
                $unwind: {
                    path: '$congiongDetails'
                }
            },
            

            {
                $addFields: {
                    'congiongDetails.ncccongiongs': '$ncccongiongs',
                    'congiongDetails.loaicongiongs': '$loaicongiongs',
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$congiongDetails'
                }
            },
        ])
        .then(congiongs => res.status(200).send({
                errCode: 201,
                congiong: congiongs,
            })
        )
        .catch((error) => {
            res.status(500).send({
                errCode: 500,
                message: "Không có con giống nào được tạo!",
                error,
            });
        });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Giai Doan ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async GiaiDoanCreate (req, res, next) {
        const giaidoan = new GiaiDoan(req.body);
            giaidoan
                .save()
                .then(() => res.status(201).send({
                                errCode: 201,
                                message: 'Thêm giai đoạn nuôi thành công!',
                            }))
                .catch((error) => {
                    res.status(500).send({
                        errCode: 500,
                        message: "Thêm giai đoạn nuôi không thành công",
                        error,
                    });
                });
    }

    async GiaiDoanList (req, res, next) {
        Promise.all([
            GiaiDoan.aggregate([

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
            {
                "$match": {
                    "$and": [
                        {
                          "cosonuoitrongs.tkId": {
                            "$eq": ObjectID(`${req.params.id}`)
                          }
                        },
                  ]
                }
            },
            
            // Group ve model dotnuois
            {
                $group: {
                    _id: '$_id',
                    "aonuois": { $push: "$aonuois" },
                }
            },
            {
                $lookup: {
                    from: 'giaidoans',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'giaidoanDetails'
                }
            },
            {
                $unwind: {
                    path: '$giaidoanDetails'
                }
            },
            

            {
                $addFields: {
                    'giaidoanDetails.aonuois': '$aonuois',
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$giaidoanDetails'
                }
            },
        ]),
        ThucAn.find({})
    ])
    
        .then(([giaidoanDetail, thucans]) => {
            // console.log(giaidoanDetail)
            res.status(200).send({
                giaidoan: giaidoanDetail,
                thucan: thucans,
            })  
        })
        .catch((error) => {
            res.status(500).send({
                errCode: 500,
                error,
            });
        });
    }

    async AddThucAnSD (req, res, next) {
        console.log(req.params.id);
        await GiaiDoan.updateOne(
            {_id : req.params.id}, 
            { $push: {
                "thucan": {
                    luongthucan: req.body.luongthucan,
                    thoidiem: req.body.thoidiem,
                    thucanId: req.body.thucanId,
            }
          }
        })
        .then(() => res.status(200).send({
            errCode: 200,
        }))
        .catch(err => res.status(500).send({
            errCode: 500,
            err,
        }));
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Thuc An ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async ThucAnCreate (req, res, next) {
        // console.log(req.body);
        const thucan = new ThucAn(req.body);
        thucan
            .save()
            .then(() => res.status(201).send({
                            errCode: 201,
                            message: 'Thêm thức ăn thành công!',
                        }))
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Thêm thức ăn không thành công",
                    error,
                });
            });
    }

    async ThucAnList (req, res, next) {
        ThucAn.find({})
            .then(thucans => res.status(200).send({
                errCode: 200,
                thucan: thucans,
            })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có thức ăn nào được tạo!",
                    error,
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Chi So Moi Truong ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async CSMTCreate (req, res, next) {
        const chisomoitruong = new ChiSoMoiTruong(req.body);
        chisomoitruong
            .save()
            .then(() => res.status(201).send({
                            errCode: 201,
                            message: 'Thêm chỉ số môi trường thành công!',
                        }))
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Thêm chỉ số môi trường không thành công",
                    error,
                });
            });
    }

    async CSMTList (req, res, next) {
        ChiSoMoiTruong.find({})
            .then(chisomoitruongs => res.status(200).send({
                errCode: 200,
                chisomoitruong: chisomoitruongs,
            })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có chỉ số môi trường nào được tạo!",
                    error,
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Thuoc Thuy San ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async ThuocThuySanCreate (req, res, next) {
        console.log(req.body);
        const thuocthuysan = new ThuocThuySan(req.body);
        thuocthuysan
            .save()
            .then(() => res.status(201).send({
                            errCode: 201,
                            message: 'Thêm thuốc thủy sản thành công!',
                        }))
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Thêm thuốc thủy sản không thành công",
                    error,
                });
            });
    }

    async ThuocThuySanList (req, res, next) {
        ThuocThuySan.find({})
            .then(thuocthuysans => res.status(200).send({
                errCode: 200,
                thuocthuysan: thuocthuysans,
            })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có thuốc thủy sản nào được tạo!",
                    error,
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Thuong Lai ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async ThuongLaiCreate (req, res, next) {
        console.log(req.body);
        const thuonglai = new ThuongLai(req.body);
        thuonglai
            .save()
            .then(() => res.status(201).send({
                            errCode: 201,
                            message: 'Thêm thương lái thành công!',
                        }))
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Thêm thương lái không thành công",
                    error,
                });
            });
    }

    async ThuongLaiList (req, res, next) {
        ThuongLai.find({})
            .then(thuonglais => res.status(200).send({
                errCode: 200,
                thuonglai: thuonglais,
            })
            )
            .catch((error) => {
                res.status(500).send({
                    errCode: 500,
                    message: "Không có thương lái nào được tạo!",
                    error,
                });
            });
    }

    // ------------------------------------------------------------------------------------------------
    //   ---------------------------------------  Auth ------------------------------------------
    // ------------------------------------------------------------------------------------------------

    async freeEndPoint (req, res, next) { 
        res.json({ message: "You are free to access me anytime" });
    }

    async authEndPoint (req, res, next) { 
        res.send({ message: "You are authorized to access me" });
    }

    
}

module.exports = new ApiController();
