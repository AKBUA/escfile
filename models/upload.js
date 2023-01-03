const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile = new Schema(
  {
    
    imageUrl: {
      type: String,
      required: true,
      unique:true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profile);
