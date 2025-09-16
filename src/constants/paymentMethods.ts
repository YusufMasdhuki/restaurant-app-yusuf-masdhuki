export interface PaymentMethod {
  id: string;
  name: string;
  img: string;
  deliveryFee: number;
  serviceFee: number;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bni',
    name: 'Bank Negara Indonesia',
    img: '/icons/bni-icon.svg',
    deliveryFee: 10000,
    serviceFee: 1000,
  },
  {
    id: 'bri',
    name: 'Bank Rakyat Indonesia',
    img: '/icons/bri-icon.svg',
    deliveryFee: 12000,
    serviceFee: 1500,
  },
  {
    id: 'bca',
    name: 'Bank Central Asia',
    img: '/icons/bca-icon.svg',
    deliveryFee: 8000,
    serviceFee: 2000,
  },
  {
    id: 'mandiri',
    name: 'Mandiri',
    img: '/icons/mandiri-icon.svg',
    deliveryFee: 9000,
    serviceFee: 1200,
  },
];
