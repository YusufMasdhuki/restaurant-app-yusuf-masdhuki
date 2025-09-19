import UpdateProfileDialog from '@/components/container/update-profile-dialog';
import { UserSidebar } from '@/components/container/user-sidebar';
import { useProfile } from '@/hooks/auth/useProfile';
import { useIsMobile } from '@/lib/useIsMobile';

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useProfile();
  const isMobile = useIsMobile(); // default breakpoint 768

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='bg-neutral-50 pt-20 md:pt-32 min-h-screen text-neutral-950'>
      <div className='flex flex-col md:flex-row gap-8 px-4 max-w-300 mx-auto'>
        {/* Sidebar hanya muncul kalau bukan mobile */}
        {!isMobile && (
          <div>
            <UserSidebar />
          </div>
        )}

        <div className='w-full md:max-w-[524px]'>
          <h1 className='text-display-xs md:text-display-md font-extrabold text-neutral-950 mb-6'>
            Profile
          </h1>
          <div className='bg-white shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-4 md:p-5'>
            <div className='flex flex-col gap-2 md:gap-3'>
              <img
                src='/images/default-avatar.png'
                alt='avatar'
                className='w-16 h-16'
              />
              <div className='flex justify-between items-center'>
                <span className='text-sm md:text-md font-medium text-neutral-950'>
                  Name
                </span>
                <span className='text-sm md:text-md font-bold text-neutral-950'>
                  {profile?.name ?? '-'}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm md:text-md font-medium text-neutral-950'>
                  Email
                </span>
                <span className='text-sm md:text-md font-bold text-neutral-950'>
                  {profile?.email ?? '-'}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm md:text-md font-medium text-neutral-950'>
                  Nomor Handphone
                </span>
                <span className='text-sm md:text-md font-bold text-neutral-950'>
                  {profile?.phone ?? '-'}
                </span>
              </div>
              <UpdateProfileDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
