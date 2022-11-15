const SanPham = require('../models/SanPham');
const CongDoanCheBien = require('../models/CongDoanCheBien');
// const CTCongDoanCheBien = require('../models/CTCongDoanCheBien');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class CDCBController {
    // [GET] /courses/:slug
    show(req, res, next) {
        SanPham.findOne({ slug: req.params.slug })
            .then((sanpham) =>
                res.render('sanpham/show', {
                    sanpham: mongooseToObject(sanpham),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        CongDoanCheBien.find({})
            .then((congdoanchebien) =>
                res.render('sanpham/create', {
                    congdoanchebien: mutipleMongooseToObject(congdoanchebien),
                }),
            )
            .catch(next);
        
    }

    // [POST] /courses/store
    store (req, res, next) {
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const sanpham = new SanPham(req.body);
        sanpham
            .save()
            .then(() => res.redirect('/me/stored/sanpham'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        SanPham.findById(req.params.id)
            .then((sanpham) =>
                res.render('sanpham/edit', {
                    sanpham: mongooseToObject(sanpham),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        SanPham.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/sanpham'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        SanPham.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        SanPham.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        SanPham.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CDCBController();
