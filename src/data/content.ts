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
    subtitle: 'Устная традиция и метод внутренней алхимии',
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

export interface Lesson {
  id: string
  stageId: string
  title: string
  duration: string
  free: boolean
  completed?: boolean
  description: string
}

export const lessons: Lesson[] = [
  {
    id: 'l1',
    stageId: 'red-talisman',
    title: 'Введение в красный талисман',
    duration: '14:20',
    free: true,
    completed: true,
    description: 'Зачем нужна подготовка к алхимии и что значит «сгустить ци».',
  },
  {
    id: 'l2',
    stageId: 'red-talisman',
    title: 'Техника безопасности',
    duration: '11:05',
    free: true,
    completed: true,
    description: 'Первое правило — не навреди. Работа со здоровьем и врачами.',
  },
  {
    id: 'l3',
    stageId: 'red-talisman',
    title: 'Ци-цзин: удержание и сгущение',
    duration: '16:48',
    free: true,
    completed: false,
    description: 'Начало культивационных практик: энергия Земли, которую можно удержать.',
  },
  {
    id: 'l4',
    stageId: 'red-talisman',
    title: 'Подготовка кровеносной системы',
    duration: '22:10',
    free: false,
    description: 'Практики коррекции и подготовки к алхимии.',
  },
  {
    id: 'l5',
    stageId: 'red-talisman',
    title: 'Подготовка нервной системы',
    duration: '19:35',
    free: false,
    description: 'Практики для нервной системы в рамках красного талисмана.',
  },
  {
    id: 'l6',
    stageId: 'red-talisman',
    title: 'Базовое сгущение ци-цзин',
    duration: '28:00',
    free: false,
    description: 'Ключевая практика начала культивационного пути.',
  },
  {
    id: 'l7',
    stageId: 'white-pagoda',
    title: 'Обзор белой пагоды',
    duration: '15:40',
    free: false,
    description: 'Три точки опоры: запуск основного алхимического процесса.',
  },
  {
    id: 'l8',
    stageId: 'white-pagoda',
    title: 'Черепашье дыхание — введение',
    duration: '20:15',
    free: false,
    description: 'Одна из ключевых практик второго уровня.',
  },
]

export const subscriptionBenefits = [
  'Доступ ко всем практикам красного талисмана',
  'Ежемесячные разборы и ответы мастеров',
  'Материалы по девяти энергиям и трём пространствам',
  'Право сдать онлайн-экзамен на ускорение',
  'Путь к статусу инструктора',
]
