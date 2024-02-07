import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());

app.get('/api/leetcode', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        {
          matchedUser(username: "${username}") {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from LeetCode API:', error);
    res.status(500).json({ error: 'Error fetching data from LeetCode API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
