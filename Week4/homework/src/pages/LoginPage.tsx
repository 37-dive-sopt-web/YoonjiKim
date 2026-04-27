import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { usernameSchema, passwordSchema } from '@/utils/validate';
import { postLogin } from '@/api/auth';
import { setUserId } from '@/utils/storage';

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const response = await postLogin(formData);
      
      if (response.success && response.data) {
        setUserId(response.data.userId);
        navigate('/mypage');
      }
    } catch (error) {
      const apiError = error as { message?: string };
      setErrorMessage(apiError.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-8">로그인</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-danger-light bg-opacity-20 border border-danger rounded-lg">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요"
              error={errors.username?.message}
              {...register('username')}
            />
            
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              error={errors.password?.message}
              {...register('password')}
            />
            
            <Button type="submit" fullWidth disabled={!isValid || isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
            
            <Button
              type="button"
              variant="cancel"
              fullWidth
              onClick={() => navigate('/signup')}
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;