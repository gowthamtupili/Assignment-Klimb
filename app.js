const mongoose = require('mongoose');
const xlsx = require('xlsx');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();


const Candidate = require('./models/candidate'); 
const controlCandidate = require('./controllers/file');



app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
  


app.get('/', (req, res) => {
  res.render('home')
});

app.post('/upload', upload.single('file'), controlCandidate.postFile);


app.all('*', (req,res,next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err,req,res,next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = `Oh no, Something went wrong!`
  res.status(statusCode).render('error',{ err });
  // res.send('Oops! Something went wrong!!');
})


const port = 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`)
})
