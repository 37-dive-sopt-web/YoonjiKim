import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다!</p>
        <Button onClick={() => navigate('/login')}>
          로그인 페이지로 이동
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;