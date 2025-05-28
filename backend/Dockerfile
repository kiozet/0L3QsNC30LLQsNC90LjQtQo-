# Используем официальный образ Python
FROM python:3.10

# Устанавливаем переменные среды
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Создаем и переходим в рабочую директорию
WORKDIR /app

# Копируем только файлы зависимостей (для эффективного кэширования)
COPY pyproject.toml poetry.lock README.md ./

# Устанавливаем Poetry и зависимости
RUN pip install --upgrade pip && \
    pip install poetry gunicorn && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi --no-root

# Копируем весь проект (кроме файлов из .dockerignore)
COPY . .

# Собираем статику (если нужно)
RUN python manage.py collectstatic --noinput

# Открываем порт
EXPOSE 8000

# Команда для запуска сервера
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "photo_api.wsgi"]