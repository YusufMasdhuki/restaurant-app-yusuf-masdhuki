// register-schema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
