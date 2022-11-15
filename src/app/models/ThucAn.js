const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ThucAn = new Schema(
    {
        ten: { type: String, required: true },
        loaithucan: { type: String, default: null },
        ncc: { type: String, default: null },
        ghicchu: { type: String, default: null },
        
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
ThucAn.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ThucAn', ThucAn);
