const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  work_exp: {
    type: String,
    required: true
  },
  resume_title: {
    type: String,
    // required: true
  },
  current_location: {
    type: String,
    // required: true
  },
  postal_address: {
    type: String,
    // required: true
  },
  current_employer: {
    type: String,
    // required: true
  },
  current_designation: {
    type: String,
    // required: true
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
