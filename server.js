import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import youtubedl from 'youtube-dl-exec';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/download', async (req, res) => {
  const url = req.body.url;
  try {
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      format: 'best',
    });

    res.json({ downloadLink: output.url });
  } catch (error) {
    res.status(500).send('Error downloading video');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
