# TG Analytics Setup для iSpeech Helper

## 🚨 Текущий статус: ОТКЛЮЧЕНО (ошибки сервера)

TG Analytics отключен из-за постоянных ошибок 400 на стороне сервера `tganalytics.xyz`.

## ❌ Выявленная проблема:

Несмотря на использование **официального SDK Auth token** от @DataChief_bot, сервер TG Analytics возвращает:
```
POST https://tganalytics.xyz/events 400 (Bad Request)
```

## 🔍 Проведенная диагностика:

✅ **Токен проверен**: Используется официальный SDK Auth token  
✅ **Формат проверен**: Инициализация согласно документации  
✅ **Окружение проверено**: Telegram WebApp данные доступны  
❌ **Сервер**: Возвращает 400 ошибку при отправке событий  

## 🛠️ Реализованные защиты:

1. **Автоматическое отключение** при ошибках 400
2. **Детальное логирование** для диагностики
3. **Быстрое отключение** через флаг `DISABLE_TG_ANALYTICS = true`
4. **Мониторинг сети** для отслеживания запросов

## 📋 Официальные данные (проверены):

- **Analytics identifier**: `ispeech_helper_analytics`
- **SDK Auth token**: `eyJhcHBfbmFtZSI6ImlzcGVlY2hfaGVscGVyX2FuYWx5dGljcyIsImFwcF91cmwiOiJodHRwczovL3QubWUvaVNwZWVjaEhlbHBlcl9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9pLXNwZWVjaC1oZWxwZXItdWNlNC52ZXJjZWwuYXBwIn0=!j9+Ln94Vror//YszMapC2bBcM7JNJ3tyOVLFnAUI7xg=`
- **Domain**: `https://i-speech-helper-uce4.vercel.app`
- **Bot URL**: `https://t.me/iSpeechHelper_bot`

## ✅ Приложение готово к модерации:

Приложение **полностью функционально** без TG Analytics:
- ✅ Все основные функции работают
- ✅ TON Connect интегрирован
- ✅ Telegram WebApp API используется
- ✅ Нет критичных ошибок в консоли

## 🔄 Для будущего включения:

1. **Обратиться к модератору** с детальными логами ошибок
2. **Выяснить причину** ошибок 400 на сервере TG Analytics
3. **Изменить флаг**: `DISABLE_TG_ANALYTICS = false` в `public/index.html`
4. **Пересобрать и задеплоить** приложение

## 📞 Рекомендация:

**Подавать приложение на модерацию БЕЗ TG Analytics** - оно не является обязательным требованием, а приложение полностью функционально. 