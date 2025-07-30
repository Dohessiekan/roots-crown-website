import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  service: string | null;
  setService: (service: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [service, setService] = useState<string | null>(null);
  return (
    <BookingContext.Provider value={{ service, setService }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
