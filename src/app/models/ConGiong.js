const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ConGiong = new Schema(
    {
        ten: { type: String, require: true },
        hinhanh: { type: String, default: null },
        mota: { type: String, default: null },
        lcgId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoaiConGiong' },
        ncccgId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'NCCConGiong' 
        },

        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
ConGiong.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ConGiong', ConGiong);
