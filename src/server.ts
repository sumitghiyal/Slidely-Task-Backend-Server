import express, { Request, Response } from 'express';
import bodyParser, { json } from 'body-parser';
import fs from 'fs';

interface SubmissionData {
  name: string;
  email: string;
  phone: string;
  githubLink: string;
  stopwatchTime: string;
}

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

//ping endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'True' });
});

let submissions: any[] = [];
try {
  const data = fs.readFileSync('db.json', 'utf8');
  submissions = JSON.parse(data);
} catch (error) {
  console.error('Error reading db.json:', error);
}

// Handle POST request to /submit
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, githubLink, stopwatchTime } = req.body;

  // Generate a unique index for the new submission
  const index = submissions.length; // Assuming zero-based indexing
  const newSubmission = { index, name, email, phone, githubLink, stopwatchTime };

  // Add the new submission to the submissions array
  submissions.push(newSubmission);

  // Write the updated submissions array to db.json
  fs.writeFile('db.json', JSON.stringify(submissions, null, 2), (err) => {
    if (err) {
      console.error('Error writing to db.json:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Submission added successfully', submission: newSubmission });
    }
  });
});

// GET endpoint to check if server is running (ping)

app.get('/read', (req, res) => {
  try {
      const data = fs.readFileSync('db.json', 'utf8');
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
  } catch (err) {
      console.error('Error reading or parsing db.json:', err);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});