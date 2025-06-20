#!/bin/bash

echo "🔍 Проверка статуса iSpeech Helper Server..."

# Проверяем локальный сервер
echo "📍 Локальный сервер (localhost:5000):"
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Локальный сервер работает"
    curl -s http://localhost:5000/health | jq . 2>/dev/null || curl -s http://localhost:5000/health
else
    echo "❌ Локальный сервер недоступен"
    
    # Проверяем процессы на порту 5000
    PIDS=$(lsof -ti:5000 2>/dev/null)
    if [ ! -z "$PIDS" ]; then
        echo "⚠️ Процессы на порту 5000: $PIDS"
    else
        echo "ℹ️ Порт 5000 свободен"
    fi
fi

echo ""

# Проверяем продакшн сервер
echo "🌍 Продакшн сервер (ispeech-server.vercel.app):"
if curl -s https://ispeech-server.vercel.app/health > /dev/null 2>&1; then
    echo "✅ Продакшн сервер работает"
    curl -s https://ispeech-server.vercel.app/health | jq . 2>/dev/null || curl -s https://ispeech-server.vercel.app/health
else
    echo "❌ Продакшн сервер недоступен"
fi

echo ""

# Проверяем CORS для trial API
echo "🔒 Проверка CORS для trial API:"
if curl -s -H "Origin: https://i-speech-helper-uce4.vercel.app" https://ispeech-server.vercel.app/api/trial/status/691085183?lang=ru > /dev/null 2>&1; then
    echo "✅ CORS работает"
else
    echo "❌ CORS не работает"
fi
