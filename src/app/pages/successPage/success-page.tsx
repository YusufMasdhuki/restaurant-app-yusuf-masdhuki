import type { CheckoutTransaction } from '@/types/checkout-type';
import { Link, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const state = location.state as { transaction: CheckoutTransaction };

  if (!state?.transaction) {
    return (
      <div className='pt-32 text-center'>
        <h1 className='text-2xl font-bold'>No transaction found</h1>
        <Link to='/' className='text-blue-500 underline'>
          Back to home
        </Link>
      </div>
    );
  }

  const { transaction } = state;

  return (
    <div className='max-w-xl mx-auto pt-32 px-4 text-center'>
      <h1 className='text-3xl font-bold text-green-600 mb-4'>
        Order Successful 🎉
      </h1>
      <p className='text-neutral-700 mb-6'>
        Transaction ID:{' '}
        <span className='font-mono'>{transaction.transactionId}</span>
      </p>

      <div className='bg-white shadow rounded-lg p-5 text-left space-y-3'>
        <p>
          <strong>Payment Method:</strong> {transaction.paymentMethod}
        </p>
        <p>
          <strong>Status:</strong> {transaction.status}
        </p>
        <p>
          <strong>Total:</strong> Rp{' '}
          {transaction.pricing.totalPrice.toLocaleString()}
        </p>
      </div>

      <Link
        to='/orders'
        className='inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg'
      >
        View Orders
      </Link>
    </div>
  );
};

export default SuccessPage;
