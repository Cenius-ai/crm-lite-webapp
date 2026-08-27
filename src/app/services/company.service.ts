import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { StorageService } from './storage.service';

const STORE_KEY = 'companies';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private storage = new StorageService('companies');

  getAll(): Company[] {
    return this.storage.load<Company>(STORE_KEY);
  }

  getById(id: string): Company | undefined {
    return this.getAll().find((c) => c.id === id);
  }

  create(data: Omit<Company, 'id' | 'createdAt'>): Company {
    const company: Company = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const all = this.getAll();
    all.push(company);
    this.storage.save(STORE_KEY, all);
    return company;
  }

  update(id: string, data: Partial<Omit<Company, 'id' | 'createdAt'>>): Company | undefined {
    const all = this.getAll();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    all[idx] = { ...all[idx], ...data };
    this.storage.save(STORE_KEY, all);
    return all[idx];
  }

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((c) => c.id !== id);
    if (filtered.length === all.length) return false;
    this.storage.save(STORE_KEY, filtered);
    return true;
  }
}
