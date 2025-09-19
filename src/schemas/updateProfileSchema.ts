import z from 'zod';

export const updateProfileSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(8, 'Invalid phone number'),
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required or fill in with current password'),
  })
  .refine(
    (data) =>
      // Kalau user tidak mau ganti, newPassword boleh sama dengan currentPassword
      data.newPassword === data.currentPassword || data.newPassword.length >= 6,
    {
      path: ['newPassword'],
      message:
        'New password must be at least 6 characters or the same as the current password.',
    }
  );

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
