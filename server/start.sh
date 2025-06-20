#!/bin/bash

echo "🚀 Запуск iSpeech Helper Server..."

# Функция для остановки процессов на порту 5000
stop_server() {
    echo "🔍 Проверяем процессы на порту 5000..."
    PIDS=$(lsof -ti:5000)
    
    if [ ! -z "$PIDS" ]; then
        echo "⚠️ Найдены процессы на порту 5000: $PIDS"
        echo "🛑 Останавливаем предыдущие процессы..."
        kill -9 $PIDS
        sleep 2
        echo "✅ Процессы остановлены"
    else
        echo "✅ Порт 5000 свободен"
    fi
}

# Проверяем, что мы в папке server
if [ ! -f "index.js" ]; then
    echo "❌ Ошибка: Запустите скрипт из папки server"
    exit 1
fi

# Останавливаем предыдущие процессы
stop_server

# Запускаем сервер
echo "🚀 Запускаем сервер..."
node index.js 