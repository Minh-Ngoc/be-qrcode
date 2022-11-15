const AoNuoi = require('../models/AoNuoi');
const CoSoNuoiTrong = require('../models/CoSoNuoiTrong');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class AoNuoiController {

    // [GET] /courses/create
    create(req, res, next) {
        CoSoNuoiTrong.find({})
        .then(cosonuoitrongs =>
            res.render('aonuoi/create', {
                cosonuoitrongs: mutipleMongooseToObject(cosonuoitrongs),
            }),
        )
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const aonuoi = new AoNuoi({
            ten: req.body.ten,
            dientich: req.body.dientich,
            csntId: req.body.csntId,
            chisomoitruong: {
                thoidiem: req.body.thoidiem,
                chiso: req.body.chiso,
                ghichu: req.body.ghichu,
                csmtId: req.body.csmtId,
            },
            nhatkyxuatao: {
                thoidiem: req.body.thoidiem,
                khoiluong: req.body.khoiluong,
                ppthuhoach: req.body.ppthuhoach,
                thuonglaiId: req.body.thuonglaiId,
            },
            thuocthuysan: {
                lieuluong: req.body.lieuluong,
                thoidiem: req.body.thoidiem,
                thuocthuysanId: req.body.thuocthuysan,
            },
        });
        aonuoi
            .save()
            .then(() => res.redirect('/me/stored/aonuoi'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        AoNuoi.findById(req.params.id)
            .then((aonuoi) =>
                res.render('aonuoi/edit', {
                    aonuoi: mongooseToObject(aonuoi),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        AoNuoi.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/aonuoi'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        AoNuoi.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        AoNuoi.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        AoNuoi.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AoNuoiController();
