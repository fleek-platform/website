import { isClient } from './common';

export type StorageItem<T> = {
  value: T;
  /** ISO string for expiration datetime */
  expiresAt: string;
};

export type StorageKey = 'fleek-xyz-marketing';

export const setItem = <T>(
  key: StorageKey,
  value: T,
  expiresInDays: number,
): void => {
  if (!isClient) return;

  const expiresAt = new Date(
    Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  ).toISOString();
  const storageItem: StorageItem<T> = { value, expiresAt };

  localStorage.setItem(key, JSON.stringify(storageItem));
};

export const getItem = <T>(key: StorageKey): T | null => {
  if (!isClient) return null;

  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item: StorageItem<T> = JSON.parse(itemStr);

    // handle expired item
    if (new Date(item.expiresAt) < new Date()) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('Error parsing localStorage item:', error);

    return null;
  }
};

export const removeItem = (key: StorageKey): void => {
  if (!isClient) return;

  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  if (!isClient) return;

  localStorage.clear();
};
