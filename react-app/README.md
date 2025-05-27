# Watercraft Detector

**Сервис распознавания морской техники на спутниковых снимках**

![Главный интерфейс](public/images/screenshot1.png)

## 📌 Возможности

- Загрузка спутниковых изображений (JPG, PNG, TIFF)
- Автоматическое обнаружение судов
- Примеры результатов анализа
- Адаптивный интерфейс для всех устройств

## 🛠 Технологии

- **Frontend**: 
  ![React](https://img.shields.io/badge/React-19.0.0-blue)
  ![React Router](https://img.shields.io/badge/React_Router-7.4.0-orange)
  ![CSS Modules](https://img.shields.io/badge/CSS_Modules-✓-purple)

## 📂 Структура проекта

```
WatercraftDetector/
├── src/
│   ├── components/   # React-компоненты
│   ├── pages/        # Страницы приложения
│   ├── styles/       # Глобальные стили
│   └── App.js        # Корневой компонент
├── public/           # Статические файлы
└── package.json      # Зависимости
```
# Watercraft Detector 

WatercraftDetector — веб-приложение для обнаружения водного транспорта на спутниковых снимках с использованием React.

---

## 🚀 Быстрый старт

1. Установка зависимостей:

   npm install
   npm start

##📁 Структура проекта
WatercraftDetector/
├── src/
│   ├── components/      # React-компоненты (Header, Footer и др.)
│   ├── pages/           # Страницы приложения
│   ├── styles/          # Глобальные стили
│   └── App.js           # Корневой компонент
├── public/              # Статические файлы
└── package.json         # Зависимости и скрипты

##  🌐 Страницы

1. Главная (MainPage.jsx)
Загрузка изображений через FileUpload.

Примеры работ в компоненте Accordion.

Компоненты:

Hero — баннер с заголовком.

Accordion — раскрывающиеся блоки.

2. Авторизация (AuthPage.jsx)
Переключение между входом и регистрацией.

Валидация пароля.

3. О проекте (AboutPage.jsx)
Интерактивная временная шкала (анимация через Intersection Observer).

Карточки команды.

Форма обратной связи.

## 🛠 Технологии
React 19 (хуки, состояние)

React Router v7 (навигация)

CSS-модули (стилизация)

Testing Library (тесты)

## 📦 Зависимости
Список ключевых зависимостей (package.json):
`

json
   {
  "react": "^19.0.0",
  "react-router-dom": "^7.4.0",
  "@testing-library/react": "^16.2.0"
}

## 🎨 Стили
Глобальные стили: src/styles/global.css.

Модульные стили (например, AboutPage.module.css).

## 📌 Планы по улучшению

1. Интеграция с бэкендом (API для детекции).

2. Добавление Redux для управления состоянием.
