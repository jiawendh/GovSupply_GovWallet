import { loadCsvData, checkEligibility, teamRedeem } from './main';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

// Creating express object
const app: Express = express();

// Static folder
var path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

// Handling GET request
app.get('/', (req: Request, res: Response) => {
  loadCsvData()
  res.sendFile(path.join(__dirname, '../views/layouts/index.html'))
})

// Load HTML with feedback
app.post('/check', function(req: Request, res: Response){
  const eligible = checkEligibility(req.body.staffid);
  if(eligible == 0)
  {
    res.sendFile(path.join(__dirname, '../views/layouts/invalid.html'))
  }
  else if(eligible == 1)
  {
    res.sendFile(path.join(__dirname, '../views/layouts/ineligible.html'))
  }
  else if(eligible == 2)
  {
    res.sendFile(path.join(__dirname, '../views/layouts/eligible.html'))
  }
});

// Load HTML for newly redeemed feedback
app.post('/redeemed', function(req: Request, res: Response){
  teamRedeem();
  res.sendFile(path.join(__dirname, '../views/layouts/redeemed.html'))
});

// Port Number
const port = process.env.PORT || 5000;

// Server Setup
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});