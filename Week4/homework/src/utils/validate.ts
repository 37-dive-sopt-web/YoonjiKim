import { z } from 'zod';

// 비밀번호 정규식
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]).{8,64}$/;

// 아이디 스키마 정의
const usernameSchema = z
  .string()
  .min(1, '아이디를 입력해주세요')
  .max(50, '아이디는 50자 이하여야 합니다');

// 비밀번호 스키마 정의
const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다')
  .max(64, '비밀번호는 64자 이하여야 합니다')
  .regex(PASSWORD_REGEX, '대문자, 소문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다')
  .refine((val) => !/\s/.test(val), '공백은 허용되지 않습니다');

// 이름 스키마 정의
const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요')
  .max(100, '이름은 100자 이하여야 합니다');

// 이메일 스키마 정의
const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식이 아닙니다')
  .max(150, '이메일은 150자 이하여야 합니다');

// 나이 스키마 정의
const ageSchema = z
  .number()
  .min(0, '나이는 0 이상이어야 합니다');

export { usernameSchema, passwordSchema, nameSchema, emailSchema, ageSchema, PASSWORD_REGEX };