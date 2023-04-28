const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Candidate = require('./models/candidate'); // Replace with your candidate model

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

// Load Excel file and get candidate data
const workbook = xlsx.readFile('./data/Klimb_Assignment.xlsx');
const worksheet = workbook.Sheets['Sheet1'];
const candidates = xlsx.utils.sheet_to_json(worksheet);

// console.log(candidates[0]);


async function deleteCandidates() {
  await Candidate.deleteMany({});
}



// Add candidates to MongoDB database
async function addCandidates() {
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
  // console.log(`Added ${candidates.length} candidates to the database`);
  // mongoose.disconnect();
}


// To delete previous data from mongodb cloud.
deleteCandidates();

// To add candidates.
addCandidates();
