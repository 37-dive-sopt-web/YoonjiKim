import { useState } from 'react';
import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { SignUpFormData } from '@/pages/SignUpPage';

interface SecondStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

const SecondStep = ({ register, errors, watch, onNext, onPrev, isValid }: SecondStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordMismatch = password && confirmPassword && password !== confirmPassword;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요 (8-64자)"
          error={errors.password?.message}
          {...register('password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? '숨기기' : '보기'}
        </button>
      </div>

      <div className="relative">
        <Input
          label="비밀번호 확인"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="비밀번호를 다시 입력하세요"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showConfirmPassword ? '숨기기' : '보기'}
        </button>
      </div>

      {passwordMismatch && (
        <p className="text-sm text-danger">비밀번호가 일치하지 않습니다.</p>
      )}

      <div className="bg-primary-light bg-opacity-30 p-4 rounded-lg border border-primary-light">
        <p className="text-sm font-medium text-gray-800 mb-2">비밀번호 정책</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• 길이: 8~64자</li>
          <li>• 대문자, 소문자, 숫자, 특수문자 각각 1자 이상 포함</li>
          <li>• 공백 불허</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="cancel" fullWidth onClick={onPrev}>
          이전
        </Button>
        <Button type="button" fullWidth disabled={!isValid || passwordMismatch} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;