const Joi = require('joi');

const schema = Joi.object().keys({
  nama: Joi.string().required().max(32),
  alamat: Joi.any().required(),
  kelas: Joi.string().required(),
  nama_wali: Joi.string().required(),
  no_telp_wali: Joi.string().required(),
  rekap_nilai: Joi.string().uri(),
  rekap_pembayaran: Joi.string().uri(),
});

module.exports = schema;