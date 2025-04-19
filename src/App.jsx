import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.scss';
import ArticlePreview from './components/ArticlePreview/ArticlePreview';
import ArticlesList from './components/ArticlesList/ArticlesList';
import FeedForm from './components/FeedForm/FeedForm';
import FeedList from './components/FeedList/FeedList';
import Loader from './components/Loader/Loader';
import TopMenu from './components/TopMenu/TopMenu';
import ZeroState from './components/ZeroState/ZeroState';
import useDebouncedValue from './hooks/useDebounce';
import useLoading from './hooks/useLoading';
import { fetchFeed } from './utils/rssService.js';

function App() {
  const [loading, loadingActions] = useLoading();
  const [feeds, setFeeds] = useState(() => {
    const saved = localStorage.getItem('feeds');
    return saved ? JSON.parse(saved) : [];
  });
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [readArticles, setReadArticles] = useState(() => {
    const saved = localStorage.getItem('readArticles');
    return saved ? JSON.parse(saved) : [];
  });

  const feedUrls = feeds.map((feed) => feed.url).join(',');

  useEffect(() => {
    localStorage.setItem('feeds', JSON.stringify(feeds));

    const loadArticles = async () => {
      const allArticles = [];
      loadingActions.start('Loading articles');

      const visibleFeeds = feeds.filter((feed) => feed.visible);

      for (const { url } of visibleFeeds) {
        try {
          const feed = await fetchFeed(url);
          allArticles.push(
            ...feed.items.map((item) => ({ ...item, feedUrl: url }))
          );
        } catch (err) {
          toast.error(`Failed to load feed: ${url}, ${err.message}`);
          console.error('Failed to load feed:', url, err);
        }
      }

      allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setArticles(allArticles);
      loadingActions.stop();
    };

    if (feeds.length > 0) loadArticles();
  }, [feedUrls]);

  useEffect(() => {
    localStorage.setItem('readArticles', JSON.stringify(readArticles));
  }, [readArticles]);

  const handleAddFeed = async (url) => {
    const normalizedUrl = url.trim().toLowerCase();

    if (feeds.some((feed) => feed.url.toLowerCase() === normalizedUrl)) {
      toast.info('This feed is already added.');
      return;
    }

    loadingActions.start('Adding new feed');

    try {
      const newFeed = await fetchFeed(normalizedUrl);

      if (newFeed && newFeed.items.length > 0) {
        setFeeds([...feeds, { url: normalizedUrl, visible: true }]);
        toast.info('Feed added to your list');
      } else {
        toast.error('Feed loaded but seems empty or invalid.');
      }
    } catch (err) {
      console.error('Invalid RSS feed:', err);
      toast.error('Failed to load feed. Please check the URL.');
    } finally {
      loadingActions.stop();
    }
  };

  const handleRemoveFeed = (urlToRemove) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this feed and all related articles?'
    );

    if (!confirmed) return;

    const updatedFeeds = feeds.filter((feed) => feed.url !== urlToRemove);
    const updatedArticles = articles.filter(
      (article) => article.feedUrl !== urlToRemove
    );

    toast.info('Feed removed from your list. Related articles were removed.');
    setFeeds(updatedFeeds);
    setArticles(updatedArticles);
  };

  const handleUrlClick = (urlToShow) => {
    const updatedFeeds = feeds.map((feed) => ({
      ...feed,
      visible: feed.url === urlToShow,
    }));
    setFeeds(updatedFeeds);
  };

  const handleToggleVisibility = (urlToToggle) => {
    const updatedFeeds = feeds.map((feed) => ({
      ...feed,
      visible: feed.url === urlToToggle ? !feed.visible : feed.visible,
    }));
    setFeeds(updatedFeeds);
  };

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const visibleFeeds = feeds
    .filter((feed) => feed.visible)
    .map((feed) => feed.url);

  const filteredArticles = articles
    .filter((article) => visibleFeeds.includes(article.feedUrl))
    .filter((article) =>
      article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

  const articlesWithReadFlag = filteredArticles.map((article) => ({
    ...article,
    isRead: readArticles.includes(article.link),
  }));

  const markAsRead = (link) => {
    if (!readArticles.includes(link)) {
      setReadArticles([...readArticles, link]);
    }
  };

  return (
    <>
      <TopMenu onChange={(e) => setSearchQuery(e.target.value)} />
      <div className={styles.main}>
        <FeedForm onAddFeed={handleAddFeed} />
        <FeedList
          feeds={feeds}
          onRemoveFeed={handleRemoveFeed}
          onToggleVisibility={handleToggleVisibility}
          onUrlClick={handleUrlClick}
        />
        {searchQuery.length > 0 &&
          feedUrls.length > 0 &&
          filteredArticles.length > 0 && (
            <ZeroState msg={`Search results for ${searchQuery}: `} />
          )}
        {filteredArticles.length > 0 && (
          <ArticlesList
            articles={articlesWithReadFlag}
            onClick={(article) => setSelectedArticle(article)}
          />
        )}

        {selectedArticle && selectedArticle.title && (
          <ArticlePreview
            article={{
              ...selectedArticle,
              isRead: readArticles.includes(selectedArticle.link),
            }}
            onClose={() => setSelectedArticle(null)}
            onMarkAsRead={markAsRead}
          />
        )}
        <ToastContainer theme='light' position='top-right' autoClose={9000} />
        {loading.active && <Loader msg={loading.msg} />}
        {!filteredArticles.length &&
          searchQuery.length > 0 &&
          feedUrls.length > 0 && (
            <ZeroState msg={`No articles matching ${searchQuery}`} />
          )}
        {!feedUrls.length && <ZeroState msg='Add your first RSS feed' />}
      </div>
    </>
  );
}

export default App;
