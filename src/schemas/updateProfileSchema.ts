import z from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  phone: z.string().min(8, 'Nomor telepon tidak valid'),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
