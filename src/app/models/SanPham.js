const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CTCongDoanCheBien = new Schema({
        thoidiem: { type: String, default: null},
        cachxuly: { type: String, default: null },
        congnghechebien: { type: String, default: null },
        cdcbId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CongDoanCheBien"
        },
    },
);

const SanPham = new Schema(
    {
        ten: { type: String, require: true },
        hinhanh: { type: String, default: null },
        mota: { type: String, default: null },

        aonuoiId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'AoNuoi',
        },

        congdoanchebien: [CTCongDoanCheBien],

        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
SanPham.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('SanPham', SanPham);
