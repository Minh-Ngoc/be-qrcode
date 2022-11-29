const CoSoNuoiTrong = require('../models/CoSoNuoiTrong');
const TaiKhoan = require('../models/TaiKhoan');
const { mongooseToObject } = require('../../util/mongoose');

class CoSoNuoiTrongController {
    // [GET] /courses/:slug
    show(req, res, next) {
        CoSoNuoiTrong.findOne({ slug: req.params.slug })
            .then((cosonuoitrong) =>
                res.render('cosonuoitrong/show', {
                    cosonuoitrong: mongooseToObject(cosonuoitrong),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('cosonuoitrong/create');
    }

    // [CoSoNuoiTrong] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const cosonuoitrong = new CoSoNuoiTrong(req.body);
        console.log(cosonuoitrong);
        cosonuoitrong
            .save()
            .then(() => res.redirect('/me/stored/cosonuoitrong'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        CoSoNuoiTrong.findById(req.params.id)
            .then((cosonuoitrong) =>
                res.render('cosonuoitrong/edit', {
                    cosonuoitrong: mongooseToObject(cosonuoitrong),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        CoSoNuoiTrong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/cosonuoitrong'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        CoSoNuoiTrong.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        CoSoNuoiTrong.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        CoSoNuoiTrong.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CoSoNuoiTrongController();
