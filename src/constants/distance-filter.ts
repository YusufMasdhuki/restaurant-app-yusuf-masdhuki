interface Distance {
  label: string;
  value: number;
}

export const DISTANCE: Distance[] = [
  { label: 'Nearby', value: 0 },
  { label: 'Within 1 km', value: 1 },
  { label: 'Within 3 km', value: 3 },
  { label: 'Within 5 km', value: 5 },
];
