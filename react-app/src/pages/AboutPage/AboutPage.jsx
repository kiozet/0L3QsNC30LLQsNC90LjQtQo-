import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './AboutPage.module.css';
import '../../styles/global.css';


const useTimelineAnimation = () => {
    const itemsRef = useRef([]);
    const timelineRef = useRef();
  
    useEffect(() => {
      const lineObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animated);
        }
      }, { threshold: 0.5 });
  
      if (timelineRef.current) {
        lineObserver.observe(timelineRef.current);
      }
  
      const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      }, { threshold: 0.1 });
  
      itemsRef.current.forEach(item => {
        if (item) itemObserver.observe(item);
      });
  
      return () => {
        lineObserver.disconnect();
        itemObserver.disconnect();
      };
    }, []);
  
    const setTimelineRef = (el) => {
      if (el && !itemsRef.current.includes(el)) {
        itemsRef.current.push(el);
      }
    };
  
    return { setTimelineRef, timelineRef };
};

const AboutPage = () => {
    const { setTimelineRef, timelineRef } = useTimelineAnimation();

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const [errors, setErrors] = useState({
      name: '',
      email: '',
      message: ''
    });

    const [formStatus, setFormStatus] = useState({
      loading: false,
      success: false,
      error: ''
    });

    const validateField = (name, value) => {
      let error = '';
      
      switch (name) {
        case 'name':
          if (!value.trim()) {
            error = 'Имя обязательно для заполнения';
          } else if (value.length < 2) {
            error = 'Имя слишком короткое';
          } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
            error = 'Имя содержит недопустимые символы';
          }
          break;
        
        case 'email':
          if (!value) {
            error = 'Email обязателен для заполнения';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Введите корректный email';
          }
          break;
        
        case 'message':
          if (!value.trim()) {
            error = 'Сообщение не может быть пустым';
          } else if (value.length < 10) {
            error = 'Сообщение слишком короткое (минимум 10 символов)';
          } else if (value.length > 1000) {
            error = 'Сообщение слишком длинное (максимум 1000 символов)';
          }
          break;
        
        default:
          break;
      }
      
      return error;
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    };

    const validateForm = () => {
      const newErrors = {
        name: validateField('name', formData.name),
        email: validateField('email', formData.email),
        message: validateField('message', formData.message)
      };
      
      setErrors(newErrors);
      
      return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setFormStatus({
        loading: true,
        success: false,
        error: ''
      });
      
      try {
        const response = await axios.post('', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200) {
          setFormStatus({
            loading: false,
            success: true,
            error: ''
          });
          
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          
          setTimeout(() => {
            setFormStatus(prev => ({
              ...prev,
              success: false
            }));
          }, 5000);
        } else {
          throw new Error(response.data.message || 'Ошибка при отправке формы');
        }
      } catch (error) {
        let errorMessage = 'Произошла ошибка при отправке формы';
        
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          errorMessage = 'Не удалось соединиться с сервером';
        }
        
        setFormStatus({
          loading: false,
          success: false,
          error: errorMessage
        });
      }
    };

  const teamMembers = [
    {
      name: "Владислав Лукьянов",
      role: "Тимлид",
    },
    {
      name: "Маркелов Ярослав",
      role: "Backend-разработчик",
    },
    {
        name: "Чернышкова Злата",
        role: "ML Engineer",
    },
    {
        name: "Солодова София",
        role: "Backend-разработчик, UI/UX-дизайнер",
    },
    {
        name: "Кондратенко Александр",
        role: "ML Engineer",
    },
    {
        name: "Ысаев Руслан",
        role: "Технический писатель, QA Engineer",
    },
    {
        name: "Кузин Антон",
        role: "Frontend-разработчик",
    },
    {
        name: "Подцыкин Валерий",
        role: "ML Engineer",
    },
    {
        name: "Матюшкин Роман",
        role: "Backend-разработчик",
    },
    {
        name: "Шмагин Никита",
        role: "Frontend-разработчик",
    },
  ];

  const timelineItems = [
    {
      year: "2024",
      title: "Старт проекта",
      description: "Определение целей и задач проекта,\
       выбор модели для обучения, определение стека технологий, \
       первый прототип сайта на html и css"
    },
    {
      year: "2025",
      title: "Продолжение разработки",
      description: "Переход сайта на react, доработка api бэкенда, \
       обучение модели, проблемы с переходом на новую модель и возвращение старой модели машинного обучения"
    },
  ];

  return (
    <div className={styles.page}>
        <Header />
        <div className={styles.aboutPage}>
        <Hero 
            title="О проекте Watercraft Detector"
        />

        <section className={styles.mission}>
            <h2>Наша миссия</h2>
            <p>
            Создание модели машинного обучения для автоматического
            обнаружения судов по спутниковым данным с целью контроля
            запретных зон
            </p>
        </section>

        <section className={styles.team}>
            <h2>Команда</h2>
            <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                <h3>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                </div>
            ))}
            </div>
        </section>

        <section className={styles.history}>
          <h2>История проекта</h2>
          <div 
            className={styles.timeline} 
            ref={timelineRef}
          >
            {timelineItems.map((item, index) => (
              <div 
                key={index} 
                className={styles.timelineItem}
                ref={setTimelineRef}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contact}>
          <h2>Связаться с нами</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? styles.inputError : ''}
              ></textarea>
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Отправка...
                </>
              ) : (
                'Отправить'
              )}
            </button>

            {formStatus.error && (
              <div className={styles.formMessageError}>
                {formStatus.error}
              </div>
            )}

            {formStatus.success && (
              <div className={styles.formMessageSuccess}>
                Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
              </div>
            )}
          </form>
        </section>
        </div>
        <Footer />
    </div>
  );
};

export default AboutPage;