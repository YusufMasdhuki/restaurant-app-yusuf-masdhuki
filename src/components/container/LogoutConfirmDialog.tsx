// components/container/LogoutConfirmDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';

interface LogoutConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[450px] bg-transparent p-4'>
        <AnimatePresence mode='wait'>
          {open && (
            <motion.div
              key='update-profile-dialog'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
            >
              <DialogHeader>
                <DialogTitle className='text-xl md:text-display-xs font-extrabold mb-4 md:mb-6'>
                  Logout
                </DialogTitle>
              </DialogHeader>
              <p className='text-sm md:text-md text-neutral-950 pb-4 md:pb-6'>
                Are you sure you want to logout?
              </p>
              <DialogFooter className='flex justify-end gap-2'>
                <Button
                  size='normal'
                  onClick={onClose}
                  className='bg-neutral-300 md:max-w-30 w-full'
                >
                  Cancel
                </Button>
                <Button
                  size='normal'
                  onClick={onConfirm}
                  className='bg-red-500 hover:bg-red-600 w-full md:max-w-30 text-white'
                >
                  Logout
                </Button>
              </DialogFooter>{' '}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
