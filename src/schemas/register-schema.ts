// register-schema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Telephone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
