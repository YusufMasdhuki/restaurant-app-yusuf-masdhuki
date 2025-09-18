import LogoFoody from '@/components/icons/logo-foody';
import { SOCIAL_MEDIA } from '@/constants/social-media-data';
import { EXPLORE, HELP } from '@/constants/footer-links';

const Footer = () => {
  return (
    <div className='bg-neutral-950 py-10 md:py-20 flex justify-center items-center text-white'>
      <div className='max-w-300 w-full px-4 flex flex-col justify-between items-center gap-6 md:flex-row'>
        {/* Kiri: Logo + Deskripsi + Sosmed */}
        <div className='w-full max-w-95'>
          {/* Logo */}
          <div className='flex items-center gap-4'>
            <LogoFoody className='text-primary-100 size-10.5' />
            <h2 className='text-white text-display-md font-extrabold'>Foody</h2>
          </div>

          {/* Deskripsi */}
          <p className='text-sm md:text-md text-neutral-25 mt-5 mb-4 md:mb-10'>
            Enjoy homemade flavors & chef’s signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>

          {/* Social Media */}
          <h4 className='md:text-md text-sm font-bold text-neutral-25 md:font-extrabold mb-5'>
            Follow on Social Media
          </h4>
          <div className='flex gap-3 items-center'>
            {SOCIAL_MEDIA.map((item) => (
              <div
                key={item.name}
                className='flex justify-center items-center w-10 h-10 rounded-full border border-neutral-800'
              >
                <img src={item.src} alt={item.name} className={item.size} />
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Explore + Help */}
        <div className='flex w-full justify-between mt-6 md:mt-0 md:w-1/2'>
          {/* Explore */}
          <div className='w-50'>
            <h3 className='text-neutral-25 text-sm md:text-md font-extrabold mb-4 md:mb-5'>
              Explore
            </h3>
            <ul className='md:space-y-5 space-y-4'>
              {EXPLORE.map((item) => (
                <li key={item.label} className='hover:underline'>
                  <a
                    href={item.href}
                    className='text-neutral-25 text-sm md:text-md hover:text-white'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className='w-50'>
            <h3 className='text-neutral-25 font-extrabold text-sm md:text-md mb-4 md:mb-5'>
              Help
            </h3>
            <ul className='md:space-y-5 space-y-4'>
              {HELP.map((item) => (
                <li key={item.label} className='hover:underline'>
                  <a
                    href={item.href}
                    className='text-neutral-25 text-sm md:text-md hover:text-white'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
