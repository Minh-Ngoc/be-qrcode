const NCCConGiong = require('../models/NCCConGiong');
const { mongooseToObject } = require('../../util/mongoose');

class NCCConGiongController {
    // [GET] /courses/:slug
    show(req, res, next) {
        NCCConGiong.findOne({ slug: req.params.slug })
            .then((ncccongiong) =>
                res.render('ncccongiong/show', {
                    ncccongiong: mongooseToObject(ncccongiong),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('ncccongiong/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const ncccongiong = new NCCConGiong(req.body);
        ncccongiong
            .save()
            .then(() => res.redirect('/me/stored/ncccongiong'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        NCCConGiong.findById(req.params.id)
            .then((ncccongiong) =>
                res.render('ncccongiong/edit', {
                    ncccongiong: mongooseToObject(ncccongiong),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        NCCConGiong.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/ncccongiong'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        NCCConGiong.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        NCCConGiong.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        NCCConGiong.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new NCCConGiongController();
