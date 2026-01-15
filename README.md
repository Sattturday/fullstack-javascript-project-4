### Статус проверок

Hexlet tests, CI и качество кода:

[![Actions Status](https://github.com/Sattturday/fullstack-javascript-project-4/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Sattturday/fullstack-javascript-project-4/actions)
[![Node CI](https://github.com/Sattturday/fullstack-javascript-project-4/actions/workflows/ci.yml/badge.svg)](https://github.com/Sattturday/fullstack-javascript-project-4/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Sattturday_fullstack-javascript-project-4&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Sattturday_fullstack-javascript-project-4)

## Page Loader

Утилита командной строки для скачивания HTML-страниц и сохранения их в файловую систему.

### Установка

```
git clone git@github.com:Sattturday/fullstack-javascript-project-4.git
cd fullstack-javascript-project-4
npm install
npm link
```

### Использование

```
page-loader https://ru.hexlet.io/courses
```

Или с указанием директории:

```bash
page-loader --output /var/tmp https://ru.hexlet.io/courses
```

Результат:

```
/var/tmp/ru-hexlet-io-courses.html
```

### Как формируется имя файла

* Берётся URL без протокола
* Все символы, кроме букв и цифр, заменяются на `-`
* В конце добавляется `.html`

Пример:

```
https://ru.hexlet.io/courses → ru-hexlet-io-courses.html
```

### Демонстрация работы

[![asciinema](https://asciinema.org/a/RMOBLs3SmEcM2ONU.svg)](https://asciinema.org/a/RMOBLs3SmEcM2ONU)



