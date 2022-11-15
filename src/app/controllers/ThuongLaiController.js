const ThuongLai = require('../models/ThuongLai');
const { mongooseToObject } = require('../../util/mongoose');

class ThuongLaiController {
    // [GET] /courses/:slug
    show(req, res, next) {
        ThuongLai.findOne({ slug: req.params.slug })
            .then((thuonglai) =>
                res.render('thuonglai/show', {
                    thuonglai: mongooseToObject(thuonglai),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('thuonglai/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const thuonglai = new ThuongLai(req.body);
        thuonglai
            .save()
            .then(() => res.redirect('/me/stored/thuonglai'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        ThuongLai.findById(req.params.id)
            .then((thuonglai) =>
                res.render('thuonglai/edit', {
                    thuonglai: mongooseToObject(thuonglai),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        ThuongLai.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/thuonglai'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        ThuongLai.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        ThuongLai.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        ThuongLai.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ThuongLaiController();
