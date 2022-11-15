const DotNuoi = require('../models/DotNuoi');
const ConGiong = require('../models/ConGiong');
const AoNuoi = require('../models/AoNuoi');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const QRCode = require('qrcode');

class DotNuoiController {
    // [GET] /courses/:slug
    show(req, res, next) {
        DotNuoi.findOne({ slug: req.params.slug })
            .then((dotnuoi) =>
                res.render('dotnuoi/show', {
                    dotnuoi: mongooseToObject(dotnuoi),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        Promise.all([ConGiong.find({}), AoNuoi.find({})])
        .then(([congiongs, aonuois]) =>
            res.render('dotnuoi/create', {
                congiongs: mutipleMongooseToObject(congiongs),
                aonuois: mutipleMongooseToObject(aonuois),
            }),
        )
    }

    // [POST] /courses/store
    async store (req, res, next) {
        const dotnuoi = new DotNuoi({
            aonuoiId: req.body.aonuoiId,
            ten: req.body.ten,
            namnuoi:  req.body.namnuoi,
            thoidiem: req.body.thoidiem,
            trangthai: req.body.trangthai,
            tinhtrang: req.body.tinhtrang,
            ctcongiong: {
                soluong:  req.body.soluong,
                ngaytuoi:  req.body.ngaytuoi,
                chatluong:  req.body.chatluong,
                congiongId: req.body.congiongId,
            }
        });
        dotnuoi
            .save()
            .then(() => res.redirect('/me/stored/dotnuoi'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        DotNuoi.findById(req.params.id)
            .then((dotnuoi) =>
                res.render('dotnuoi/edit', {
                    dotnuoi: mongooseToObject(dotnuoi),
                }),
            )
            .catch(next);
    }

    async qrcode(req, res, next) {
        let data;
        let qr;
        let updateData;
        // const url = 'https://be-qrcode.herokuapp.com';
        const url = 'http://localhost:3000';

        Promise.all([
            data = await DotNuoi.findById({_id: req.params.id}),
            console.log(data.id),
            
            qr = await QRCode.toDataURL(url + `/testqr/` + data.id + `/qrcode`),

            updateData = await DotNuoi.updateOne({_id: data.id}, {qrImage: qr}),
            console.log(data.qrImage)
        ])

            .then(() => res.redirect('back'))
            .catch(next);
    }

    addDetail(req, res, next) {
        DotNuoi.findById(req.params.id)
            .then((dotnuoi) =>
                res.render('dotnuoi/add-detail', {
                    dotnuoi: mongooseToObject(dotnuoi),
                }),
            )
            .catch(next);
    }

    updateDetail(req, res, next) {
        DotNuoi.findOneAndUpdate({ _id: req.params.id }, {"$set": {
            ctcongiong: {
                soluong:  req.body.soluong,
                ngaytuoi:  req.body.ngaytuoi,
                chatluong:  req.body.chatluong
            }
        }})
            .then(() => res.redirect('/me/stored/dotnuoi'))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        DotNuoi.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/dotnuoi'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        DotNuoi.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        DotNuoi.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        DotNuoi.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new DotNuoiController();
