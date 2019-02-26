# dev guide

Liquid:

### Переменные страницы: 
 
- `includesCss` - массив с `css` файлами, которые добавятся в файл `css` страницы. Добавлять с помощью фильтра `includesCss` {{ '' | includesCss }}. Только для компонентов из `_includes/` 

- title - название страницы
- cssMain - css класс, добавить на <body><main class="... {{ cssMain }}">  

- yandexMetrika  @default true метрика YA на странице


подключение файла стилей и скриптов.
- cssUrls: Array<String>
- jsUrls: Array<String>

пример добавления: 
{{ '/css/a_base.css' | makeUrl | addVarToPage:'cssUrls' | void }}
{{ '/js/a_base.js' | makeUrl | addVarToPage:'jsUrls' | void }}


### _includes
директороия с компонентами  
сокращенные названия файлов: `c.ccs, h.html, j.js`


### --
data-src=""
смотри js/adapt_imgs.js



---

позиция дочернего компонента:
выравнивание
отступы
положение, если расположен не в потоке

---
размеры дочернего компонента:
задается контейнером, в котором располагается компонент, или передав css


---
css общие назание стилей
description описание, рядом с картинкой
figure картинка
sign подпись под картинкой /





