const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ChiSoMoiTruong = new Schema({
    thoidiem: { type: String, default: null},
    chiso: { type: String, default: null},
    ghichu: { type: String, default: null},
    csmtId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ChiSoMoiTruong',
    },
});

const NhatKyXuatAo = new Schema({
    thoidiem: { type: String, default: null},
    khoiluong: { type: String, default: null},
    ppthuhoach: { type: String, default: null},
    thuonglaiId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ThuongLai',
    },
});

const CTSDThuoc = new Schema({
    lieuluong: { type: String, default: null},
    thoidiem: { type: String, default: null},
    thuocthuysanId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ThuocThuySan',
    },
});


const AoNuoi = new Schema(
    {
        ten: { type: String, required: true },
        dientich: { type: String, required: true },

        csntId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'CoSoNuoiTrong',
        },
        chisomoitruong: [ChiSoMoiTruong],
        nhatkyxuatao: [NhatKyXuatAo],
        thuocthuysan: [CTSDThuoc],
        // giaidoanId: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'GiaiDoan',
        // },
        // nhatkyxuatao: [NhatKyXuatAo],
        // ctsdthuocId: [CTSDThuoc],
        

        slug: { type: String, slug: 'ten', unique: true },
    },
    {
        timestamps: true
    },
);

// Add plugins
mongoose.plugin(slug);
AoNuoi.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('AoNuoi', AoNuoi);
