const homeRouter = require('./home');

const apiRouter = require('./api');

const testqrRouter = require('./testqr');

const meRouter = require('./me');
const taikhoanRouter = require('./taikhoan');
const dotnuoiRouter = require('./dotnuoi');
const aonuoiRouter = require('./aonuoi');
const cosonuoitrongRouter = require('./cosonuoitrong');
const congiongRouter = require('./congiong');
const loaiCGRouter = require('./loaicongiong');
const nccccongiongRouter = require('./ncccongiong');
const thuonglaiRouter = require('./thuonglai');
const cdcbRouter = require('./congdoanchebien');
const sanphamRouter = require('./sanpham');

function route(app) {
    app.use('/me', meRouter);

    app.use('/taikhoan', taikhoanRouter);
    // app.use('/vaitro', vaitroRouter);
    app.use('/dotnuoi', dotnuoiRouter);
    app.use('/aonuoi', aonuoiRouter);
    app.use('/cosonuoitrong', cosonuoitrongRouter);
    app.use('/congiong', congiongRouter);
    app.use('/loaicongiong', loaiCGRouter);
    app.use('/ncccongiong', nccccongiongRouter);
    app.use('/thuonglai', thuonglaiRouter);
    app.use('/congdoanchebien', cdcbRouter);
    app.use('/sanpham', sanphamRouter);

    app.use('/testqr', testqrRouter);

    app.use('/api', apiRouter);
    app.use('/', homeRouter);
}

module.exports = route;
