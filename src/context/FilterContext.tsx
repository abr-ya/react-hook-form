import { createContext, FC, ReactNode, useReducer } from 'react';

const initialState = {
  key: '',
};

// Reducer mb separate File!
// todo interface for reducer!
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, key: action.payload };
    case 'RESET_FILTER':
      return initialState;
    default:
      return state;
  }
};
// Reducer mb separate File!

type FilterContextType = ReturnType<typeof FilterManager>;

const initialContext = {
  ...initialState,
  setFilter: () => false,
};
const FilterContext = createContext<FilterContextType>(initialContext);

interface IFilterManagerResult {
  key: string;
  setFilter: (filter: string) => void;
}

const FilterManager = (): IFilterManagerResult => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Set an Filter
  const setFilter = (key: string) => {
    console.log('setFilter,', key);
    dispatch({
      type: 'SET_FILTER',
      payload: key,
    });
  };

  return { ...state, setFilter };
};

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <FilterContext.Provider value={FilterManager()}>{children}</FilterContext.Provider>
);

export default FilterContext;
