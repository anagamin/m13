export interface ProofItem {
  id: string
  type: 'video' | 'audio'
  title: string
  subtitle: string
  duration: string
  free: boolean
}

export const proofs: ProofItem[] = [
  {
    id: 'p1',
    type: 'video',
    title: 'Что такое реальная культивация',
    subtitle: 'Устная традиция и метод культивации (внутренней алхимии)',
    duration: '12:40',
    free: true,
  },
  {
    id: 'p2',
    type: 'video',
    title: 'Уровни пути культивации',
    subtitle: 'От красного талисмана к золотой скрижали',
    duration: '18:05',
    free: true,
  },
  {
    id: 'p3',
    type: 'audio',
    title: 'О учителе и передаче знания',
    subtitle: 'История школы и почему знания открыты сейчас',
    duration: '24:18',
    free: true,
  },
  {
    id: 'p4',
    type: 'video',
    title: 'Демонстрация: сгущение ци-цзин',
    subtitle: 'Пруф-практика красного талисмана',
    duration: '09:32',
    free: true,
  },
]

/** intro — вводная; early/middle/late — цепочка основы; extra — доп. блоки */
export type PracticeTier = 'intro' | 'early' | 'middle' | 'late' | 'extra'

export type PracticeAccess = 'open' | 'locked' | 'purchasable'

export interface Practice {
  id: string
  stageId: string
  tier: PracticeTier
  title: string
  duration: string
  access: PracticeAccess
  completed?: boolean
  description: string
  text: string
}

export const tierLabels: Record<PracticeTier, string> = {
  intro: 'Вводная часть',
  early: 'Основа начальная',
  middle: 'Основа средняя',
  late: 'Основа поздняя',
  extra: 'Дополнительные блоки',
}

export const tierHints: Record<PracticeTier, string> = {
  intro: 'Задачи и методы этапа · видео и текст',
  early: 'Основная цепочка · открывается по месяцам',
  middle: 'Основная цепочка · открывается по месяцам',
  late: 'Основная цепочка · открывается по месяцам',
  extra: 'Покупаются отдельно · видны всегда',
}

const practiceText = (title: string) =>
  `Блок «${title}» включает обучающее видео и текстовую разборку. Следуйте последовательности: сначала освоить форму и ощущение, затем закрепить ежедневной практикой. При проблемах со здоровьем согласуйте нагрузку с врачом.`

export const practices: Practice[] = [
  // —— Красный талисман ——
  {
    id: 'rt-intro',
    stageId: 'red-talisman',
    tier: 'intro',
    title: 'Введение в красный талисман',
    duration: '14:20',
    access: 'open',
    completed: true,
    description: 'Основные задачи и методы первого этапа: подготовка тела и сгущение ци-цзин.',
    text: 'Красный талисман — сгущение ци (конденсация ци), уровень ци-цзин. Задача этапа: вернуть гармонию в существование, получить первый строительный материал и инструментарий. Сюда входят восстановительные практики — чтобы тело было готово — и подготовительные; цигун и нейгун относятся, в основном, к этому уровню. Каждый блок практик состоит из видео с обучением и текста. Перейти дальше можно только после экзамена.',
  },
  {
    id: 'rt-e1',
    stageId: 'red-talisman',
    tier: 'early',
    title: 'Массаж внешних сосудов',
    duration: '18:40',
    access: 'open',
    completed: true,
    description: 'Первая практика начальной основы красного талисмана.',
    text: practiceText('Массаж внешних сосудов'),
  },
  {
    id: 'rt-e2',
    stageId: 'red-talisman',
    tier: 'early',
    title: 'Синхронизация мозга',
    duration: '16:15',
    access: 'open',
    completed: false,
    description: 'Настройка согласованной работы полушарий и внимания.',
    text: practiceText('Синхронизация мозга'),
  },
  {
    id: 'rt-e3',
    stageId: 'red-talisman',
    tier: 'early',
    title: 'Стояние в столбе',
    duration: '22:00',
    access: 'open',
    completed: false,
    description: 'Статическая опора: осанка, дыхание, удержание.',
    text: practiceText('Стояние в столбе'),
  },
  {
    id: 'rt-m1',
    stageId: 'red-talisman',
    tier: 'middle',
    title: 'Массаж внутренних сосудов',
    duration: '20:10',
    access: 'locked',
    description: 'Средняя основа: работа с внутренними сосудами.',
    text: practiceText('Массаж внутренних сосудов'),
  },
  {
    id: 'rt-m2',
    stageId: 'red-talisman',
    tier: 'middle',
    title: 'Настройка оси',
    duration: '17:30',
    access: 'locked',
    description: 'Выстраивание центральной оси тела.',
    text: practiceText('Настройка оси'),
  },
  {
    id: 'rt-m3',
    stageId: 'red-talisman',
    tier: 'middle',
    title: 'Анатомия тайцзи',
    duration: '24:50',
    access: 'locked',
    description: 'Базовая анатомия движений тайцзи.',
    text: practiceText('Анатомия тайцзи'),
  },
  {
    id: 'rt-l1',
    stageId: 'red-talisman',
    tier: 'late',
    title: 'Питание слюдой',
    duration: '15:20',
    access: 'locked',
    description: 'Поздняя основа: практика питания слюдой.',
    text: practiceText('Питание слюдой'),
  },
  {
    id: 'rt-l2',
    stageId: 'red-talisman',
    tier: 'late',
    title: 'Настройка внутреннего дыхания',
    duration: '19:45',
    access: 'locked',
    description: 'Тонкая настройка внутреннего дыхания.',
    text: practiceText('Настройка внутреннего дыхания'),
  },
  {
    id: 'rt-l3',
    stageId: 'red-talisman',
    tier: 'late',
    title: 'Продвинутая анатомия тайцзи',
    duration: '26:10',
    access: 'locked',
    description: 'Углублённая анатомия тайцзи на поздней основе.',
    text: practiceText('Продвинутая анатомия тайцзи'),
  },
  {
    id: 'rt-x1',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплекс на почки',
    duration: '21:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на почки'),
  },
  {
    id: 'rt-x2',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплекс на сердце',
    duration: '21:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на сердце'),
  },
  {
    id: 'rt-x3',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплекс на селезёнку',
    duration: '21:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на селезёнку'),
  },
  {
    id: 'rt-x4',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплекс на лёгкие',
    duration: '21:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на лёгкие'),
  },
  {
    id: 'rt-x5',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплекс на печень',
    duration: '21:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на печень'),
  },
  {
    id: 'rt-x6',
    stageId: 'red-talisman',
    tier: 'extra',
    title: 'Комплексы на мышечно-сухожильные меридианы',
    duration: '32:00',
    access: 'purchasable',
    description: 'Дополнительный блок по основным мышечно-сухожильным меридианам.',
    text: practiceText('Комплексы на мышечно-сухожильные меридианы'),
  },

  // —— Белая пагода ——
  {
    id: 'wp-intro',
    stageId: 'white-pagoda',
    tier: 'intro',
    title: 'Введение в белую пагоду',
    duration: '15:40',
    access: 'locked',
    description: 'Задачи и методы второго этапа: заложение основы и второе (алхимическое) тело.',
    text: 'Белая пагода открывается после сдачи экзамена красного талисмана. Здесь закладывается основа — цзин-ци и цзин-цзин: формируется второе (алхимическое) тело. Его составные части — киноварные поля (3 основные и 6 дополнительных), дворцы мозга (в первую очередь нивангун), ртуть и свинец.',
  },
  {
    id: 'wp-e1',
    stageId: 'white-pagoda',
    tier: 'early',
    title: 'Твердый эликсир',
    duration: '23:10',
    access: 'locked',
    description: 'Начальная основа белой пагоды.',
    text: practiceText('Твердый эликсир'),
  },
  {
    id: 'wp-e2',
    stageId: 'white-pagoda',
    tier: 'early',
    title: 'Продвинутый массаж сосудов',
    duration: '20:40',
    access: 'locked',
    description: 'Углублённая работа с сосудами.',
    text: practiceText('Продвинутый массаж сосудов'),
  },
  {
    id: 'wp-e3',
    stageId: 'white-pagoda',
    tier: 'early',
    title: 'Тайцзи, уровень Земля',
    duration: '28:00',
    access: 'locked',
    description: 'Тайцзи первой опоры — Земля.',
    text: practiceText('Тайцзи, уровень Земля'),
  },
  {
    id: 'wp-m1',
    stageId: 'white-pagoda',
    tier: 'middle',
    title: 'Настройка нивангун',
    duration: '18:25',
    access: 'locked',
    description: 'Средняя основа: настройка нивангун.',
    text: practiceText('Настройка нивангун'),
  },
  {
    id: 'wp-m2',
    stageId: 'white-pagoda',
    tier: 'middle',
    title: 'Черепашье дыхание',
    duration: '21:15',
    access: 'locked',
    description: 'Ключевая дыхательная практика этапа.',
    text: practiceText('Черепашье дыхание'),
  },
  {
    id: 'wp-m3',
    stageId: 'white-pagoda',
    tier: 'middle',
    title: 'Тайцзи, уровень Небо',
    duration: '28:00',
    access: 'locked',
    description: 'Тайцзи второй опоры — Небо.',
    text: practiceText('Тайцзи, уровень Небо'),
  },
  {
    id: 'wp-l1',
    stageId: 'white-pagoda',
    tier: 'late',
    title: 'Алхимический комплекс',
    duration: '30:00',
    access: 'locked',
    description: 'Поздняя основа: алхимический комплекс.',
    text: practiceText('Алхимический комплекс'),
  },
  {
    id: 'wp-l2',
    stageId: 'white-pagoda',
    tier: 'late',
    title: 'Очистка костного мозга',
    duration: '22:40',
    access: 'locked',
    description: 'Практика очистки костного мозга.',
    text: practiceText('Очистка костного мозга'),
  },
  {
    id: 'wp-l3',
    stageId: 'white-pagoda',
    tier: 'late',
    title: 'Тайцзи, уровень Человек',
    duration: '28:00',
    access: 'locked',
    description: 'Тайцзи третьей опоры — Человек.',
    text: practiceText('Тайцзи, уровень Человек'),
  },
  {
    id: 'wp-x1',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Комплекс на продолговатый мозг',
    duration: '19:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на продолговатый мозг'),
  },
  {
    id: 'wp-x2',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Комплекс на мозжечок',
    duration: '19:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на мозжечок'),
  },
  {
    id: 'wp-x3',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Комплекс на затылок',
    duration: '19:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на затылок'),
  },
  {
    id: 'wp-x4',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Комплекс на виски',
    duration: '19:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Комплекс на виски'),
  },
  {
    id: 'wp-x5',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Эликсир летучей мыши',
    duration: '25:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Эликсир летучей мыши'),
  },
  {
    id: 'wp-x6',
    stageId: 'white-pagoda',
    tier: 'extra',
    title: 'Девятикратный эликсир сияния',
    duration: '27:00',
    access: 'purchasable',
    description: 'Дополнительный блок. Покупается отдельно.',
    text: practiceText('Девятикратный эликсир сияния'),
  },

  // —— Зелёная терраса (материалы ограничены) ——
  {
    id: 'gt-1',
    stageId: 'green-terrace',
    tier: 'early',
    title: 'Комплекс по формированию пилюли бессмертия',
    duration: '40:00',
    access: 'locked',
    description: 'Ключевая практика зелёной террасы.',
    text: practiceText('Комплекс по формированию пилюли бессмертия'),
  },
]

export const examFeeRub = 1000

export const subscriptionBenefits = [
  'Доступ к основной цепочке практик текущего этапа',
  'Ежемесячное открытие новых блоков основы',
  'Материалы по девяти энергиям и трём пространствам',
  'Запрос на сдачу экзамена (не чаще раза в месяц)',
  'Путь к статусу инструктора',
]

/** @deprecated используйте practices — оставлено для совместимости импортов */
export type Lesson = Practice
export const lessons = practices
