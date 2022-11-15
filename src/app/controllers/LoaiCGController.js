const LoaiConGiong = require('../models/LoaiConGiong');
const { mongooseToObject } = require('../../util/mongoose');

class LoaiCGController {
    // [GET] /courses/:slug
    show(req, res, next) {
        LoaiConGiong.findOne({ slug: req.params.slug })
            .then((loaicongiong) =>
                res.render('loaicongiong/show', {
                    loaicongiong: mongooseToObject(loaicongiong),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('loaicongiong/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const loaicongiong = new LoaiConGiong(req.body);
        loaicongiong
            .save()
            .then(() => res.redirect('/me/stored/loaicongiong'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        LoaiConGiong.findById(req.params.id)
            .then((loaicongiong) =>
                res.render('loaicongiong/edit', {
                    loaicongiong: mongooseToObject(loaicongiong),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        LoaiConGiong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/loaicongiong'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        LoaiConGiong.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        LoaiConGiong.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        LoaiConGiong.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new LoaiCGController();
