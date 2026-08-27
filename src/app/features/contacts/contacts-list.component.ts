import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { Company } from '../../models/company.model';
import { ContactService } from '../../services/contact.service';
import { CompanyService } from '../../services/company.service';
import { ContactFormComponent } from './contact-form.component';

@Component({
  standalone: true,
  selector: 'app-contacts-list',
  imports: [CommonModule, FormsModule, ContactFormComponent],
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  companies: Company[] = [];
  searchQuery = '';
  showForm = false;
  editingContact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.companies = this.companyService.getAll();
  }

  loadContacts(): void {
    this.contacts = this.contactService.search(this.searchQuery);
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.loadContacts();
  }

  getCompanyName(companyId: string | null): string {
    if (!companyId) return '—';
    const company = this.companies.find((c) => c.id === companyId);
    return company?.name ?? 'Unknown';
  }

  openAddForm(): void {
    this.editingContact = null;
    this.showForm = true;
  }

  openEditForm(contact: Contact): void {
    this.editingContact = contact;
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.editingContact = null;
    this.loadContacts();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingContact = null;
  }

  deleteContact(contact: Contact): void {
    const name = `${contact.firstName} ${contact.lastName}`;
    if (!confirm(`Delete contact "${name}"? This cannot be undone.`)) return;
    this.contactService.delete(contact.id);
    this.loadContacts();
  }
}
