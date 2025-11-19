import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { SignUpFormData } from '@/pages/SignUpPage';

interface ThirdStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  onPrev: () => void;
  isValid: boolean;
  isLoading: boolean;
}

const ThirdStep = ({ register, errors, onPrev, isValid, isLoading }: ThirdStepProps) => {
  return (
    <div className="space-y-4">
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

      <div className="flex gap-2">
        <Button type="button" variant="cancel" fullWidth onClick={onPrev}>
          이전
        </Button>
        <Button type="submit" fullWidth disabled={!isValid || isLoading}>
          {isLoading ? '가입 중...' : '회원가입'}
        </Button>
      </div>
    </div>
  );
};

export default ThirdStep;