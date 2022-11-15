const TaiKhoan = require('../models/TaiKhoan');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class homeController {
    index(req, res, next) {
        TaiKhoan.find({})
            .then((taikhoans) => {
                res.render('home', {
                    taikhoans: mutipleMongooseToObject(taikhoans),
                });
            })
            .catch(next);
    }
}

module.exports = new homeController();
