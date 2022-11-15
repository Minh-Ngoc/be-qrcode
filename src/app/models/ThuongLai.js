const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ThuongLai = new Schema(
    {
        ten: { type: String, default: null },
        sdt: { type: String, default: null },
        diachi: { type: String, default: null },
        gioitinh: { type: String, default: 'Nam' },
        hinhanh: { type: String, default: null },
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
ThuongLai.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ThuongLai', ThuongLai);



