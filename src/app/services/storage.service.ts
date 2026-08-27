const STORAGE_PREFIX = 'crm-lite-';

export class StorageService {
  private prefix: string;

  constructor(namespace: string) {
    this.prefix = STORAGE_PREFIX + namespace;
  }

  private key(k: string): string {
    return `${this.prefix}-${k}`;
  }

  load<T>(storeKey: string): T[] {
    try {
      const raw = localStorage.getItem(this.key(storeKey));
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as T[];
    } catch {
      console.error(`Failed to load from localStorage key: ${this.key(storeKey)}`);
      return [];
    }
  }

  save<T>(storeKey: string, data: T[]): void {
    try {
      localStorage.setItem(this.key(storeKey), JSON.stringify(data));
    } catch (e) {
      console.error(`Failed to save to localStorage (quota exceeded?): ${this.key(storeKey)}`, e);
      throw new Error('Failed to save data. Storage may be full.');
    }
  }
}
