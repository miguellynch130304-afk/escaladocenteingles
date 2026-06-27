import { v4 as uuid } from 'uuid';

export const DashboardMenu = [
  {
    id: uuid(),
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    id: uuid(),
    title: 'PREPARATION',
    grouptitle: true
  },
  {
    id: uuid(),
    title: 'Modules',
    icon: 'book-open',
    link: '/practice'
  },
  {
    id: uuid(),
    title: 'Full mock exam',
    icon: 'clock',
    badge: '180m',
    badgecolor: 'primary',
    link: '/exam'
  },
  {
    id: uuid(),
    title: 'Review',
    icon: 'check-square',
    link: '/review'
  },
  {
    id: uuid(),
    title: 'REFERENCE',
    grouptitle: true
  },
  {
    id: uuid(),
    title: '2025 exam booklet',
    icon: 'file-text',
    link: '/review?mode=practice'
  },
  {
    id: uuid(),
    title: 'Official answer key',
    icon: 'award',
    link: '/review?mode=exam'
  }
];

export default DashboardMenu;
