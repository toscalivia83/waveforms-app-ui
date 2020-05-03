const mongoose = require('mongoose');

const stethoscopeRecordSchema = new mongoose.Schema({
  audioUrl: String,
  annotationData: {
    numberOfBreaths: Number,
    hasHeartBeat: Boolean,
  }
});

module.exports = mongoose.model('stethoscopeRecord', stethoscopeRecordSchema);
