#!/bin/bash

echo "🚀 Запуск iSpeech Helper Server..."

# Остановка предыдущих процессов
echo "⏹️ Остановка предыдущих процессов..."
pkill -f "node index.js" 2>/dev/null || true

# Ждем завершения процессов
sleep 2

# Проверяем, что порт свободен
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️ Порт 5000 все еще занят. Принудительно освобождаю..."
    lsof -ti :5000 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Запуск сервера
echo "✅ Запуск сервера на порту 5000..."
cd "$(dirname "$0")"
node index.js 