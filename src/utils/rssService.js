import Parser from 'rss-parser';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const parser = new Parser();

export async function fetchFeed(feedUrl) {
  const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(feedUrl)}`;
  const response = await fetch(proxiedUrl);
  const data = await response.json();
  const feed = await parser.parseString(data.contents);
  return feed;
}
