import { z } from 'zod';
import { LABELS } from '@/constants/labels';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: LABELS.AUTH.ERROR_FILL_ALL })
    .email({ message: 'Email không đúng định dạng' }),
  password: z
    .string()
    .min(1, { message: LABELS.AUTH.ERROR_FILL_ALL }),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: LABELS.AUTH.ERROR_FILL_REQUIRED }),
    email: z
      .string()
      .min(1, { message: LABELS.AUTH.ERROR_FILL_REQUIRED })
      .email({ message: 'Email không đúng định dạng' }),
    phone: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine((val) => !val || /^[0-9]{10}$/.test(val), {
        message: 'Số điện thoại phải bao gồm 10 chữ số',
      }),
    password: z
      .string()
      .min(6, { message: LABELS.AUTH.ERROR_PASSWORD_LENGTH }),
    confirmPassword: z
      .string()
      .min(1, { message: LABELS.AUTH.ERROR_FILL_REQUIRED }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: LABELS.AUTH.ERROR_PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
