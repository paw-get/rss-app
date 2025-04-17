import React from 'react';
import { useRef, useState, useEffect } from 'react';
import styles from './articlePreview.module.scss';
import ButtonFactory from '../ButtonFactory/ButtonFactory';

export default function ArticlePreview({ article, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const previewRef = useRef();

  const startClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        startClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!article) return null;

  return (
    <div
      className={`${styles.overlay} ${
        isClosing ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div className={styles.preview} ref={previewRef}>
        <button className={styles.closeBtn} onClick={startClose}>
          ×
        </button>
        <h2>{article.title}</h2>
        <p>Created at: {new Date(article.pubDate).toLocaleString()}</p>
        {/* NASA's RSS feed should be safe to use dangerouslySetInnerHTML, for anything else we shouldn't use it */}
        {article.content && (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        )}
        <div className={styles.buttonsContainer}>
          <ButtonFactory
            onClick={() => {
              window.open(article.link, '_blank', 'noopener,noreferrer');
              startClose();
            }}
            type='primary'
          >
            Read whole article
          </ButtonFactory>
        </div>
      </div>
    </div>
  );
}
