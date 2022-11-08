import { createContext, ReactNode, useContext, useState } from "react";

interface FinanceContextInterface {
  displayMode: string;
  setDisplayMode: () => void;
  selectedAccount: string | null;
  setSelectedAccount: (accountName: string) => void;
}

const defaultValue = {
  displayMode: "light",
  setDisplayMode: () => {},
  selectedAccount: null,
  setSelectedAccount: (accountName: string) => {},
};

const FinanceContext = createContext<FinanceContextInterface>(defaultValue);
FinanceContext.displayName = "FinanceContext";

type Props = {
  children: ReactNode;
};

export const FinanceContextProvider = ({ children }: Props) => {
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

  const [data, setData] = useState<FinanceContextInterface>({
    ...defaultValue,
    setDisplayMode,
    setSelectedAccount,
  });

  return (
    <FinanceContext.Provider value={data}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceContext Provider");
  }
  return context;
};
