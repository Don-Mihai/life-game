import * as process from 'node:process';

export const URL = process.env.REACT_APP_BACK_URL || 'http://localhost:5000/';

// Вспомогательная функция для преобразования уровня в формат Editor.js
export const convertToEditorDescription = (level: any) => {
  const blocks = [
    {
      id: `header_${Date.now()}`,
      type: 'header',
      data: {
        text: level.description || 'Описание отсутствует',
        level: 2
      }
    },
    {
      id: `paragraph_${Date.now()}`,
      type: 'paragraph',
      data: {
        text: level.task || 'Задача отсутствует'
      }
    },
    {
      id: `resources_${Date.now()}`,
      type: 'list',
      data: {
        style: 'unordered',
        meta: {},
        items: (level.resources || []).map((resource: any) => ({
          content: resource,
          meta: {},
          items: []
        }))
      }
    }
  ];

  return JSON.stringify({
    time: Date.now(),
    blocks,
    version: '2.30.7'
  });
};

export const skills = [
  {
    id: '1',
    name: 'Бразильское джиу-джитсу',
    levels: [
      {
        description: 'Основы бразильского джиу-джитсу: базовые движения, стойки и понятие о позиции гард.',
        task: 'Изучить базовые позиции (mount, guard, side control) и движения (shrimping, bridging) в джиу-джитсу.',
        resources: 'https://www.youtube.com/watch?v=9g8VcuQ8fLg, https://www.grapplearts.com/beginning-bjj-guide/, https://bjjfanatics.com/'
      },
      {
        description: 'Позиционная работа и базовые приемы из гарда (закрытый гард, открытый гард).',
        task: 'Отработать выходы из закрытого гарда и базовые приемы (armbar, triangle choke) с партнером.',
        resources:
          'https://www.youtube.com/watch?v=FRdoOJxE2xE, https://www.bjjheroes.com/bjj-news/basic-bjj-techniques, https://bjjfanatics.com/collections/all/products/the-closed-guard-system-by-john-danaher'
      },
      {
        description: 'Основы проходов гарда и удержание позиций.',
        task: 'Изучить и отработать несколько проходов гарда (knee slide, torreando pass) и удержание в side control.',
        resources:
          'https://www.youtube.com/watch?v=yGsfOnMgF5w, https://grapplersguide.com/, https://bjjfanatics.com/collections/all/products/effective-passing-from-every-position-by-gordon-ryan'
      },
      {
        description: 'Переходы между позициями и работа из бокового контроля (side control).',
        task: 'Отработать переходы из side control в mount и north-south, а также базовые приемы из этих позиций.',
        resources:
          'https://www.youtube.com/watch?v=nvSBy8blFS0, https://www.grapplearts.com/the-ultimate-guide-to-side-control/, https://bjjfanatics.com/collections/all/products/smashed-side-control-system-by-tom-deblass'
      },
      {
        description: 'Атаки и защиты в mount и back control.',
        task: 'Изучить и отработать атаки из mount (americana, cross choke) и контроль спины (back take, rear-naked choke).',
        resources:
          'https://www.youtube.com/watch?v=ikG11PU6nTA, https://www.bjjheroes.com/techniques/bjj-submissions-from-the-mount, https://bjjfanatics.com/collections/all/products/back-attack-system-by-john-danaher'
      },
      {
        description: 'Работа из открытого гарда и концепции контратаки.',
        task: 'Изучить и практиковать удержание и атаки из De La Riva guard и spider guard, а также основные контрприемы.',
        resources:
          'https://www.youtube.com/watch?v=dY2CzY1H1Gg, https://www.bjjheroes.com/techniques/open-guard-techniques, https://bjjfanatics.com/collections/all/products/open-guard-systems-by-marcelo-garcia'
      },
      {
        description: 'Развитие навыков sweeps и reversals (перевороты и смена позиций).',
        task: 'Отработать несколько переворотов из гарда (scissor sweep, butterfly sweep) и контрприемы.',
        resources:
          'https://www.youtube.com/watch?v=ZWROGHQVybo, https://grapplersguide.com/, https://bjjfanatics.com/collections/all/products/the-butterfly-guard-system-by-gordon-ryan'
      },
      {
        description: 'Контроль и атаки с верхних позиций (half guard, knee on belly).',
        task: 'Изучить контроль и субмиссии из half guard и knee on belly (kimura, knee bar).',
        resources:
          'https://www.youtube.com/watch?v=HZ7tnITdS_g, https://www.grapplearts.com/the-complete-guide-to-knee-on-belly/, https://bjjfanatics.com/collections/all/products/half-guard-sweeps-and-attacks-by-craig-jones'
      },
      {
        description: 'Углубленное изучение концепций и стратегии соревнований.',
        task: 'Изучить стратегии управления временем и энергии в спаррингах и соревнованиях, тренировать адаптацию техники под соперника.',
        resources:
          'https://www.youtube.com/watch?v=YmzU4yZ33rc, https://bjjheroes.com/bjj-news/tips-for-bjj-competitors, https://bjjfanatics.com/collections/all/products/competition-strategies-by-buchecha'
      },
      {
        description: 'Применение техник и адаптация стратегии в свободных спаррингах.',
        task: 'Проводить спарринги с партнерами разного уровня, применяя техники и адаптируя стратегии в зависимости от ситуации.',
        resources:
          'https://www.youtube.com/watch?v=5hIKFLEzcyA, https://bjjfanatics.com/collections/all/products/free-rolling-techniques-by-andre-galvao, https://www.grapplearts.com/rolling-strategies/'
      }
    ]
  },
  {
    id: '2',
    name: 'Проектное управление',
    levels: [
      {
        description: 'Основы проектного управления: понимание жизненного цикла проекта и основных терминов.',
        task: 'Изучить основы жизненного цикла проекта и подготовить базовый план для небольшого проекта (например, создание сайта).',
        resources: 'https://www.coursera.org/learn/project-management, https://www.pmi.org/, https://www.udemy.com/course/project-management-fundamentals/'
      },
      {
        description: 'Планирование и создание дорожной карты проекта.',
        task: 'Создать дорожную карту для проекта, включающую основные этапы и сроки выполнения задач.',
        resources:
          'https://www.smartsheet.com/project-management-roadmap, https://www.udemy.com/course/learn-to-create-project-roadmaps/, https://www.atlassian.com/project-management'
      },
      {
        description: 'Определение требований и работа с заинтересованными сторонами.',
        task: 'Провести встречу с клиентом и составить список требований для проекта.',
        resources:
          'https://www.coursera.org/learn/requirements-management, https://www.udemy.com/course/business-analyst-essentials-skills/, https://www.atlassian.com/work-management/stakeholder-analysis'
      },
      {
        description: 'Создание бюджета и оценка рисков проекта.',
        task: 'Составить бюджет проекта и провести оценку рисков с использованием SWOT-анализа.',
        resources:
          'https://www.udemy.com/course/project-budgeting/, https://www.pmi.org/learning/library/project-risk-analysis-assessment-steps-6334, https://www.coursera.org/learn/risk-management'
      },
      {
        description: 'Управление командой и делегирование задач.',
        task: 'Организовать работу команды и распределить задачи среди участников проекта.',
        resources:
          'https://www.udemy.com/course/team-management-skills/, https://www.coursera.org/learn/leadership-and-management, https://www.atlassian.com/team-playbook'
      },
      {
        description: 'Управление сроками и ресурсами проекта.',
        task: 'Создать план управления ресурсами и график выполнения задач для проекта с использованием Gantt-диаграммы.',
        resources:
          'https://www.smartsheet.com/how-to-create-gantt-chart, https://www.udemy.com/course/time-management-and-planning/, https://asana.com/guide/team/timelines'
      },
      {
        description: 'Мониторинг и контроль выполнения проекта.',
        task: 'Отслеживать выполнение задач и обновлять статус проекта с использованием трекинговой системы (например, Jira или Trello).',
        resources:
          'https://www.udemy.com/course/jira-tutorial-for-beginners/, https://www.atlassian.com/software/jira, https://www.coursera.org/learn/monitoring-and-evaluation'
      },
      {
        description: 'Управление изменениями в проекте и адаптация плана.',
        task: 'Внедрить изменения в проектный план на основе новых требований клиента и оценить их влияние на бюджет и сроки.',
        resources:
          'https://www.pmi.org/learning/library/change-management-best-practices-5789, https://www.udemy.com/course/change-management/, https://www.coursera.org/learn/change-management-foundations'
      },
      {
        description: 'Закрытие проекта и подведение итогов.',
        task: 'Подготовить финальный отчет и провести встречу с командой и клиентом для подведения итогов проекта.',
        resources:
          'https://www.udemy.com/course/project-closure/, https://www.coursera.org/learn/project-closure, https://www.pmi.org/learning/library/project-closure-checklist-7215'
      },
      {
        description: 'Стратегическое управление портфелем проектов и управление несколькими проектами одновременно.',
        task: 'Управлять несколькими проектами, включая распределение ресурсов и приоритетизацию задач на уровне портфеля.',
        resources:
          'https://www.udemy.com/course/portfolio-management/, https://www.coursera.org/learn/program-project-portfolio-management, https://asana.com/resources/project-portfolio-management'
      },
      {
        description: '',
        task: '',
        completed: false
      }
    ]
  },
  {
    id: '3',
    name: 'Преподавание и наставничество в IT сфере',
    levels: [
      {
        description: 'Основы преподавания: понимание базовых принципов передачи знаний и структуры уроков.',
        task: 'Подготовить и провести занятие по основам HTML для группы новичков.',
        resources:
          'https://www.coursera.org/learn/teaching, https://www.skillshare.com/en/classes/Teaching-Techniques-Creating-Lessons-That-Engage-Learn/688003125, https://www.ted.com/playlists/86/talks_from_inspiring_teachers'
      },
      {
        description: 'Разработка учебных материалов и структурирование уроков.',
        task: 'Создать учебный план и материалы для курса по основам CSS (презентации, задания).',
        resources: 'https://www.canva.com/, https://www.coursera.org/learn/instructional-design, https://htmlacademy.ru/'
      },
      {
        description: 'Управление группой и взаимодействие с аудиторией.',
        task: 'Провести занятие с группой студентов, организовать дискуссию и групповую активность.',
        resources:
          'https://www.coursera.org/learn/classroom-management, https://www.udemy.com/course/public-speaking-masterclass/, https://www.skillshare.com/en/classes/How-to-Teach-Public-Speaking-and-Group-Dynamics/1468381325'
      },
      {
        description: 'Индивидуальное наставничество и создание индивидуальных учебных планов.',
        task: 'Провести индивидуальные занятия с несколькими студентами, адаптируя материалы под их уровень.',
        resources:
          'https://www.udemy.com/course/life-coach-training-course/, https://www.coursera.org/learn/coaching-skills, https://www.edx.org/course/mentoring-new-teachers'
      },
      {
        description: 'Разработка учебных программ и курсов, включая цели и контрольные точки.',
        task: 'Создать учебную программу для курса по основам JavaScript для начинающих.',
        resources:
          'https://www.skillshare.com/en/classes/Instructional-Design-Training-How-to-Build-Effective-Courses/1980846374, https://www.udemy.com/course/creating-an-online-course/, https://learn.javascript.ru/'
      },
      {
        description: 'Введение инновационных методик обучения и оценка их эффективности.',
        task: 'Внедрить геймификацию в текущий курс и провести опрос студентов для оценки результатов.',
        resources:
          'https://www.coursera.org/learn/gamification, https://www.edx.org/course/learning-analytics-fundamentals, https://www.udemy.com/course/teaching-with-techniques-how-to-create-engaging-lessons/'
      },
      {
        description: 'Проведение мастер-классов и публичных выступлений.',
        task: 'Организовать и провести мастер-класс по верстке адаптивного дизайна для аудитории из 50+ человек.',
        resources:
          'https://www.udemy.com/course/presentation-skills-secrets/, https://www.ted.com/talks, https://www.skillshare.com/en/classes/Public-Speaking-Master-Class-How-to-Deliver-Your-Message-with-Confidence-and-Impact/1161811242'
      },
      {
        description: 'Наставничество и развитие других преподавателей.',
        task: 'Наставлять нового преподавателя, помогая ему подготовить и провести курс по веб-разработке.',
        resources:
          'https://www.edx.org/course/mentoring-teachers, https://www.coursera.org/learn/leadership-skills, https://www.skillshare.com/en/classes/Becoming-a-Better-Mentor/232193071'
      },
      {
        description: 'Разработка уникальных и актуальных учебных программ.',
        task: 'Создать курс по современным фронтенд-фреймворкам (React, Vue.js) и включить проекты для практики.',
        resources:
          'https://www.udemy.com/course/react-the-complete-guide/, https://vuejs.org/v2/guide/, https://www.coursera.org/learn/programming-fundamentals'
      },
      {
        description: 'Стратегическое планирование обучения и руководство проектами в образовательной сфере.',
        task: 'Организовать образовательную программу для команды разработчиков внутри компании.',
        resources:
          'https://www.coursera.org/learn/learning-how-to-learn, https://www.udemy.com/course/educational-leadership-training/, https://www.edx.org/course/educational-leadership-and-management'
      },
      {
        description: '',
        task: '',
        completed: false
      }
    ]
  },
  {
    id: '4',
    name: 'Фронтенд разработка',
    levels: [
      {
        description: 'Могу создавать базовые HTML-страницы.',
        task: 'Создать HTML-страницу с использованием основных тегов (h1, p, a, img, ul, li и т.д.).',
        resources: 'https://www.youtube.com/watch?v=Bmtu5eNnjK8, https://htmlacademy.ru/, https://metanit.com/web/html/1.1.php',
        completed: true
      },
      {
        description: 'Знаком с базовыми HTML-тегами и их применением.',
        task: 'Создать страницу портфолио с использованием HTML, включающую заголовки, списки, изображения и ссылки.',
        resources: 'https://www.youtube.com/watch?v=67StpU01DRc, https://itproger.com/course/html, https://learn.javascript.ru/html-elements',
        completed: true
      },
      {
        description: 'Понимаю Flexbox и могу использовать его для создания макетов.',
        task: 'Создать макет страницы с тремя секциями (header, main, footer), используя Flexbox.',
        resources: 'https://www.youtube.com/watch?v=7xeIojg5uhE, https://htmlacademy.ru/intensive/htmlcss, https://metanit.com/web/css/2.9.php',
        completed: true
      },
      {
        description: 'Умею добавлять кнопки и простые анимации в CSS.',
        task: 'Создать страницу с кнопкой, которая меняет цвет при наведении и имеет анимацию нажатия.',
        resources: 'https://www.youtube.com/watch?v=TpwpAYFi-2Y, https://dmitrylavrik.ru/lessons/css-animations/, https://learn.javascript.ru/css-animations',
        completed: true
      },
      {
        description: 'Знаю основы БЭМ, приоритет селекторов и как структурировать CSS-код.',
        task: 'Создать страницу с использованием БЭМ для стилизации карточек товара.',
        resources: 'https://www.youtube.com/watch?v=SLjHSVwXYq4, https://htmlacademy.ru/blog/66-bem-methodology, https://metanit.com/web/css/1.7.php',
        completed: true
      },
      {
        description: 'Понимаю, как работают CSS position и common pitfalls (велосипеды).',
        task: 'Создать макет страницы с фиксированным хедером и контентом, прокручивающимся под ним.',
        resources: 'https://www.youtube.com/watch?v=o-Fs5lRY98g, https://itproger.com/course/css, https://learn.javascript.ru/css-position',
        completed: true
      },
      {
        description: 'Понимаю работу CSS-препроцессоров (Sass, Less).',
        task: 'Использовать Sass для создания переменных и миксинов, а затем применить их в проекте.',
        resources: 'https://www.youtube.com/watch?v=Zz6eOVaaelI, https://htmlacademy.ru/intensive/css, https://metanit.com/web/css/3.1.php',
        completed: true
      },
      {
        description: 'Умею создавать адаптивные страницы с использованием медиазапросов.',
        task: 'Создать адаптивную страницу с медиазапросами для различных устройств (мобильные, планшеты, десктопы).',
        resources: 'https://www.youtube.com/watch?v=srvUrASNj0s, https://stepik.org/course/3354, https://metanit.com/web/css/2.8.php'
      },
      {
        description: 'Основы работы с Git для управления версиями.',
        task: 'Создать репозиторий на GitHub и загрузить туда проект с коммитами для каждой фазы разработки.',
        resources: 'https://www.youtube.com/watch?v=SWYqp7iY_Tc, https://ru.hexlet.io/courses/git, https://metanit.com/web/git/1.1.php'
      },
      {
        description: 'Основы JavaScript: переменные, типы данных и примеры использования.',
        task: 'Создать программу, которая выводит приветствие на основе введенного имени пользователя.',
        resources: 'https://www.youtube.com/watch?v=GFNiEfWlF2o, https://javascript.ru/manual, https://learn.javascript.ru/variables'
      }
    ]
  }
];
