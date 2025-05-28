import React from 'react';
import styles from './ImageViewer.module.css';

const ImageViewer = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={src} alt={alt} className={styles.enlargedImage} />
      </div>
    </div>
  );
};

export default ImageViewer;