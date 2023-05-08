const xlsx = require('xlsx');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const Candidate = require('../models/candidate');
const mongoose = require('mongoose');

// Connect to MongoDB database
dbUrl = 'mongodb+srv://gowthamtupili:pK4CEjuiN8nhDSJ4@cluster0.aqi43o8.mongodb.net/test';


  mongoose.connect(dbUrl)
  .then(() => {
      console.log("Database Connected!!!");
  })
  .catch(err => {
      console.log("OH NO ERROR!")
      console.log(err);  
  });


module.exports.postFile = async(req, res) => {
  // delete old data from cloud
  await Candidate.deleteMany({});


  // Load Excel file and get candidate data
  const workbook = xlsx.readFile(req.file.path);
  const worksheet = workbook.Sheets['Sheet1'];
  const candidates = xlsx.utils.sheet_to_json(worksheet);
  // console.log(req.file)
  // console.log(candidates);

  for (let candidate of candidates) {
    const newObj = {
      name: candidate['Name of the Candidate'],
      email: candidate.Email,
      mobile: candidate['Mobile No.'],
      dob: candidate['Date of Birth'],
      work_exp: candidate['Work Experience'],
      resume_title: candidate['Resume Title'],
      current_location: candidate['Current Location'],
      postal_address: candidate['Postal Address'],
      current_employer: candidate['Current Employer'],
      current_designation: candidate['Current Designation'],
    }
    let singlePerson = await Candidate.find({email: candidate.Email}).exec();
    // console.log(singlePerson);
    if(singlePerson != null) {
      const newCandidate = new Candidate(newObj);
      await newCandidate.save();
      console.log(`Added candidate ${newCandidate.name}`);
    }
    
  }


  res.render('success');
}