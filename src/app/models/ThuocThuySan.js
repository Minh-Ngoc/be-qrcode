const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ThuocThuySan = new Schema(
    {
        ten: { type: String, required: true },
        lluongvacachsd: { type: String, default: null },
        ncc: { type: String, default: null },
        
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
ThuocThuySan.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ThuocThuySan', ThuocThuySan);
