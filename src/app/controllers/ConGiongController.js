const ConGiong = require('../models/ConGiong');
const LoaiConGiong = require('../models/LoaiConGiong');
const NCCConGiong = require('../models/NCCConGiong');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class ConGiongController {
    // [GET] /courses/:slug
    show(req, res, next) {
        ConGiong.findOne({ slug: req.params.slug })
            .then((congiong) =>
                res.render('congiong/show', {
                    congiong: mongooseToObject(congiong),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        Promise.all([LoaiConGiong.find({}), NCCConGiong.find({})])
        .then(([loaicongiongs, ncccongiongs]) =>
            res.render('congiong/create', {
                loaicongiongs: mutipleMongooseToObject(loaicongiongs),
                ncccongiongs: mutipleMongooseToObject(ncccongiongs),
            }),
        )
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const congiong = new ConGiong(req.body);
        congiong
            .save()
            .then(() => res.redirect('/me/stored/congiong'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        ConGiong.findById(req.params.id)
            .then((congiong) =>
                res.render('congiong/edit', {
                    congiong: mongooseToObject(congiong),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        ConGiong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/congiong'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        ConGiong.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        ConGiong.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        ConGiong.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ConGiongController();
