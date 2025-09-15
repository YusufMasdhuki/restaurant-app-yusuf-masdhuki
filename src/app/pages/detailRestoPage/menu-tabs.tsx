import { Button } from '@/components/ui/button';
import { RESTO_MENU_TABS } from '@/constants/restaurantMenuTabs';

const MenuTabs = () => {
  return (
    <div className='flex gap-3'>
      {RESTO_MENU_TABS.map((tab) => (
        <Button
          key={tab.key}
          size='lg'
          className=' data-[state=active]:border-primary-100 border border-neutral-300'
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default MenuTabs;
