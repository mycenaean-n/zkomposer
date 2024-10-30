'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

interface LocalStorageState {
  [key: string]: any;
}

type LocalStorageAction =
  | { type: 'SET_ITEM'; key: string; value: any }
  | { type: 'REMOVE_ITEM'; key: string };

interface LocalStorageContextType {
  state: LocalStorageState;
  dispatch: Dispatch<LocalStorageAction>;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const localStorageReducer = (
  state: LocalStorageState,
  action: LocalStorageAction
): LocalStorageState => {
  switch (action.type) {
    case 'SET_ITEM':
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(action.key, JSON.stringify(action.value));
      }
      return { ...state, [action.key]: action.value };

    case 'REMOVE_ITEM':
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(action.key);
      }
      const newState = { ...state };
      delete newState[action.key];
      return newState;

    default:
      return state;
  }
};

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(localStorageReducer, {});

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.newValue) {
        dispatch({
          type: 'SET_ITEM',
          key: event.key,
          value: JSON.parse(event.newValue),
        });
      } else if (event.key && event.newValue === null) {
        dispatch({ type: 'REMOVE_ITEM', key: event.key });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ state, dispatch }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

// Custom hook to access the LocalStorageContext
const useLocalStorageContext = () => {
  const context = useContext(LocalStorageContext);
  if (context === undefined) {
    throw new Error(
      'useLocalStorageContext must be used within a LocalStorageProvider'
    );
  }
  return context;
};

// Hook to get and set specific keys
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  console.log('lol');

  const { state, dispatch } = useLocalStorageContext();

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue === null) {
      dispatch({ type: 'SET_ITEM', key, value: initialValue });
    } else {
      dispatch({ type: 'SET_ITEM', key, value: JSON.parse(storedValue) });
    }
  }, [key, initialValue, dispatch]);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore =
      value instanceof Function ? value(state[key] ?? initialValue) : value;
    dispatch({ type: 'SET_ITEM', key, value: valueToStore });
  };

  return [state[key] ?? initialValue, setValue];
}
