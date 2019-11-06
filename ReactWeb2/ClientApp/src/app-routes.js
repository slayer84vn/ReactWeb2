import { HomePage, DisplayDataPage, ProfilePage, PersonPage } from './pages';

export default [
  {
    path: '/display-data',
    component: DisplayDataPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }
  , 
{
    path: '/person',
    component: PersonPage
  }];
