# Стартовая сборка проекта

## Команды
> gulp
- Активная работа (режим development с запуском сервера)

> gulp dev
- Разовая сборка (режим development)

> gulp prod
- Разовая сборка (режим production с оптимизацией картинок)

> gulp backend
- Разовая сборка (режим backend с оптимизацией картинок, но без минификации и sourcemap)

> gulp post
- Объединение файлов (объединяет все скрипты и стили, полученные в результате сборки, в файлы general и vendor, после объединения необходимо в ручную поправить пути к файлам в шаблонах)

### Обрабатываемые файлы
- Основные настройки путей и подключение дополнительных библиотек в файле "gulp/config.js"

1. Шаблоны в формате ".pug", распределяются по папкам исходя из названия файла

> "src/templates/pages/index.pug" (только для "index.pug") -> "public/index.html"

> "src/templates/pages/[file-name].pug" (все файлы, кроме "index.pug") -> "public/[file-name]/index.html"

> "src/templates/ajax/[file-name].pug" -> "public/ajax/[file-name].html"

2. Стили в формате ".scss" (src/styles)

3. Скрипты в формате ".js" (src/scripts)

4. Шрифты (src/statical/fonts)

5. Иконки (src/statical/icons)

6. Изображения (src/statical/images)

7. SVG иконки (src/statical/svg)

8. Видеоролики (src/statical/videos)