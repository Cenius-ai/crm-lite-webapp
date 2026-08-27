import { Injectable } from '@angular/core';
import { Deal, DealStage } from '../models/deal.model';
import { StorageService } from './storage.service';

const STORE_KEY = 'deals';

@Injectable({ providedIn: 'root' })
export class DealService {
  private storage = new StorageService('deals');

  getAll(): Deal[] {
    return this.storage.load<Deal>(STORE_KEY);
  }

  getById(id: string): Deal | undefined {
    return this.getAll().find((d) => d.id === id);
  }

  getByStage(stage: DealStage): Deal[] {
    return this.getAll().filter((d) => d.stage === stage);
  }

  getByCompanyId(companyId: string): Deal[] {
    return this.getAll().filter((d) => d.companyId === companyId);
  }

  getByContactId(contactId: string): Deal[] {
    return this.getAll().filter((d) => d.contactId === contactId);
  }

  create(data: Omit<Deal, 'id' | 'createdAt'>): Deal {
    const deal: Deal = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const all = this.getAll();
    all.push(deal);
    this.storage.save(STORE_KEY, all);
    return deal;
  }

  update(id: string, data: Partial<Omit<Deal, 'id' | 'createdAt'>>): Deal | undefined {
    const all = this.getAll();
    const idx = all.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;
    all[idx] = { ...all[idx], ...data };
    this.storage.save(STORE_KEY, all);
    return all[idx];
  }

  updateStage(id: string, stage: DealStage): Deal | undefined {
    return this.update(id, { stage });
  }

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((d) => d.id !== id);
    if (filtered.length === all.length) return false;
    this.storage.save(STORE_KEY, filtered);
    return true;
  }
}
