import mongoose from 'mongoose';

const resepSchema = new mongoose.Schema(
  {
    nama_resep: {
      type: String,
      required: [true, 'nama_resep wajib diisi'],
      trim: true,
    },
    kategori: {
      type: String,
      required: [true, 'kategori wajib diisi'],
      trim: true,
    },
    waktu_masak_menit: {
      type: Number,
      required: [true, 'waktu_masak_menit wajib diisi'],
      min: [1, 'waktu_masak_menit minimal 1'],
    },
  },
  { timestamps: true }
);


const Resep = mongoose.model('Resep', resepSchema, 'resep_masakan');

export default Resep;