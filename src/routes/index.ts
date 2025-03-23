import HomeIcon from '@mui/icons-material/Home';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SchoolIcon from '@mui/icons-material/School';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/WelcomePage')),
    path: '/',
    title: 'Home',
    icon: HomeIcon, // Welcome Page
  },
  
  
  {
    component: asyncComponentLoader(() => import('@/pages/RoomManagement')),
    path: '/roommanagement',
    title: 'Room Management',
    icon: ManageAccountsIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/SeatAllocation')),
    path: '/seatallocation',
    title: 'Seat Allocation',
    icon: AirlineSeatReclineNormalIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/DepartmentConfig')),
    path: '/departmentconfig',
    title: 'Department Config',
    icon: SchoolIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/ExamSchedule')),
    path: '/ExamSchedule',
    title: 'Exam Schedule',
    icon: PendingActionsIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
];

export default routes;
