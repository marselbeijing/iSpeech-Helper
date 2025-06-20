#!/bin/bash

echo "🚀 Деплой сервера на Vercel..."

# Проверяем, что мы в папке server
if [ ! -f "index.js" ]; then
    echo "❌ Ошибка: Запустите скрипт из папки server"
    exit 1
fi

# Деплой на Vercel
vercel --prod

echo "✅ Деплой завершен!"
echo "🔗 Проверьте статус: https://ispeech-server.vercel.app/health" 