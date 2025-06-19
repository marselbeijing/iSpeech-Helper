# 🚀 Оптимизация Brave Browser для максимальной скорости

## ⚡ Основные настройки:

### 1. **Shields & Privacy**
- `brave://settings/shields` → Отключить "Block trackers & ads" для localhost
- Отключить "Block scripts" для разработки
- Установить "Block fingerprinting" в "Standard"

### 2. **Производительность**
- `brave://settings/system` → Включить "Use hardware acceleration when available"
- Включить "Continue running background apps when Brave is closed"
- Отключить "Startup boost" если не нужен

### 3. **Память и процессы**
- `brave://settings/system` → Ограничить "Memory Saver" или отключить для разработки
- В `brave://flags/` найти "Memory Saver" и установить "Disabled"

### 4. **Экспериментальные флаги** (`brave://flags/`):
```
#enable-quic → Enabled
#enable-experimental-web-platform-features → Enabled  
#enable-gpu-rasterization → Enabled
#enable-zero-copy → Enabled
#enable-features → VaapiVideoDecoder,VaapiVideoEncoder
#disable-features → UseChromeOSDirectVideoDecoder
```

### 5. **Очистка данных**:
- `brave://settings/clearBrowserData` → Очистить кэш
- Очистить "Cookies and other site data"
- Очистить "Browsing history"

### 6. **Расширения**:
- Отключить неиспользуемые расширения
- Оставить только необходимые для разработки

## 🔧 Специально для разработки:

### DevTools оптимизация:
- F12 → Settings → Preferences → Disable cache (while DevTools is open)
- Network → Disable cache
- Performance → Enable "Disable JavaScript"

### Localhost настройки:
- Добавить `127.0.0.1 localhost` в /etc/hosts
- Использовать HTTP вместо HTTPS для локальной разработки

## 🚀 Команды для терминала:
```bash
# Запуск Brave с оптимизированными флагами
/Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --enable-gpu-rasterization \
  --enable-zero-copy \
  --max_old_space_size=8192
```

## ⚠️ Важно:
- Перезапустить браузер после изменения флагов
- Некоторые настройки могут влиять на безопасность
- Использовать только для разработки 