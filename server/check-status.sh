#!/bin/bash

echo "🔍 Проверка статуса iSpeech Helper Server..."

# Проверяем процессы
echo "📊 Запущенные процессы Node.js:"
ps aux | grep "node index.js" | grep -v grep || echo "❌ Процесс не найден"

echo ""

# Проверяем порт
echo "🌐 Статус порта 5000:"
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Порт 5000 занят"
    lsof -Pi :5000 -sTCP:LISTEN
else
    echo "❌ Порт 5000 свободен"
fi

echo ""

# Проверяем health endpoint
echo "🏥 Health check:"
curl -s http://localhost:5000/health | python3 -m json.tool 2>/dev/null || echo "❌ Сервер не отвечает"
