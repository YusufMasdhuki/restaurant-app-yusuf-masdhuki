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
    <div className='shadow bg-white p-5 rounded-2xl'>
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
