const mongoose = require('mongoose');

const stethoscopeRecordSchema = new mongoose.Schema({
  audioUrl: String,
  numberOfBreaths: Number,
  hasHeartBeats: Boolean,
});

module.exports = mongoose.model('stethoscopeRecord', stethoscopeRecordSchema);
