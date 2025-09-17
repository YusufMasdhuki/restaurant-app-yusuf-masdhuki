import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogoFoody from '@/components/icons/logo-foody';

export default function AuthPage() {
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
      <div className='w-1/2 h-screen overflow-hidden'>
        <img
          src='/images/auth-image.png'
          alt='auth image'
          className=' object-cover w-full h-full overflow-hidden'
        />
      </div>

      {/* right */}
      <div className='w-1/2 p-6 '>
        <div className='w-[374px] mx-auto'>
          <div className='flex items-center gap-4 font-extrabold text-neutral-950 text-display-md mb-5'>
            <LogoFoody className='text-primary-100 size-10.5' />
            <span>Foody</span>
          </div>
          <h1 className='text-display-sm font-extrabold text-neutral-950 mb-1'>
            Welcome Back
          </h1>
          <p className='text-md font-medium text-neutral-950 mb-5'>
            Good to see you again! Let’s eat
          </p>
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as 'login' | 'register')}
            className='w-[374px] mx-auto'
          >
            <TabsList className='grid grid-cols-2 w-full mb-6 bg-neutral-100 rounded-2xl p-2'>
              <TabsTrigger
                value='login'
                className='cursor-pointer h-10 bg-transparent data-[state=active]:bg-white rounded-xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='cursor-pointer h-10 bg-transparent data-[state=active]:bg-white rounded-xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'
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
