const ChiSoMoiTruong = require('../models/ChiSoMoiTruong');
const { mongooseToObject } = require('../../util/mongoose');

class ChiSoMoiTruongController {
    // [GET] /courses/:slug

    // [GET] /courses/create
    create(req, res, next) {
        res.render('chisomoitruong/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const chisomoitruong = new ChiSoMoiTruong(req.body);
        chisomoitruong
            .save()
            .then(() => res.redirect('/me/stored/chisomoitruong'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        ChiSoMoiTruong.findById(req.params.id)
            .then((chisomoitruong) =>
                res.render('chisomoitruong/edit', {
                    chisomoitruong: mongooseToObject(chisomoitruong),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        ChiSoMoiTruong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/chisomoitruong'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        ChiSoMoiTruong.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        ChiSoMoiTruong.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        ChiSoMoiTruong.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ChiSoMoiTruongController();
