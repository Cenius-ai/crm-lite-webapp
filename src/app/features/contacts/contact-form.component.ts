import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { Company } from '../../models/company.model';
import { ContactService } from '../../services/contact.service';

@Component({
  standalone: true,
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Input() companies: Company[] = [];
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      phone: ['', Validators.maxLength(30)],
      title: ['', Validators.maxLength(80)],
      companyId: [null],
    });
  }

  ngOnInit(): void {
    if (this.contact) {
      this.form.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email,
        phone: this.contact.phone,
        title: this.contact.title,
        companyId: this.contact.companyId,
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const raw = this.form.value;
    const data = { ...raw, companyId: raw.companyId || null };

    if (this.contact) {
      this.contactService.update(this.contact.id, data);
    } else {
      this.contactService.create(data);
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
    if (ctrl.hasError('email')) return 'Invalid email';
    if (ctrl.hasError('maxlength')) return 'Too long';
    return null;
  }
}
