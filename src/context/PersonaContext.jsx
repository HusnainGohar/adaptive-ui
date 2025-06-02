import { createContext, useContext, useState, useEffect } from 'react';
import { predictPersona } from '../api/person_api';

const PersonaContext = createContext();

export function PersonaProvider({ children }) {
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const features = {
      brand_research: 2,
      brand_visits: 5,
      cart_adds: 3,
      deals_clicked: 10,
      eco_products_viewed: 1,
      gift_guides_viewed: 0,
      products_viewed: 25,
      purchases: 2,
      quick_purchases: 1,
      repeat_purchases: 0,
      reviews_read: 8,
      searches: 7,
      specs_viewed: 0,
      wishlists: 2
    };
    predictPersona(features)
      .then(predicted => setPersona(predicted))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PersonaContext.Provider value={{ persona, loading, error }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
