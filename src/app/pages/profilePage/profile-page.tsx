import UpdateProfileDialog from '@/components/container/update-profile-dialog';
import LogOut from '@/components/icons/log-out';
import MyOrders from '@/components/icons/my-orders';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/auth/useProfile';
import { MapPin } from 'lucide-react';

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className='bg-neutral-50 pt-32 min-h-screen'>
      <div className='flex gap-8 w-300 mx-auto'>
        <div>
          <div className='min-w-60 shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
            <div className='flex items-center gap-2 pb-6 border-b border-neutral-300'>
              <img
                src='/images/default-avatar.png'
                alt='avatar'
                className='w-12 h-12'
              />
              <h2 className='text-lg font-bold text-neutral-950'>
                {isLoading ? 'Loading...' : profile?.name ?? 'User Name'}
              </h2>
            </div>
            <div className='flex flex-col gap-6 mt-6'>
              <Button
                variant='underline'
                className='h-7 justify-start text-md gap-2 font-medium text-neutral-950'
              >
                <MapPin className='w-6 h-6' /> Delivery Address
              </Button>
              <Button
                variant='underline'
                className='h-7 justify-start text-md gap-2 font-medium text-neutral-950'
              >
                <MyOrders className='w-6 h-6' /> My Orders
              </Button>
              <Button
                variant='underline'
                className='h-7 justify-start text-md gap-2 font-medium text-neutral-950'
              >
                <LogOut className='w-6 h-6' /> Logout
              </Button>
            </div>
          </div>
        </div>
        <div className='w-full max-w-[524px]'>
          <h1 className='text-display-md font-extrabold text-neutral-950 mb-6'>
            Profile
          </h1>
          <div className='bg-white shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
            <div className='flex flex-col gap-3'>
              <img
                src='/images/default-avatar.png'
                alt='avatar'
                className='w-16 h-16'
              />
              <div className='flex justify-between items-center'>
                <span className='text-md font-medium text-neutral-950'>
                  Name
                </span>
                <span className='text-md font-bold text-neutral-950'>
                  {profile?.name ?? '-'}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-md font-medium text-neutral-950'>
                  Email
                </span>
                <span className='text-md font-bold text-neutral-950'>
                  {profile?.email ?? '-'}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-md font-medium text-neutral-950'>
                  Nomor Handphone
                </span>
                <span className='text-md font-bold text-neutral-950'>
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
