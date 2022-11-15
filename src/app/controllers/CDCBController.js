const CongDoanCheBien = require('../models/CongDoanCheBien');
const { mongooseToObject } = require('../../util/mongoose');

class CDCBController {
    // [GET] /courses/:slug
    show(req, res, next) {
        CongDoanCheBien.findOne({ slug: req.params.slug })
            .then((congdoanchebien) =>
                res.render('congdoanchebien/show', {
                    congdoanchebien: mongooseToObject(congdoanchebien),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('congdoanchebien/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const congdoanchebien = new CongDoanCheBien(req.body);
        congdoanchebien
            .save()
            .then(() => res.redirect('/me/stored/congdoanchebien'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        CongDoanCheBien.findById(req.params.id)
            .then((congdoanchebien) =>
                res.render('congdoanchebien/edit', {
                    congdoanchebien: mongooseToObject(congdoanchebien),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        CongDoanCheBien.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/congdoanchebien'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        CongDoanCheBien.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        CongDoanCheBien.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        CongDoanCheBien.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CDCBController();
