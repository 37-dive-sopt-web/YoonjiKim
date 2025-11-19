import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, removeUserId } from '@/utils/storage';
import { getUserInfo, deleteUserInfo } from '@/api/mypage';
import Header from '@/components/Member/Header';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import type { User } from '@/types/user';

const DeleteUserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await getUserInfo(userId);
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        navigate('/login');
        console.error('불러오기 오류: ', error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      setIsLoading(true);
      const response = await deleteUserInfo(userId);

      if (response.success) {
        alert('회원탈퇴가 완료되었습니다.');
        removeUserId();
        navigate('/login');
      }
    } catch (error) {
      const apiError = error as { message?: string };
      alert(apiError.message || '회원탈퇴에 실패했습니다.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} />

      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">회원 탈퇴</h2>

          <Button
            variant="delete"
            fullWidth
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
          >
            회원 탈퇴하기
          </Button>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="회원 탈퇴 확인"
      >
        <p>정말로 탈퇴하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default DeleteUserPage;