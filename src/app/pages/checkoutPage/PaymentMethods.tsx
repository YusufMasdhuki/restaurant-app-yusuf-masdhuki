import {
  PAYMENT_METHODS,
  type PaymentMethod,
} from '@/constants/paymentMethods';

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  onSelect,
}) => {
  return (
    <div className='relative overflow-hidden bg-white p-4  md:p-5 rounded-t-2xl'>
      {/* border dashed dibuat manual */}
      <div
        className='absolute bottom-0 left-0 right-0 h-px bg-transparent 
                  [background-image:repeating-linear-gradient(90deg,#d4d4d8_0_4px,transparent_4px_8px)]'
      />

      {/* cekungan */}
      <div className='absolute bottom-0 left-0 w-2.5 h-2.5 bg-neutral-100 rounded-tr-full' />
      <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-neutral-100 rounded-tl-full' />
      <h2 className='text-md md:text-lg font-extrabold text-neutral-950'>
        Payment Method
      </h2>
      <div className='flex flex-col divide-y divide-neutral-300'>
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className='flex items-center justify-between gap-2 py-3 md:py-4 cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <div className='flex items-center justify-center size-10 border border-neutral-300 rounded-md'>
                <img
                  src={method.img}
                  alt={method.name}
                  className='size-7.5 object-contain'
                />
              </div>
              <span className='text-sm md:text-md text-neutral-950'>
                {method.name}
              </span>
            </div>
            <input
              type='radio'
              name='payment-method'
              value={method.id}
              checked={selectedMethod?.id === method.id}
              onChange={() => onSelect(method)}
              className='accent-primary-100'
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
