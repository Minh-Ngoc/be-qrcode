const ThucAn = require('../models/ThucAn');
const { mongooseToObject } = require('../../util/mongoose');

class ThucAnController {

    // [GET] /courses/create
    create(req, res, next) {
        res.render('thucan/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const thucan = new ThucAn(req.body);
        thucan
            .save()
            .then(() => res.redirect('/me/stored/thucan'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        ThucAn.findById(req.params.id)
            .then((thucan) =>
                res.render('thucan/edit', {
                    thucan: mongooseToObject(thucan),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        ThucAn.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/thucan'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        ThucAn.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        ThucAn.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        ThucAn.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ThucAnController();
