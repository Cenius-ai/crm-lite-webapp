import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Deal, DEAL_STAGES, DealStage, STAGE_LABELS } from '../../models/deal.model';
import { Company } from '../../models/company.model';
import { DealService } from '../../services/deal.service';
import { CompanyService } from '../../services/company.service';
import { DealFormComponent } from '../deals/deal-form.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

interface StageColumn {
  stage: DealStage;
  label: string;
  deals: Deal[];
}

@Component({
  standalone: true,
  selector: 'app-pipeline-board',
  imports: [CommonModule, DragDropModule, DealFormComponent],
  templateUrl: './pipeline-board.component.html',
  styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements OnInit {
  columns: StageColumn[] = [];
  companies: Company[] = [];
  contacts: Contact[] = [];
  stageLabels = STAGE_LABELS;
  showForm = false;

  constructor(
    private dealService: DealService,
    private companyService: CompanyService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.companies = this.companyService.getAll();
    this.contacts = this.contactService.getAll();
    this.refreshColumns();
  }

  refreshColumns(): void {
    this.columns = DEAL_STAGES.map((stage) => ({
      stage,
      label: STAGE_LABELS[stage],
      deals: this.dealService.getByStage(stage),
    }));
  }

  getColumnIds(): string[] {
    return DEAL_STAGES;
  }

  getCompanyName(companyId: string): string {
    return this.companies.find((c) => c.id === companyId)?.name ?? 'Unknown';
  }

  getContactName(contactId: string | null): string {
    if (!contactId) return '';
    const c = this.contacts.find((ct) => ct.id === contactId);
    return c ? `${c.firstName} ${c.lastName}` : '';
  }

  formatAmount(amount: number): string {
    return '$' + amount.toLocaleString('en-US');
  }

  columnTotal(col: StageColumn): number {
    return col.deals.reduce((sum, d) => sum + d.amount, 0);
  }

  onDrop(event: CdkDragDrop<Deal[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const deal = event.container.data[event.currentIndex];
      const newStage = event.container.id as DealStage;
      this.dealService.updateStage(deal.id, newStage);
      this.refreshColumns();
    }
  }

  moveToStage(deal: Deal, newStage: DealStage): void {
    this.dealService.updateStage(deal.id, newStage);
    this.refreshColumns();
  }

  openAddForm(): void {
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.refreshColumns();
  }

  onFormCancelled(): void {
    this.showForm = false;
  }

  deleteDeal(deal: Deal): void {
    if (!confirm(`Delete deal "${deal.name}"?`)) return;
    this.dealService.delete(deal.id);
    this.refreshColumns();
  }
}
