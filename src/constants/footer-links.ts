interface Link {
  label: string;
  href: string;
}

export const EXPLORE: Link[] = [
  { label: 'All Food', href: '/all-food' },
  { label: 'Nearby', href: '/nearby' },
  { label: 'Discount', href: '/discount' },
  { label: 'Best Seller', href: '/best-seller' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Lunch', href: '/lunch' },
];

export const HELP: Link[] = [
  { label: 'How to Order', href: '/how-to-order' },
  { label: 'Payment Methods', href: '/payment-methods' },
  { label: 'Track My Order', href: '/track-order' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];
