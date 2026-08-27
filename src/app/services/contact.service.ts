import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { StorageService } from './storage.service';

const STORE_KEY = 'contacts';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private storage = new StorageService('contacts');

  getAll(): Contact[] {
    return this.storage.load<Contact>(STORE_KEY);
  }

  getById(id: string): Contact | undefined {
    return this.getAll().find((c) => c.id === id);
  }

  getByCompanyId(companyId: string): Contact[] {
    return this.getAll().filter((c) => c.companyId === companyId);
  }

  search(query: string): Contact[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAll();
    return this.getAll().filter(
      (c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }

  create(data: Omit<Contact, 'id' | 'createdAt'>): Contact {
    const contact: Contact = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const all = this.getAll();
    all.push(contact);
    this.storage.save(STORE_KEY, all);
    return contact;
  }

  update(id: string, data: Partial<Omit<Contact, 'id' | 'createdAt'>>): Contact | undefined {
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
