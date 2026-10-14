import express from 'express';
import mongoose from 'mongoose';
import Resep from '../models/resep.js';

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


const pickFields = (body) => ({
  nama_resep: body.nama_resep,
  kategori: body.kategori,
  waktu_masak_menit: body.waktu_masak_menit,
});


router.post('/', async (req, res) => {
  try {
    const resep = await Resep.create(pickFields(req.body));
    res.status(201).json({ success: true, message: 'Resep berhasil ditambahkan', data: resep });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await Resep.find();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const resep = await Resep.findById(id);
    if (!resep) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: resep });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const resep = await Resep.findByIdAndUpdate(id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!resep) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Resep berhasil diperbarui', data: resep });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const resep = await Resep.findByIdAndDelete(id);
    if (!resep) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Resep berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;