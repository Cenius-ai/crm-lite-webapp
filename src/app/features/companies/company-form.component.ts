import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  standalone: true,
  selector: 'app-company-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  @Input() company: Company | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      industry: ['', Validators.maxLength(80)],
      phone: ['', Validators.maxLength(30)],
      website: ['', Validators.maxLength(200)],
      address: ['', Validators.maxLength(250)],
    });
  }

  ngOnInit(): void {
    if (this.company) {
      this.form.patchValue({
        name: this.company.name,
        industry: this.company.industry,
        phone: this.company.phone,
        website: this.company.website,
        address: this.company.address,
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const data = this.form.value;
    if (this.company) {
      this.companyService.update(this.company.id, data);
    } else {
      this.companyService.create(data);
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
    if (ctrl.hasError('maxlength')) return 'Too long';
    return null;
  }
}
