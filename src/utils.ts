export const skills = [
  {
    name: 'Бег',
    levels: [
      { level: 1, description: 'Могу пробежать 1 км.', task: 'Пробежать 2 км.', resources: [''] },
      { level: 2, description: 'Могу пробежать 3 км.', task: 'Пробежать 5 км.', resources: [''] },
      { level: 3, description: 'Могу пробежать 5 км.', task: 'Пробежать 10 км.', resources: [''] },
    ],
  },
  {
    name: 'Кулинария',
    levels: [
      { level: 1, description: 'Могу приготовить омлет.', task: 'Приготовить пасту.', resources: [''] },
      { level: 2, description: 'Могу приготовить несколько блюд.', task: 'Приготовить сложный ужин.', resources: [''] },
      { level: 3, description: 'Могу готовить ужины для друзей.', task: 'Организовать ужин на 6 человек.', resources: [''] },
    ],
  },
  {
    name: 'Фронтенд разработка',
    levels: [
      {
        level: 1,
        description: 'Могу создавать базовые HTML-страницы.',
        task: 'Создать HTML-страницу с использованием основных тегов (h1, p, a, img, ul, li и т.д.).',
        resources: [
          'https://www.youtube.com/watch?v=Bmtu5eNnjK8', // Курс HTML и CSS от Dmitry Lavrik
          'https://htmlacademy.ru/', // HTML Academy: интерактивные курсы по HTML и CSS
          'https://metanit.com/web/html/1.1.php', // Основы HTML на Metanit
        ],
      },
      {
        level: 2,
        description: 'Знаком с базовыми HTML-тегами и их применением.',
        task: 'Создать страницу портфолио с использованием HTML, включающую заголовки, списки, изображения и ссылки.',
        resources: [
          'https://www.youtube.com/watch?v=67StpU01DRc', // Уроки по HTML от Гоши Дударя
          'https://itproger.com/course/html', // Курс по HTML от ItProger
          'https://learn.javascript.ru/html-elements', // Текстовый урок по HTML элементам на Learn JavaScript
        ],
      },
      {
        level: 3,
        description: 'Понимаю Flexbox и могу использовать его для создания макетов.',
        task: 'Создать макет страницы с тремя секциями (header, main, footer), используя Flexbox.',
        resources: [
          'https://www.youtube.com/watch?v=7xeIojg5uhE', // Видеоурок по Flexbox от LoftBlog
          'https://htmlacademy.ru/intensive/htmlcss', // Интенсив по Flexbox от HTML Academy
          'https://metanit.com/web/css/2.9.php', // Flexbox на Metanit
        ],
      },
      {
        level: 4,
        description: 'Умею добавлять кнопки и простые анимации в CSS.',
        task: 'Создать страницу с кнопкой, которая меняет цвет при наведении и имеет анимацию нажатия.',
        resources: [
          'https://www.youtube.com/watch?v=TpwpAYFi-2Y', // CSS-анимации от PurpleSchool
          'https://dmitrylavrik.ru/lessons/css-animations/', // Анимации в CSS от Дмитрия Лаврика
          'https://learn.javascript.ru/css-animations', // Анимации на Learn JavaScript
        ],
      },
      {
        level: 5,
        description: 'Знаю основы БЭМ, приоритет селекторов и как структурировать CSS-код.',
        task: 'Создать страницу с использованием БЭМ для стилизации карточек товара.',
        resources: [
          'https://www.youtube.com/watch?v=SLjHSVwXYq4', // Введение в БЭМ
          'https://htmlacademy.ru/blog/66-bem-methodology', // Статья HTML Academy о БЭМ
          'https://metanit.com/web/css/1.7.php', // Приоритет селекторов на Metanit
        ],
      },
      {
        level: 6,
        description: 'Понимаю, как работают CSS position и common pitfalls (велосипеды).',
        task: 'Создать макет страницы с фиксированным хедером и контентом, прокручивающимся под ним.',
        resources: [
          'https://www.youtube.com/watch?v=o-Fs5lRY98g', // Позиционирование в CSS от Dmitry Lavrik
          'https://itproger.com/course/css', // Курс CSS от ItProger
          'https://learn.javascript.ru/css-position', // Позиционирование на Learn JavaScript
        ],
      },
      {
        level: 7,
        description: 'Понимаю работу CSS-препроцессоров (Sass, Less).',
        task: 'Использовать Sass для создания переменных и миксинов, а затем применить их в проекте.',
        resources: [
          'https://www.youtube.com/watch?v=Zz6eOVaaelI', // Введение в Sass от PurpleSchool
          'https://htmlacademy.ru/intensive/css', // Интенсив по препроцессорам от HTML Academy
          'https://metanit.com/web/css/3.1.php', // Препроцессоры на Metanit
        ],
      },
      {
        level: 8,
        description: 'Умею создавать адаптивные страницы с использованием медиазапросов.',
        task: 'Создать адаптивную страницу с медиазапросами для различных устройств (мобильные, планшеты, десктопы).',
        resources: [
          'https://www.youtube.com/watch?v=srvUrASNj0s', // Адаптивная верстка от LectorWeb
          'https://stepik.org/course/3354', // Курс по адаптивной верстке на Stepik
          'https://metanit.com/web/css/2.8.php', // Адаптивная верстка на Metanit
        ],
      },
      {
        level: 9,
        description: 'Основы работы с Git для управления версиями.',
        task: 'Создать репозиторий на GitHub и загрузить туда проект с коммитами для каждой фазы разработки.',
        resources: [
          'https://www.youtube.com/watch?v=SWYqp7iY_Tc', // Видеоурок по Git от LoftBlog
          'https://ru.hexlet.io/courses/git', // Курс по Git от Hexlet
          'https://metanit.com/web/git/1.1.php', // Основы Git на Metanit
        ],
      },
      {
        level: 10,
        description: 'Основы JavaScript: переменные, типы данных и примеры использования.',
        task: 'Создать программу, которая выводит приветствие на основе введенного имени пользователя.',
        resources: [
          'https://www.youtube.com/watch?v=GFNiEfWlF2o', // Видеоурок по JavaScript от Гоши Дударя
          'https://javascript.ru/manual', // Текстовый ресурс по JavaScript
          'https://learn.javascript.ru/variables', // Урок о переменных на Learn JavaScript
        ],
      },
      {
        level: 11,
        description: 'Понимаю условные операторы и циклы в JavaScript.',
        task: 'Создать программу, которая выводит четные числа от 1 до 20 с использованием цикла.',
        resources: [
          'https://www.youtube.com/watch?v=jS4aFq5-91M', // JavaScript основы от LoftBlog
          'https://learn.javascript.ru/ifelse', // Условные операторы на Learn JavaScript
          'https://metanit.com/web/javascript/2.3.php', // Операторы и циклы на Metanit
        ],
      },
      {
        level: 12,
        description: 'Знаком с функциями и их применением в JavaScript.',
        task: 'Создать функцию, которая вычисляет факториал числа.',
        resources: [
          'https://www.youtube.com/watch?v=WOZ_jCKbRys', // Видео по функциям от Frontend Development
          'https://learn.javascript.ru/function-basics', // Основы функций на Learn JavaScript
          'https://metanit.com/web/javascript/2.7.php', // Функции на Metanit
        ],
      },
      {
        level: 13,
        description: 'Понимаю работу с объектами в JavaScript.',
        task: 'Создать объект пользователя с полями имя, возраст и методами приветствия.',
        resources: [
          'https://www.youtube.com/watch?v=Z_aZfOaLoA4', // Видео по объектам в JavaScript
          'https://learn.javascript.ru/object', // Объекты на Learn JavaScript
          'https://metanit.com/web/javascript/3.1.php', // Работа с объектами на Metanit
        ],
      },
      {
        level: 14,
        description: 'Знаю, как копировать объекты и работать с прототипами.',
        task: 'Написать функцию для глубокого копирования объекта.',
        resources: [
          'https://javascript.ru/clone', // Клонирование объектов на JavaScript.ru
          'https://www.youtube.com/watch?v=yyUHQIec83I', // Видео о глубоких копиях и прототипах
          'https://metanit.com/web/javascript/4.4.php', // Прототипы на Metanit
        ],
      },
      {
        level: 15,
        description: 'Понимаю массивы и методы работы с ними.',
        task: 'Создать программу, которая фильтрует массив чисел и возвращает только положительные числа.',
        resources: [
          'https://www.youtube.com/watch?v=do3a2tmlabw', // Видео по основам массивов в JavaScript
          'https://learn.javascript.ru/array', // Массивы на Learn JavaScript
          'https://metanit.com/web/javascript/2.9.php', // Методы массивов на Metanit
        ],
      },
      {
        level: 16,
        description: 'Знаком с замыканиями и их использованием в JavaScript.',
        task: 'Написать функцию-счетчик с использованием замыкания.',
        resources: [
          'https://www.youtube.com/watch?v=1JsJx1x35c0', // Видео по замыканиям
          'https://learn.javascript.ru/closure', // Замыкания на Learn JavaScript
          'https://metanit.com/web/javascript/3.4.php', // Замыкания на Metanit
        ],
      },
      {
        level: 17,
        description: 'Знаю основы работы с промисами и их цепочками.',
        task: 'Создать функцию, которая выполняет запрос на API и обрабатывает результат с использованием промисов.',
        resources: [
          'https://www.youtube.com/watch?v=DHvZLI7Db8E', // Видео о промисах в JavaScript
          'https://learn.javascript.ru/promise-basics', // Основы промисов на Learn JavaScript
          'https://metanit.com/web/javascript/5.4.php', // Промисы на Metanit
        ],
      },
      {
        level: 18,
        description: 'Понимаю различие между микро- и макрозадачами в JavaScript.',
        task: 'Создать программу, которая использует setTimeout и демонстрирует разницу между микро- и макрозадачами.',
        resources: [
          'https://www.youtube.com/watch?v=8aGhZQkoFbQ', // Видео о микро- и макрозадачах
          'https://learn.javascript.ru/event-loop', // Event Loop на Learn JavaScript
          'https://metanit.com/web/javascript/6.1.php', // Асинхронность и Event Loop на Metanit
        ],
      },
      {
        level: 19,
        description: 'Знаком с работой с DOM и событиями в JavaScript.',
        task: 'Создать программу, которая изменяет содержимое HTML-элемента по клику.',
        resources: [
          'https://www.youtube.com/watch?v=0ik6X4DJKCc', // Видео о работе с DOM
          'https://learn.javascript.ru/dom-nodes', // Основы DOM на Learn JavaScript
          'https://metanit.com/web/javascript/7.1.php', // Работа с DOM на Metanit
        ],
      },
      {
        level: 20,
        description: 'Понимаю рекурсию и структуру стэка вызовов.',
        task: 'Создать функцию, которая вычисляет сумму чисел в массиве с использованием рекурсии.',
        resources: [
          'https://www.youtube.com/watch?v=k7-N8R0-KY4', // Видео о рекурсии
          'https://learn.javascript.ru/recursion', // Рекурсия на Learn JavaScript
          'https://metanit.com/web/javascript/8.2.php', // Рекурсия и стек вызовов на Metanit
        ],
      },
      {
        level: 21,
        description: 'Понимаю основы классов в JavaScript и их применение.',
        task: 'Создать класс "Товар" с полями и методами для отображения информации о товаре.',
        resources: [
          'https://www.youtube.com/watch?v=PFmuCDHHpwk', // Видео о классах в JavaScript
          'https://learn.javascript.ru/class', // Классы на Learn JavaScript
          'https://metanit.com/web/javascript/9.1.php', // Классы и их применение на Metanit
        ],
      },
      {
        level: 22,
        description: 'Знаком с основами браузерного окружения и API.',
        task: 'Создать программу, которая определяет текущий размер окна браузера и выводит его.',
        resources: [
          'https://www.youtube.com/watch?v=H8o3Zfrs3Mo', // Видео о браузерном окружении
          'https://learn.javascript.ru/browser-environment', // Браузерное окружение на Learn JavaScript
          'https://metanit.com/web/javascript/10.1.php', // Браузерное окружение и API на Metanit
        ],
      },
      {
        level: 23,
        description: 'Понимаю принципы модульности в JavaScript.',
        task: 'Создать модуль, который экспортирует функцию и импортировать её в другой файл.',
        resources: [
          'https://www.youtube.com/watch?v=cRHQNNcYf6s', // Видео о модулях в JavaScript
          'https://learn.javascript.ru/modules-intro', // Введение в модули на Learn JavaScript
          'https://metanit.com/web/javascript/11.1.php', // Модули и их использование на Metanit
        ],
      },
    ],
  },
];
