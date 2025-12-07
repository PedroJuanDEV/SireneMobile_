import React, { createContext, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@/src/api/config';

const STORAGE_KEY = 'SAVED_REGISTROS_V1';

type RegistroData = any;

type FormStoreContextType = {
  saveRegistro: (data: RegistroData) => Promise<{ offline?: boolean; ok?: boolean; result?: any }>;
  getSaved: () => Promise<any[]>;
  removeSaved: (localId: string) => Promise<void>;
  syncAll: () => Promise<{ synced: number; failed: number }>;
};

const FormStoreContext = createContext<FormStoreContextType | null>(null);

export const useFormStore = () => {
  const ctx = useContext(FormStoreContext);
  if (!ctx) throw new Error('useFormStore must be used within FormStoreProvider');
  return ctx;
};

async function readSaved(): Promise<any[]> {
  try {
    const raw = await SecureStore.getItemAsync(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Erro ao ler saved registros', err);
    return [];
  }
}

async function writeSaved(list: any[]) {
  try {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Erro ao gravar saved registros', err);
  }
}

export const FormStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saveRegistro = async (data: RegistroData) => {
    // cria um id local
    const localId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const payload = { ...data };

    try {
      // tenta enviar para API
      const token = await SecureStore.getItemAsync('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/registro-ocorrencia`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // falha no envio — salva localmente
        const saved = await readSaved();
        saved.push({ _localId: localId, payload, createdAt: new Date().toISOString() });
        await writeSaved(saved);
        return { offline: true };
      }

      const json = await res.json();
      return { ok: true, result: json };
    } catch (err) {
      // erro de rede — salvar localmente
      console.warn('Erro ao enviar registro, salvando localmente', err);
      const saved = await readSaved();
      saved.push({ _localId: localId, payload, createdAt: new Date().toISOString() });
      await writeSaved(saved);
      return { offline: true };
    }
  };

  const getSaved = async () => {
    return readSaved();
  };

  const removeSaved = async (localId: string) => {
    const saved = await readSaved();
    const filtered = saved.filter((s) => s._localId !== localId);
    await writeSaved(filtered);
  };

  const syncAll = async () => {
    const saved = await readSaved();
    if (!saved.length) return { synced: 0, failed: 0 };
    let synced = 0;
    let failed = 0;
    const token = await SecureStore.getItemAsync('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    for (const item of saved) {
      try {
        const res = await fetch(`${API_BASE_URL}/registro-ocorrencia`, {
          method: 'POST',
          headers,
          body: JSON.stringify(item.payload),
        });
        if (res.ok) {
          synced++;
        } else {
          failed++;
        }
      } catch (err) {
        failed++;
      }
    }

    if (synced > 0) {
      // remover os que foram sincronizados
      await writeSaved([]);
    }

    return { synced, failed };
  };

  return (
    <FormStoreContext.Provider value={{ saveRegistro, getSaved, removeSaved, syncAll }}>
      {children}
    </FormStoreContext.Provider>
  );
};

export default FormStoreProvider;
