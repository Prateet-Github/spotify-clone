import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

console.log("Loaded CLIENT_ID:", process.env.CLIENT_ID);

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URI, // or hardcode http://192.168.1.49:5177
  credentials: true,
}));

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private user-top-read playlist-modify-private playlist-modify-public user-read-recently-played';

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
  });

  console.log("Redirecting to Spotify with params:", queryParams); // <—
  
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

//   if (!code) {
//   console.error('No code returned from Spotify');
//   return res.status(400).send('Missing code');
// }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Redirect to frontend with tokens (you can change this part later)
    res.redirect(
      `${process.env.FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
    );
  } catch (error) {
    console.error('Token exchange error:', error.response.data);
    res.status(400).send('Token exchange failed');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});