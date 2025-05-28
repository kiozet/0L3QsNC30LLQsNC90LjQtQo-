import { useState } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FileUpload from '../components/FileUpload/FileUpload';
import Accordion from '../components/Accordion/Accordion';
import Footer from '../components/Footer/Footer';
import '../styles/global.css';

const MainPage = () => {
    const [activeExample, setActiveExample] = useState(null);

    const examples = [
        { 
            img: "example5.jpg", 
            alt: "Пример 1",
            description: "Снимок с двумя маленькими катерами"
        },
        { 
            img: "example2.jpg", 
            alt: "Пример 2",
            description: "Спутниковый снимок с торговым судном в открытом море"
        },
        { 
            img: "example3.jpg", 
            alt: "Пример 3",
            description: "Снимок с двумя торговыми суднами в открытом море"
        },
        { 
            img: "example4.jpg", 
            alt: "Пример 4",
            description: "Снимок с двумя маленькими катерами в открытом море"
        },
    ];

    const handleExampleClick = (index) => {
        setActiveExample(index === activeExample ? null : index);
    };

    const techDescription = `
    Наша система использует современные технологии компьютерного зрения и машинного обучения:
    - Модель на основе YOLOv5 для обнаружения судов
    - Django REST Framework для обработки запросов
    - React для интерактивного интерфейса
    
    Эти технологии были выбраны за их производительность, точность и удобство интеграции.
    `;

    return (
        <div className="page">
            <div className="container">
                <Header />
                <Hero />
                <div className="content__back">
                    <FileUpload />
                    <Accordion 
                        title="Примеры изображений для загрузки" 
                        content={examples} 
                        activeIndex={activeExample}
                        onItemClick={handleExampleClick}
                    />
                    <Accordion 
                        title="Технологии и принцип работы" 
                        content={techDescription} 
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;