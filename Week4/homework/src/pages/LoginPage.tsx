import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { usernameSchema, passwordSchema } from '@/utils/validate';

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    // Todo: 로그인 로직 구현
    console.log(data);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-8">로그인</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            
            <Button type="submit" fullWidth disabled={!isValid}>
              로그인
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