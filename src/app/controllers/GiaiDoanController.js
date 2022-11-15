const GiaiDoan = require('../models/GiaiDoan');
const AoNuoi = require('../models/AoNuoi');
const ThucAn = require('../models/ThucAn');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class GiaiDoanController {

    // [GET] /courses/create
    create(req, res, next) {
        // CoSoNuoiTrong.find({})
        // .then(cosonuoitrongs =>
            res.render('giaidoan/create')
            // , {
        //         cosonuoitrongs: mutipleMongooseToObject(cosonuoitrongs),
        //     }),
        // )
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const giaidoan = new GiaiDoan({
            ten: req.body.ten,
            ghichu: req.body.ghichu,
            thoidiem: req.body.thoidiem,
            thucan: {
                luongthucan: req.body.luongthucan,
                thoidiem: req.body.thoidiem,
                thucanId: req.body.thucanId,
            },
        });
        giaidoan
            .save()
            .then(() => res.redirect('/me/stored/giaidoan'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        AoNuoi.findById(req.params.id)
            .then((giaidoan) =>
                res.render('giaidoan/edit', {
                    giaidoan: mongooseToObject(giaidoan),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        AoNuoi.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/giaidoan'))
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

module.exports = new GiaiDoanController();
