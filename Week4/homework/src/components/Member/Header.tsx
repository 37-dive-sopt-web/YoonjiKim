import { useNavigate, useLocation } from 'react-router-dom';
import { removeUserId } from '@/utils/storage';
import { cn } from '@/utils/cn';

interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeUserId();
      navigate('/login');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/mypage', label: '내 정보' },
    { path: '/mypage/search', label: '회원 조회' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-800">{userName}님</span>
          </div>

          <nav className="flex space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              로그아웃
            </button>
            <button
              onClick={() => navigate('/mypage/delete')}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/mypage/delete')
                  ? 'bg-danger text-white'
                  : 'text-danger hover:bg-danger-light hover:bg-opacity-20'
              )}
            >
              회원탈퇴
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;