import youtubedl from 'youtube-dl-exec';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const url = req.body.url;
    try {
      const output = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        format: 'best',
      });

      res.status(200).json({ downloadLink: output.url });
    } catch (error) {
      res.status(500).json({ error: 'Error downloading video' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
