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
    <div className='relative overflow-hidden bg-white p-5 rounded-t-2xl'>
      {/* border dashed dibuat manual */}
      <div
        className='absolute bottom-0 left-0 right-0 h-px bg-transparent 
                  [background-image:repeating-linear-gradient(90deg,#d4d4d8_0_4px,transparent_4px_8px)]'
      />

      {/* cekungan */}
      <div className='absolute bottom-0 left-0 w-2.5 h-2.5 bg-neutral-50 rounded-tr-full' />
      <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-neutral-50 rounded-tl-full' />
      <h2 className='text-lg font-extrabold text-neutral-950 mb-4'>
        Payment Method
      </h2>
      <div className='flex flex-col divide-y divide-neutral-300'>
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className='flex items-center gap-3 py-4 cursor-pointer'
          >
            <input
              type='radio'
              name='payment-method'
              value={method.id}
              checked={selectedMethod?.id === method.id}
              onChange={() => onSelect(method)}
              className='accent-neutral-950'
            />
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-12 h-12 border border-neutral-300 rounded-md'>
                <img
                  src={method.img}
                  alt={method.name}
                  className='w-8 h-8 object-contain'
                />
              </div>
              <span className='font-medium text-neutral-950'>
                {method.name}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
