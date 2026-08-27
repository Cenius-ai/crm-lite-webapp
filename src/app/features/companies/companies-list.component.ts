import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { CompanyFormComponent } from './company-form.component';

@Component({
  standalone: true,
  selector: 'app-companies-list',
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  showForm = false;
  editingCompany: Company | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companies = this.companyService.getAll();
  }

  selectCompany(company: Company): void {
    this.selectedCompany = company;
  }

  openAddForm(): void {
    this.editingCompany = null;
    this.showForm = true;
  }

  openEditForm(company: Company): void {
    this.editingCompany = company;
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.editingCompany = null;
    this.loadCompanies();
    if (this.selectedCompany && this.editingCompany) {
      const refreshed = this.companyService.getById(this.selectedCompany.id);
      this.selectedCompany = refreshed ?? null;
    }
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingCompany = null;
  }

  deleteCompany(company: Company): void {
    if (!confirm(`Delete "${company.name}"? This cannot be undone.`)) return;
    this.companyService.delete(company.id);
    if (this.selectedCompany?.id === company.id) {
      this.selectedCompany = null;
    }
    this.loadCompanies();
  }
}
