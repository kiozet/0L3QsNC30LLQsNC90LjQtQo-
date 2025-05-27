import { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, content, activeIndex, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
      <div 
        className={styles.header} 
        onClick={toggleAccordion}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      
      <div 
        className={styles.content}
        ref={contentRef}
      >
        {Array.isArray(content) ? (
          <div className={styles.exampleContainer}>
            {content.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.example} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => onItemClick && onItemClick(index)}
              >
                <img 
                  src={`/images/${item.img}`} 
                  alt={item.alt} 
                  className={styles.exampleImage}
                />
                {(activeIndex === index) && (
                  <div className={styles.exampleDescription}>
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.descriptionContent}>
            {content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;