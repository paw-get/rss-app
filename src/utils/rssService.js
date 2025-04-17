import Parser from 'rss-parser/dist/rss-parser.min.js';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const parser = new Parser();

export async function fetchFeed(feedUrl) {
  const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(feedUrl)}`;
  const response = await fetch(proxiedUrl);

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  const data = await response.json();
  const base64 = data.contents.replace(/^data:.*?;base64,/, '');
  const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const decoded = new TextDecoder('utf-8').decode(byteArray);

  const feed = await parser.parseString(decoded);
  return feed;
}
