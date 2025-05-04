export default async function handler(req, res) {
  const accounts = [
    'jjrsweert',       // nefunkční
    'rossiekk',        // nefunkční
    'singh-raja',      // funkční
    'jakebsweet'       // funkční
  ];

  for (const account of accounts) {
    try {
      const response = await fetch(`https://www.snapchat.com/add/${account}`);
      const html = await response.text();

      if (html.includes('snapcode') || html.includes('Add me on Snapchat')) {
        return res.status(200).json({ account });
      }
    } catch (e) {
      // chyba? pokracuj na dalsi
    }
  }

  return res.status(404).json({ error: 'No active account found' });
}
