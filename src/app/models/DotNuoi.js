const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CTConGiong = new Schema({
        congiongId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'ConGiong',
            default: null,
        },
        soluong: { type: Number, require: null },
        ngaytuoi: { type: Number, default: null },
        chatluong: { type: String, default: null },
    }
);

const DotNuoi = new Schema(
    {
        ten: { type: String, required: true },
        namnuoi: { type: String, default: '2022' },
        thoidiem: { type: String, default: null },
        trangthai: { type: String, default: null },
        tinhtrang: { type: String, default: null },
        qrImage: { type: String, default: null },

        ctcongiong: [CTConGiong],
        
        aonuoiId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'AoNuoi',
        },
        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
DotNuoi.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('DotNuoi', DotNuoi);
