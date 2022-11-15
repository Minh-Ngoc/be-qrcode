const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const TaiKhoan = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String },
        ten: { type: String, default: null },
        gioitinh: { type: String, default: 'Nam' },
        sdt: { type: String, default: null },
        diachi: { type: String, default: null },
        hinhanh: { type: String, default: null },

        IsAdmin: {type: Boolean, default: false},
        slug: { type: String, slug: 'username', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
TaiKhoan.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('TaiKhoan', TaiKhoan);
