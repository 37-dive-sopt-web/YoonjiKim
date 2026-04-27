import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '@/utils/storage';
import { getUserInfo } from '@/api/mypage';
import Header from '@/components/Member/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { User } from '@/types/user';

interface SearchFormData {
  userId: string;
}

const SearchUserPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>();

  const userId = watch('userId');
  const isValid = userId && userId.trim() !== '' && !isNaN(Number(userId));

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserId = getUserId();
      if (!currentUserId) {
        navigate('/login');
        return;
      }

      try {
        const response = await getUserInfo(currentUserId);
        if (response.success && response.data) {
          setCurrentUser(response.data);
        }
      } catch (error) {
        navigate('/login');
        console.error('불러오기 오류: ', error);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const onSubmit = async (data: SearchFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSearchedUser(null);

      const response = await getUserInfo(Number(data.userId));

      if (response.success && response.data) {
        setSearchedUser(response.data);
      }
    } catch (error) {
      const apiError = error as { message?: string };
      setErrorMessage(apiError.message || '사용자를 찾을 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
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
      <Header userName={currentUser.name} />

      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">회원 조회</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="회원 ID를 입력하세요"
                error={errors.userId?.message}
                {...register('userId')}
              />
              <Button type="submit" disabled={!isValid || isLoading}>
                {isLoading ? '조회 중...' : '확인'}
              </Button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-danger-light bg-opacity-20 border border-danger rounded-lg">
                <p className="text-sm text-danger-dark">{errorMessage}</p>
              </div>
            )}
          </form>

          {searchedUser && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">조회 결과</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">회원 ID:</span>
                  <span>{searchedUser.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">아이디:</span>
                  <span>{searchedUser.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">이름:</span>
                  <span>{searchedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">이메일:</span>
                  <span>{searchedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">나이:</span>
                  <span>{searchedUser.age}세</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchUserPage;