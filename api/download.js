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

      // Mengonversi objek JSON menjadi string sebelum mengirimkannya
      const responseBody = JSON.stringify({ downloadLink: output.url });
      res.status(200).send(responseBody);
    } catch (error) {
      // Mengonversi objek JSON menjadi string untuk pesan kesalahan
      const errorBody = JSON.stringify({ error: 'Error downloading video' });
      res.status(500).send(errorBody);
    }
  } else {
    // Mengonversi objek JSON menjadi string untuk pesan kesalahan
    const errorBody = JSON.stringify({ error: 'Method not allowed' });
    res.status(405).send(errorBody);
  }
}
