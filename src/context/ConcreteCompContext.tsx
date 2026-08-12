import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ConcreteComp } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  ConcreteCompInput,
  ConcreteCompStage,
  createConcreteComp,
  deleteConcreteComp,
  fetchConcreteComps,
  updateConcreteComp
} from '../lib/concreteComps';

export type ConcreteCompOperation = 'idle' | ConcreteCompStage;

interface ConcreteCompContextType {
  items: ConcreteComp[];
  loading: boolean;
  loadError: string | null;
  operation: ConcreteCompOperation;
  isBusy: boolean;
  configured: boolean;
  refresh: () => Promise<void>;
  createItem: (input: ConcreteCompInput) => Promise<void>;
  updateItem: (current: ConcreteComp, input: ConcreteCompInput) => Promise<void>;
  deleteItem: (item: ConcreteComp) => Promise<void>;
}

const ConcreteCompContext = createContext<ConcreteCompContextType | undefined>(undefined);

function toMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Holds the Supabase-backed gallery records so the public gallery and the
 * admin panel always stay in sync without a manual page reload.
 */
export const ConcreteCompProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ConcreteComp[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [operation, setOperation] = useState<ConcreteCompOperation>('idle');

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setLoadError(
        'Supabase no está configurado: falta VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env.'
      );
      return;
    }

    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchConcreteComps();
      setItems(rows);
    } catch (error) {
      console.error('[ConcreteComp] Could not load records', error);
      setLoadError(toMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createItem = useCallback(async (input: ConcreteCompInput) => {
    try {
      const created = await createConcreteComp(input, { onStage: setOperation });
      setItems((prev) => [created, ...prev]);
    } finally {
      setOperation('idle');
    }
  }, []);

  const updateItem = useCallback(async (current: ConcreteComp, input: ConcreteCompInput) => {
    try {
      const updated = await updateConcreteComp(current, input, { onStage: setOperation });
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } finally {
      setOperation('idle');
    }
  }, []);

  const deleteItem = useCallback(async (item: ConcreteComp) => {
    try {
      await deleteConcreteComp(item, { onStage: setOperation });
      setItems((prev) => prev.filter((row) => row.id !== item.id));
    } finally {
      setOperation('idle');
    }
  }, []);

  return (
    <ConcreteCompContext.Provider
      value={{
        items,
        loading,
        loadError,
        operation,
        isBusy: operation !== 'idle',
        configured: isSupabaseConfigured,
        refresh,
        createItem,
        updateItem,
        deleteItem
      }}
    >
      {children}
    </ConcreteCompContext.Provider>
  );
};

export const useConcreteComps = () => {
  const context = useContext(ConcreteCompContext);
  if (!context) {
    throw new Error('useConcreteComps must be used within a ConcreteCompProvider');
  }
  return context;
};
