const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CoSoNuoiTrong = new Schema(
    {
        ten: { type: String, required: true },
        chusohuu: { type: String, default: null},
        diachi: { type: String, default: null},
        sdt: { type: String, default: null },
        dientich: { type: String, default: null },
        dtmatnuoc: { type: String, default: null },
        namdangky: { type: String, default: null },
        
        tkId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'TaiKhoan',
        },

        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
CoSoNuoiTrong.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('CoSoNuoiTrong', CoSoNuoiTrong);
