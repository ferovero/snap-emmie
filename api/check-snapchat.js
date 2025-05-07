
export default async function handler(req, res) {
  const accounts = [
    'jjrsweert',
    'rossiekk',
    'singh-raja',
    'jakebsweet'
  ];

  const activeAccounts = [];

  for (const account of accounts) {
    try {
      const response = await fetch(`https://www.snapchat.com/add/${account}`);
      const html = await response.text();
      if (html.includes('snapcode') || html.includes('Add me on Snapchat')) {
        activeAccounts.push(account);
      }
    } catch (e) {
      continue;
    }
  }

  if (activeAccounts.length === 0) {
    return res.status(404).json({ error: 'No active accounts' });
  }

  return res.status(200).json({ accounts: activeAccounts });
}
