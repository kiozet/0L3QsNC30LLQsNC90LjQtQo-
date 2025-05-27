import { useState, useRef } from 'react';
import { apiService } from '../../services/apiService';
import ImageViewer from '../ImageViewer/ImageViewer';
import styles from './FileUpload.module.css';


const FileUpload = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingJson, setIsDraggingJson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' }); 
  const [showDetails, setShowDetails] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);
  const imageInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const MAX_IMAGE_SIZE_MB = 20;
  const MAX_JSON_SIZE_MB = 5;
  const BYTES_IN_MB = 1048576;

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 10000);
  };

  const validateFile = (file, maxSizeMB, allowedTypes) => {
    if (!file) return false;

    if (!allowedTypes.includes(file.type)) {
      showMessage(`Неподдерживаемый формат файла. Разрешены: ${allowedTypes.join(', ')}`, 'error');
      return false;
    }

    if (file.size > maxSizeMB * BYTES_IN_MB) {
      showMessage(`Файл слишком большой. Максимальный размер: ${maxSizeMB} МБ`, 'error');
      return false;
    }

    return true;
  };

  const handleImageChange = (file) => {
    const isValid = validateFile(file, MAX_IMAGE_SIZE_MB, ['image/jpeg', 'image/png', 'image/tiff']);
    if (isValid) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleJsonChange = (file) => {
    const isValid = validateFile(file, MAX_JSON_SIZE_MB, ['application/json']);
    if (isValid) setJsonFile(file);
  };

  const handleDragEvents = (type) => ({
    onDragOver: (e) => {
      e.preventDefault();
      type === 'image' ? setIsDraggingImage(true) : setIsDraggingJson(true);
    },
    onDragLeave: () => {
      type === 'image' ? setIsDraggingImage(false) : setIsDraggingJson(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (type === 'image') {
        setIsDraggingImage(false);
        handleImageChange(file);
      } else {
        setIsDraggingJson(false);
        handleJsonChange(file);
      }
    }
  });

  const handleSubmit = async () => {
    if (!imagePreview || jsonFile) {
      showMessage('Пожалуйста, загрузите хотя бы изображение', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageInputRef.current.files[0]);
    formData.append('json', jsonFile);

    setIsLoading(true);
    setMessage({ text: 'Обработка изображения', type: 'info' });

    try {
      const result = await apiService.uploadFiles(formData);
      
      setResult({
        originalImage: imagePreview,
        processedImage: result.imageUrl,
        vessels: result.vessels,
        meta: {
          processingTime: result.processingTime
        }
      });
      
      showMessage(
        `Анализ завершен за ${result.processingTime}! Найдено судов: ${result.vessels.length}`,
        'success'
      );
    } catch (error) {
      console.error('Ошибка:', error);
      showMessage(
        error.message || 'Произошла ошибка при обработке изображения',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleVesselClick = (vessel) => {
        console.log('Selected vessel:', vessel);
  };
  const openImageViewer = (imageSrc) => {
    setViewerImage(imageSrc);
  };

  const closeImageViewer = () => {
    setViewerImage(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftColumn}>
        <div className={styles.leftText}>
          <p className={styles.leftTextFirst}>
            Хотите узнать, какие суда находятся на вашем снимке? Начните анализ — просто загрузите спутниковое изображение моря или океана.
          </p>
          <p className={styles.leftTextSecond}>
            Поддерживаемые форматы: JPG, PNG, TIFF (макс. {MAX_IMAGE_SIZE_MB} МБ). JSON (макс. {MAX_JSON_SIZE_MB} МБ).
          </p>
        </div>

        <div 
          className={`${styles.fileUpload} ${isDraggingImage ? styles.dragging : ''}`}
          {...handleDragEvents('image')}
          onClick={() => imageInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={imageInputRef}
            accept=".jpg,.jpeg,.png,.tiff"
            className={styles.fileInput}
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          <label className={styles.fileLabel}>Выберите изображение</label>
          <p className={styles.fileHint}>или перетащите в эту область</p>
        </div>

        <div 
          className={`${styles.fileUpload} ${isDraggingJson ? styles.dragging : ''}`}
          {...handleDragEvents('json')}
          onClick={() => jsonInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={jsonInputRef}
            accept=".json"
            className={styles.fileInput}
            onChange={(e) => handleJsonChange(e.target.files[0])}
          />
          <label className={styles.fileLabel}>Выберите JSON файл</label>
          <p className={styles.fileHint}>или перетащите в эту область</p>
        </div>

        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!imagePreview || jsonFile || isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Отправка...
            </>
          ) : 'Отправить на анализ'}
        </button>

        {/* Блок с уведомлениями */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className={styles.rightColumn}>
          {imagePreview && (
              <div className={styles.previewSection}>
                  <h3>Загруженное изображение:</h3>
                  <div className={styles.imageContainer}>
                      <img 
                          src={imagePreview} 
                          alt="Загруженное изображение" 
                          className={styles.previewImage}
                          onClick={() => openImageViewer(imagePreview)}
                      />
                  </div>
              </div>
          )}

          {result && (
              <div className={styles.resultsSection}>
                  <h3>Результаты анализа:</h3>
                    <div className={styles.imageContainer}>
                        <img 
                            src={result.processedImage} 
                            alt="Обработанное изображение" 
                            className={styles.previewImage}
                            onClick={() => openImageViewer(result.processedImage)}
                        />
                        <div className={styles.imageLabel}>Результат</div>
                    </div>

                  <button 
                      className={styles.detailsButton}
                      onClick={() => setShowDetails(!showDetails)}
                  >
                      {showDetails ? 'Скрыть детали' : 'Показать детали'}
                  </button>

                  {showDetails && (
                      <div className={styles.vesselsList}>
                          <h4>Обнаруженные суда:</h4>
                          <ul>
                              {result.vessels.map((vessel, index) => (
                                  <li 
                                      key={index} 
                                      className={styles.vesselItem}
                                      onClick={() => handleVesselClick(vessel)}
                                  >
                                      <span className={styles.vesselType}>{vessel.type}</span>
                                      <span className={styles.vesselConfidence}>
                                          Точность: {(vessel.confidence * 100).toFixed(1)}%
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
          )}
      </div>
      <ImageViewer 
        src={viewerImage} 
        alt="Увеличенное изображение"
        onClose={closeImageViewer}
      />
    </div>
  );
};

export default FileUpload;