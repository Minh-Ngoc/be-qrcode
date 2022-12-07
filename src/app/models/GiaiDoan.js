const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const SDThucAn = new Schema({
    luongthucan: { type: String, default: null},
    thoidiem: { type: String, default: null},

    thucanId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ThucAn',
    },
});

const GiaiDoan = new Schema(
    {
        ten: { type: String, required: true },
        ghichu: { type: String, default: null },
        thoidiem: { type: String, default: null },
        aonuoiId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'ThucAn',
        },
        
        thucan: [SDThucAn],
        
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
GiaiDoan.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('GiaiDoan', GiaiDoan);
