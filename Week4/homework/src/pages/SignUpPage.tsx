import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { usernameSchema, passwordSchema, nameSchema, emailSchema, ageSchema } from '@/utils/validate';
import { postSignUp } from '@/api/auth';
import FirstStep from '@/components/SignUp/FirstStep';
import SecondStep from '@/components/SignUp/SecondStep';
import ThirdStep from '@/components/SignUp/ThirdStep';
import Button from '@/components/common/Button';

const signUpSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  name: nameSchema,
  email: emailSchema,
  age: ageSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const username = watch('username');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const name = watch('name');
  const email = watch('email');
  const age = watch('age');

  const isStep1Valid = username && !errors.username && username.length <= 50;
  const isStep2Valid = 
    password && 
    confirmPassword && 
    !errors.password && 
    !errors.confirmPassword &&
    password === confirmPassword;
  const isStep3Valid = name && email && age !== undefined && !errors.name && !errors.email && !errors.age;

  const handleNextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger('username');
    } else if (step === 2) {
      isValid = await trigger(['password', 'confirmPassword']);
    }
    
    if (isValid) {
      setStep(step + 1);
      setErrorMessage('');
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setErrorMessage('');
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const { ...signUpData } = data;
      const response = await postSignUp(signUpData);

      if (response.success) {
        alert(`${data.name}님, 회원가입이 완료되었습니다!`);
        navigate('/login');
      }
    } catch (error) {
      const apiError = error as { message?: string };
      const message = apiError.message || '회원가입에 실패했습니다.';
      setErrorMessage(message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2">회원가입</h1>
          <p className="text-center text-gray-600 mb-6">단계 {step}/3</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <div className="mb-4 p-3 bg-danger-light bg-opacity-20 border border-danger rounded-lg">
                <p className="text-sm text-danger-dark">{errorMessage}</p>
              </div>
            )}

            {step === 1 && (
              <FirstStep
                register={register}
                errors={errors}
                onNext={handleNextStep}
                isValid={!!isStep1Valid}
              />
            )}

            {step === 2 && (
              <SecondStep
                register={register}
                errors={errors}
                watch={watch}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                isValid={!!isStep2Valid}
              />
            )}

            {step === 3 && (
              <ThirdStep
                register={register}
                errors={errors}
                onPrev={handlePrevStep}
                isValid={!!isStep3Valid}
                isLoading={isLoading}
              />
            )}
          </form>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="cancel"
              onClick={() => navigate('/login')}
            >
              로그인 페이지로 이동
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;