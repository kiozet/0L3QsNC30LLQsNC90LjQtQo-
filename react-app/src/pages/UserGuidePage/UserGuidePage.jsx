import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './UserGuidePage.module.css';
import '../../styles/global.css';

const UserGuidePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.guideContainer}>
        <h1 className={styles.mainTitle}>Инструкция по использованию Watercraft Detector</h1>
        
        <section className={styles.section}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h2>Загрузка изображения</h2>
            <p>Для анализа загрузите спутниковый снимок в одном из поддерживаемых форматов:</p>
            <ul className={styles.featureList}>
              <li>JPEG (.jpg, .jpeg)</li>
              <li>PNG (.png)</li>
              <li>TIFF (.tif, .tiff)</li>
            </ul>
            <div className={styles.note}>
              <strong>Рекомендации:</strong> Для лучшего результата используйте изображения с разрешением не менее 1024×1024 пикселей.
            </div>
          </div>
          <div className={styles.stepVisual}>
            <img 
              src="images/example1.jpg" 
              alt="Пример спутникового снимка"
              className={styles.exampleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h2>Загрузка метаданных (опционально)</h2>
            <p>Для более точного анализа вы можете загрузить JSON-файл с дополнительной информацией:</p>
            <ul className={styles.featureList}>
              <li>Координаты местности</li>
              <li>Дата и время съемки</li>
              <li>Параметры спутника</li>
            </ul>
            <div className={styles.codeExample}>
              <pre>{`{
  "coordinates": {
    "lat": 59.9343,
    "lon": 30.3351
  },
  "date": "2023-06-15T12:00:00Z",
  "sensor": "Sentinel-2"
}`}</pre>
            </div>
          </div>
          <div className={styles.stepVisual}>
            <img 
              src="images/jsonicon.png" 
              alt="JSON иконка"
              className={styles.jsonImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h2>Обработка данных</h2>
            <p>После загрузки файлов начнется автоматическая обработка:</p>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.processIcon}>🔍</div>
                <span>Анализ изображения</span>
              </div>
              <div className={styles.processArrow}>→</div>
              <div className={styles.processStep}>
                <div className={styles.processIcon}>🤖</div>
                <span>Обнаружение судов</span>
              </div>
              <div className={styles.processArrow}>→</div>
              <div className={styles.processStep}>
                <div className={styles.processIcon}>📊</div>
                <span>Формирование </span>
              </div>
            </div>
            <p className={styles.note}>Время обработки зависит от размера изображения и загрузки сервера (обычно 1-3 минуты).</p>
          </div>
          <div className={styles.stepVisual}>
            <div className={styles.animationPlaceholder}>
              <div className={styles.animationCircle}></div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h2>Получение результатов</h2>
            <p>После обработки вы получите:</p>
            <ul className={styles.resultList}>
              <li>Аннотированное изображение с выделенными судами</li>
              <li>Таблицу обнаруженных объектов</li>
              <li>Статистический отчет (опционально)</li>
            </ul>
            <Link to="/" className={styles.tryButton}>
              Попробовать сейчас →
            </Link>
          </div>
          <div className={styles.stepVisual}>
            <img 
            src="images/result1.png" 
            alt="Пример результата"
            className={styles.resultImage}
            />
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>Часто задаваемые вопросы</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>Какие регионы лучше всего анализируются?</h3>
              <p>Система наиболее точна для открытых водных пространств - океанов, морей и крупных озер.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Можно ли анализировать архивные снимки?</h3>
              <p>Да, вы можете загружать снимки любого возраста, если они соответствуют техническим требованиям.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Как можно с вами связаться?</h3>
              <p>Связаться с нами можно через почту или через форму на странице "О нас"</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Есть ли ограничения по размеру файлов?</h3>
              <p>Максимальный размер изображения - 20MB, JSON-файла - 2MB.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UserGuidePage;