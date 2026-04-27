import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { SignUpFormData } from '@/pages/SignUpPage';

interface FirstStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  onNext: () => void;
  isValid: boolean;
}

const FirstStep = ({ register, errors, onNext, isValid }: FirstStepProps) => {
  return (
    <div className="space-y-4">
      <Input
        label="아이디"
        placeholder="아이디를 입력하세요 (최대 50자)"
        error={errors.username?.message}
        {...register('username')}
      />
      
      <Button type="button" fullWidth disabled={!isValid} onClick={onNext}>
        다음
      </Button>
    </div>
  );
};

export default FirstStep;