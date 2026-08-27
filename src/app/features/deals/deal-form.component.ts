import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deal, DEAL_STAGES, STAGE_LABELS } from '../../models/deal.model';
import { Company } from '../../models/company.model';
import { Contact } from '../../models/contact.model';
import { DealService } from '../../services/deal.service';

@Component({
  standalone: true,
  selector: 'app-deal-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deal-form.component.html',
  styleUrls: ['./deal-form.component.scss'],
})
export class DealFormComponent implements OnInit {
  @Input() deal: Deal | null = null;
  @Input() companies: Company[] = [];
  @Input() contacts: Contact[] = [];
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;
  stages = DEAL_STAGES;
  stageLabels = STAGE_LABELS;

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      amount: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      stage: ['lead', Validators.required],
      companyId: [null, Validators.required],
      contactId: [null],
    });
  }

  ngOnInit(): void {
    if (this.deal) {
      this.form.patchValue({
        name: this.deal.name,
        amount: this.deal.amount,
        stage: this.deal.stage,
        companyId: this.deal.companyId,
        contactId: this.deal.contactId,
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const raw = this.form.value;
    const data = {
      name: raw.name,
      amount: raw.amount,
      stage: raw.stage,
      companyId: raw.companyId,
      contactId: raw.contactId || null,
      closeDate: raw.stage === 'won' || raw.stage === 'lost' ? new Date().toISOString() : null,
    };

    if (this.deal) {
      this.dealService.update(this.deal.id, data);
    } else {
      this.dealService.create(data);
    }
    this.saved.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  fieldError(field: string): string | null {
    const ctrl = this.form.get(field);
    if (!ctrl || !(this.submitted || ctrl.touched)) return null;
    if (ctrl.hasError('required')) return 'Required';
    if (ctrl.hasError('min')) return 'Must be positive';
    if (ctrl.hasError('max')) return 'Value too large';
    if (ctrl.hasError('maxlength')) return 'Too long';
    return null;
  }

  filteredContacts(): Contact[] {
    const companyId = this.form.get('companyId')?.value;
    if (!companyId) return [];
    return this.contacts.filter((c) => c.companyId === companyId);
  }
}
