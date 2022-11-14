import { useListCategories } from "api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FinanceContextInterface {
  displayMode: string;
  setDisplayMode: () => void;
  selectedAccount: string | null;
  setSelectedAccount: (accountName: string) => void;
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  categories: string[];
  appendCategory: (category: string) => void;
  subcategories: string[];
  appendSubcategories: (subcategory: string) => void;
}

const defaultValue = {
  displayMode: "light",
  setDisplayMode: () => {},
  selectedAccount: null,
  setSelectedAccount: (accountName: string) => {},
  privacyMode: false,
  togglePrivacyMode: () => {},
  categories: [],
  appendCategory: (category: string) => {},
  subcategories: [],
  appendSubcategories: (subcategory: string) => {},
};

const FinanceContext = createContext<FinanceContextInterface>(defaultValue);
FinanceContext.displayName = "FinanceContext";

type Props = {
  children: ReactNode;
};

type Categories = {
  categories: string[];
  subcategories: string[];
};

export const FinanceContextProvider = ({ children }: Props) => {
  const getCategories = useListCategories();

  useEffect(() => {
    if (getCategories.data) {
      setData((prev) => {
        return {
          ...prev,
          categories: getCategories.data.categories,
          subcategories: getCategories.data.subcategories,
        };
      });
    }
  }, [getCategories.isSuccess]);

  const appendCategory = (category: string) => {
    setData((prev) => {
      const categories = prev.categories;
      categories.push(category);
      return {
        ...prev,
        categories: categories,
      };
    });
  };

  const appendSubcategories = (subcategory: string) => {
    setData((prev) => {
      const subcategories = prev.subcategories;
      subcategories.push(subcategory);
      return {
        ...prev,
        subcategories: subcategories,
      };
    });
  };

  const setSelectedAccount = (account: string) => {
    setData((prev) => {
      return {
        ...prev,
        selectedAccount: account,
      };
    });
  };

  const setDisplayMode = () => {
    setData((prev) => {
      return {
        ...prev,
        displayMode: prev.displayMode === "light" ? "dark" : "light",
      };
    });
  };

  const togglePrivacyMode = () => {
    setData((prev) => {
      return {
        ...prev,
        privacyMode: !prev.privacyMode,
      };
    });
  };

  const [providerData, setData] = useState<FinanceContextInterface>({
    ...defaultValue,
    setDisplayMode,
    setSelectedAccount,
    togglePrivacyMode,
    appendCategory,
    appendSubcategories,
  });

  return (
    <FinanceContext.Provider value={providerData}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceContext Provider");
  }
  return context;
};
