import React from 'react';

import ButtonFactory from '../ButtonFactory/ButtonFactory';
import Header from '../Header/Header';

import styles from './feedList.module.scss';

export default function FeedList({
  feeds,
  onRemoveFeed,
  onToggleVisibility,
  onUrlClick,
}) {
  return (
    <>
      {feeds.length > 0 && (
        <div className={styles.feedList}>
          <Header type='default' msg='Subscribed RSS feeds:' />
          <div className='ui relaxed divided list'>
            {feeds.map(({ url, visible }) => (
              <div className='item' key={url}>
                <i
                  className={`${
                    visible ? '' : styles.disabled
                  } large rss square middle aligned icon`}
                ></i>
                <div className='content'>
                  <div className='header'>
                    <span
                      className={`${styles.clickableHeader} ${
                        visible ? '' : styles.disabled
                      }`}
                      onClick={() => onUrlClick(url)}
                    >
                      {url}
                    </span>
                    <div className={styles.buttonContainer}>
                      <ButtonFactory
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVisibility(url);
                        }}
                        type={visible ? 'warning' : 'accept'}
                        size='small'
                      >
                        {visible ? 'Hide' : 'Show'}
                      </ButtonFactory>
                      <ButtonFactory
                        type='critical'
                        size='small'
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFeed(url);
                        }}
                      >
                        Remove
                      </ButtonFactory>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
