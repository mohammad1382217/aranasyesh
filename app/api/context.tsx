import React from 'react';
import { category } from './Slices/HomeSlice/Home';

export type ContextType = {
  categoryData: category[];
  setCategoryData: React.Dispatch<React.SetStateAction<category[]>>;
};

const Context = React.createContext<ContextType | null>(null);

export default Context;