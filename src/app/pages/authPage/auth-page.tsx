import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogoFoody from '@/components/icons/logo-foody';
import { useIsMobile } from '@/lib/useIsMobile';
import clsx from 'clsx';

export default function AuthPage() {
  const isMobile = useIsMobile(); // default breakpoint 768

  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    return tab === 'register' ? 'register' : 'login';
  };

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    getInitialTab()
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  }, [activeTab]);

  return (
    <div className='min-h-screen flex items-center w-full'>
      {/* left */}
      {!isMobile && (
        <div className='w-1/2 h-screen overflow-hidden'>
          <img
            src='/images/auth-image.png'
            alt='auth image'
            className='object-cover w-full h-full overflow-hidden'
          />
        </div>
      )}

      {/* right */}
      <div className={clsx('p-4 md:p-6', isMobile ? 'w-full' : 'w-1/2')}>
        <div className='w-full mx-auto max-w-[374px]'>
          <div className='flex items-center gap-3 md:gap-4 font-extrabold text-neutral-950 text-display-xs md:text-display-md mb-4 md:mb-5'>
            <LogoFoody className='text-primary-100 size-8 md:size-10.5' />
            <span>Foody</span>
          </div>
          <h1 className='text-display-xs md:text-display-sm font-extrabold text-neutral-950 mb-0 md:mb-1'>
            Welcome Back
          </h1>
          <p className='text-sm md:text-md font-medium text-neutral-950 mb-4 md:mb-5'>
            Good to see you again! Let’s eat
          </p>
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as 'login' | 'register')}
            className='w-full max-w-[374px] mx-auto'
          >
            <TabsList className='grid grid-cols-2 w-full mb-5 md:mb-6 bg-neutral-100 rounded-2xl py-1.5 px-2 md:py-2'>
              <TabsTrigger
                value='login'
                className='cursor-pointer h-10 bg-neutral-100 data-[state=active]:bg-white rounded-md daata-[state=active]:shadow-[0_0_20px_rgba(203,202,202,0.25)] text-sm md:text-md text-neutral-600 font-medium data-[state=active]:text-neutral-950 data-[state=active]:font-bold md:rounded-xl'
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='cursor-pointer h-10 bg-neutral-100 data-[state=active]:bg-white rounded-md data-[state=active]:shadow-[0_0_20px_rgba(203,202,202,0.25)] text-sm md:text-md font-medium text-neutral-600 data-[state=active]:text-neutral-950 data-[state=active]:font-bold md:rounded-xl'
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value='login'>
              <LoginForm onSuccess={() => setActiveTab('login')} />
            </TabsContent>

            <TabsContent value='register'>
              <RegisterForm onSuccess={() => setActiveTab('login')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
