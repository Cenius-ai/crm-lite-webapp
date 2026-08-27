import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Deal, STAGE_LABELS, DealStage } from '../../models/deal.model';
import { Company } from '../../models/company.model';
import { Contact } from '../../models/contact.model';
import { DealService } from '../../services/deal.service';
import { CompanyService } from '../../services/company.service';
import { ContactService } from '../../services/contact.service';
import { DealFormComponent } from './deal-form.component';

@Component({
  standalone: true,
  selector: 'app-deals-list',
  imports: [CommonModule, DealFormComponent],
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss'],
})
export class DealsListComponent implements OnInit {
  deals: Deal[] = [];
  companies: Company[] = [];
  contacts: Contact[] = [];
  stageLabels = STAGE_LABELS;
  showForm = false;
  editingDeal: Deal | null = null;

  constructor(
    private dealService: DealService,
    private companyService: CompanyService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.loadDeals();
    this.companies = this.companyService.getAll();
    this.contacts = this.contactService.getAll();
  }

  loadDeals(): void {
    this.deals = this.dealService.getAll();
  }

  getCompanyName(companyId: string): string {
    return this.companies.find((c) => c.id === companyId)?.name ?? 'Unknown';
  }

  getContactName(contactId: string | null): string {
    if (!contactId) return '—';
    const c = this.contacts.find((ct) => ct.id === contactId);
    return c ? `${c.firstName} ${c.lastName}` : 'Unknown';
  }

  formatAmount(amount: number): string {
    return '$' + amount.toLocaleString('en-US');
  }

  openAddForm(): void {
    this.editingDeal = null;
    this.showForm = true;
  }

  openEditForm(deal: Deal): void {
    this.editingDeal = deal;
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.editingDeal = null;
    this.loadDeals();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingDeal = null;
  }

  deleteDeal(deal: Deal): void {
    if (!confirm(`Delete deal "${deal.name}"? This cannot be undone.`)) return;
    this.dealService.delete(deal.id);
    this.loadDeals();
  }

  stageClass(stage: DealStage): string {
    return 'stage-' + stage;
  }
}
