# Описание

Сайт умеет дергать апи гитхаба для получения информации по пользователю
Еще мы собираем статистику, которую поможно найти на странице `/stats`

# Pages
### Index
Здесь формочка запроса на получение информации по пользователю.
Собирается информация по времени загрузки данных

### Stats
Выводятся данные в сыром виде
В консоли выводятся данные по всем метрикам
- `connect` - время соединения с сервером
- `ttfb` - Time To First Byte (время до получения первого байта) - показатель задержки в передаче данных между браузером и сервером.
- `FCP` - (First contentful paint) измеряет время с момента начала загрузки страницы до момента, когда какая-либо часть содержимого страницы отобразится на экране.
- `LCP` - (Largest Contentful Paint) ориентированный на пользователя показатель для измерения воспринимаемой скорости загрузки.
- `FID` - (First Input Delay) - время ожидания до первого взаимодействия с контентом 