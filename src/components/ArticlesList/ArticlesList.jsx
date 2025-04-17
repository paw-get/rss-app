import React from 'react';
import styles from './articlesList.module.scss';

export default function ArticlesList({ articles, onClick }) {
  return (
    <div className={styles.articlesList}>
      <div className='ui relaxed divided list'>
        {articles.map((article, index) => (
          <div
            className={`item ${styles.item}`}
            key={index}
            onClick={() => onClick(article)}
          >
            <i className='large file outline middle aligned icon'></i>
            <div className='content'>
              <div className='header'>{article.title}</div>
              <div className='description'>Added: {article.pubDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
