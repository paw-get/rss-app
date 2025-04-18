import React, { useState } from 'react';

import styles from './feedForm.module.scss';

export default function FeedForm({ onAddFeed }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onAddFeed(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newFeedForm}>
      <div className='ui action input'>
        <input
          type='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter RSS feed URL'
          required
          className={styles.feedUrlInput}
        />
        <button type='submit' className='ui button primary'>
          Add RSS feed
        </button>
      </div>
      {/* <ButtonFactory size='big'>Hit me</ButtonFactory> */}
      {/* <button onClick={handleSubmit}>Add Feed</button> */}
    </form>
  );
}
