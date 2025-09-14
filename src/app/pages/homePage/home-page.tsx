import Hero from './hero';
import RecommendedResto from './recommended-resto';
import RestaurantFilters from './restaurant-filters';

const HomePage = () => {
  return (
    <>
      <Hero />
      <RestaurantFilters />
      <RecommendedResto />
    </>
  );
};

export default HomePage;
