const ThuocThuySan = require('../models/ThuocThuySan');
const { mongooseToObject } = require('../../util/mongoose');

class ThuocThuySanController {

    // [GET] /courses/create
    create(req, res, next) {
        res.render('thuocthuysan/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const thuocthuysan = new ThuocThuySan(req.body);
        thuocthuysan
            .save()
            .then(() => res.redirect('/me/stored/thuocthuysan'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        ThuocThuySan.findById(req.params.id)
            .then((thuocthuysan) =>
                res.render('thuocthuysan/edit', {
                    thuocthuysan: mongooseToObject(thuocthuysan),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        ThuocThuySan.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/thuocthuysan'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        ThuocThuySan.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        ThuocThuySan.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        ThuocThuySan.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ThuocThuySanController();
