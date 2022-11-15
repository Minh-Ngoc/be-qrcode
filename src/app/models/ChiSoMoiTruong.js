const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ChiSoMoiTruong = new Schema(
    {
        ten: { type: String, required: true },
        donvitinh: { type: String, default: null },
        
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
ChiSoMoiTruong.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ChiSoMoiTruong', ChiSoMoiTruong);
