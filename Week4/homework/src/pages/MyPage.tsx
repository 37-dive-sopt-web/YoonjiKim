import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '@/utils/storage';
import { getUserInfo, updateUserInfo } from '@/api/mypage';
import { nameSchema, emailSchema, ageSchema } from '@/utils/validate';
import Header from '@/components/Member/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { User } from '@/types/user';

const updateSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  age: ageSchema,
});

type UpdateFormData = z.infer<typeof updateSchema>;

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    mode: 'onChange',
  });

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
          reset({
            name: response.data.name,
            email: response.data.email,
            age: response.data.age,
          });
        }
      } catch (error) {
        const apiError = error as { message?: string };
        alert(apiError.message || '사용자 정보를 불러오는데 실패했습니다.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate, reset]);

  const onSubmit = async (data: UpdateFormData) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      setIsLoading(true);
      const response = await updateUserInfo(userId, data);

      if (response.success && response.data) {
        setUser(response.data);
        alert('정보가 성공적으로 수정되었습니다.');
      }
    } catch (error) {
      const apiError = error as { message?: string };
      alert(apiError.message || '정보 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
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
          <h2 className="text-2xl font-bold mb-6">내 정보</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">아이디:</span>
                <span className="ml-2">{user.username}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">ID:</span>
                <span className="ml-2">{user.id}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="나이"
              type="number"
              placeholder="나이를 입력하세요"
              error={errors.age?.message}
              {...register('age', { valueAsNumber: true })}
            />

            <Button type="submit" fullWidth disabled={!isValid || isLoading}>
              {isLoading ? '저장 중...' : '저장'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MyPage;