import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import MyPage from '../pages/MyPage';
import SearchUserPage from '@/pages/SearchUserPage';
import DeleteUserPage from '@/pages/DeleteUserPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/mypage/search',
    element: <SearchUserPage />,
  },
  {
    path: '/mypage/delete',
    element: <DeleteUserPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;