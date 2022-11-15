const TaiKhoan = require('../models/TaiKhoan');
const { mongooseToObject } = require('../../util/mongoose');

class TaiKhoanController {

    // [GET] /courses/create
    create(req, res, next) {
        res.render('taikhoan/create');
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const taikhoan = new TaiKhoan(req.body);
        taikhoan
            .save()
            .then(() => res.redirect('/me/stored/taikhoan'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        TaiKhoan.findById(req.params.id)
            .then((taikhoan) =>
                res.render('taikhoan/edit', {
                    taikhoan: mongooseToObject(taikhoan),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        TaiKhoan.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/taikhoan'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        TaiKhoan.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        TaiKhoan.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        TaiKhoan.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new TaiKhoanController();
