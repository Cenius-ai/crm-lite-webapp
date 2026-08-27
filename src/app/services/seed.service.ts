import { Injectable } from '@angular/core';
import { CompanyService } from './company.service';
import { ContactService } from './contact.service';
import { DealService } from './deal.service';

@Injectable({ providedIn: 'root' })
export class SeedService {
  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private dealService: DealService,
  ) {}

  runIfEmpty(): void {
    if (this.companyService.getAll().length > 0) return;

    const acme = this.companyService.create({
      name: 'Acme Corporation',
      industry: 'Manufacturing',
      phone: '+1-415-555-0101',
      website: 'https://acmecorp.example.com',
      address: '1200 Industrial Blvd, San Francisco, CA 94107',
    });

    const globex = this.companyService.create({
      name: 'Globex Industries',
      industry: 'Technology',
      phone: '+1-212-555-0202',
      website: 'https://globex.example.com',
      address: '450 Park Avenue, New York, NY 10022',
    });

    const wayne = this.companyService.create({
      name: 'Wayne Enterprises',
      industry: 'Defense & Aerospace',
      phone: '+1-312-555-0303',
      website: 'https://wayne-ent.example.com',
      address: '1000 Lake Shore Drive, Chicago, IL 60611',
    });

    const stark = this.companyService.create({
      name: 'Stark Industries',
      industry: 'Clean Energy',
      phone: '+1-310-555-0404',
      website: 'https://stark.example.com',
      address: '10880 Malibu Point, Malibu, CA 90265',
    });

    const umbrellacorp = this.companyService.create({
      name: 'Umbrella Corporation',
      industry: 'Pharmaceuticals',
      phone: '+1-617-555-0505',
      website: 'https://umbrella.example.com',
      address: '1 Innovation Drive, Cambridge, MA 02142',
    });

    const initech = this.companyService.create({
      name: 'Initech Solutions',
      industry: 'Software',
      phone: '+1-512-555-0606',
      website: 'https://initech.example.com',
      address: '4120 Freidrich Lane, Austin, TX 78744',
    });

    const wonka = this.companyService.create({
      name: 'Wonka Confectionery',
      industry: 'Food & Beverage',
      phone: '+1-303-555-0707',
      website: 'https://wonka.example.com',
      address: '100 Chocolate Avenue, Denver, CO 80202',
    });

    const cyberdyne = this.companyService.create({
      name: 'Cyberdyne Systems',
      industry: 'Robotics',
      phone: '+1-408-555-0808',
      website: 'https://cyberdyne.example.com',
      address: '18144 El Camino Real, Sunnyvale, CA 94087',
    });

    // Contacts
    const c1 = this.contactService.create({
      firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@acmecorp.example.com',
      phone: '+1-415-555-1001', title: 'VP of Operations', companyId: acme.id,
    });
    const c2 = this.contactService.create({
      firstName: 'Bob', lastName: 'Martinez', email: 'bob.martinez@acmecorp.example.com',
      phone: '+1-415-555-1002', title: 'Procurement Manager', companyId: acme.id,
    });
    const c3 = this.contactService.create({
      firstName: 'Carol', lastName: 'Chen', email: 'carol.chen@globex.example.com',
      phone: '+1-212-555-2001', title: 'CTO', companyId: globex.id,
    });
    const c4 = this.contactService.create({
      firstName: 'David', lastName: 'Washington', email: 'david.w@globex.example.com',
      phone: '+1-212-555-2002', title: 'Director of Sales', companyId: globex.id,
    });
    const c5 = this.contactService.create({
      firstName: 'Elena', lastName: 'Rodriguez', email: 'elena.r@wayne-ent.example.com',
      phone: '+1-312-555-3001', title: 'CEO', companyId: wayne.id,
    });
    const c6 = this.contactService.create({
      firstName: 'Frank', lastName: 'Okonkwo', email: 'frank.o@wayne-ent.example.com',
      phone: '+1-312-555-3002', title: 'Head of R&D', companyId: wayne.id,
    });
    const c7 = this.contactService.create({
      firstName: 'Grace', lastName: 'Park', email: 'grace.park@stark.example.com',
      phone: '+1-310-555-4001', title: 'Chief Engineer', companyId: stark.id,
    });
    const c8 = this.contactService.create({
      firstName: 'Henry', lastName: 'Gupta', email: 'henry.g@umbrella.example.com',
      phone: '+1-617-555-5001', title: 'Research Director', companyId: umbrellacorp.id,
    });
    const c9 = this.contactService.create({
      firstName: 'Iris', lastName: 'Fischer', email: 'iris.f@initech.example.com',
      phone: '+1-512-555-6001', title: 'Product Manager', companyId: initech.id,
    });
    const c10 = this.contactService.create({
      firstName: 'James', lastName: 'Nkosi', email: 'james.n@initech.example.com',
      phone: '+1-512-555-6002', title: 'Lead Developer', companyId: initech.id,
    });
    const c11 = this.contactService.create({
      firstName: 'Karen', lastName: 'Tanaka', email: 'karen.t@wonka.example.com',
      phone: '+1-303-555-7001', title: 'Supply Chain Director', companyId: wonka.id,
    });
    const c12 = this.contactService.create({
      firstName: 'Leo', lastName: 'Andersson', email: 'leo.a@cyberdyne.example.com',
      phone: '+1-408-555-8001', title: 'Systems Architect', companyId: cyberdyne.id,
    });
    const c13 = this.contactService.create({
      firstName: 'Maria', lastName: 'Santos', email: 'maria.s@acmecorp.example.com',
      phone: '+1-415-555-1003', title: 'Logistics Coordinator', companyId: acme.id,
    });
    const c14 = this.contactService.create({
      firstName: 'Nate', lastName: 'Briggs', email: 'nate.b@globex.example.com',
      phone: '+1-212-555-2003', title: 'Solutions Engineer', companyId: globex.id,
    });
    const c15 = this.contactService.create({
      firstName: 'Olivia', lastName: 'Mensah', email: 'olivia.m@stark.example.com',
      phone: '+1-310-555-4002', title: 'Project Lead', companyId: stark.id,
    });

    // Deals across all stages
    this.dealService.create({
      name: 'Industrial Supply Contract', amount: 250000, stage: 'lead',
      companyId: acme.id, contactId: c1.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Factory Expansion Parts', amount: 180000, stage: 'qualified',
      companyId: acme.id, contactId: c2.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Annual Maintenance Agreement', amount: 95000, stage: 'won',
      companyId: acme.id, contactId: c1.id, closeDate: '2025-01-15T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Cloud Migration Services', amount: 420000, stage: 'qualified',
      companyId: globex.id, contactId: c3.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Enterprise Software Licenses', amount: 310000, stage: 'lead',
      companyId: globex.id, contactId: c4.id, closeDate: null,
    });
    this.dealService.create({
      name: 'IT Infrastructure Overhaul', amount: 550000, stage: 'won',
      companyId: globex.id, contactId: c3.id, closeDate: '2025-02-28T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Defense Systems Upgrade', amount: 1200000, stage: 'qualified',
      companyId: wayne.id, contactId: c5.id, closeDate: null,
    });
    this.dealService.create({
      name: 'R&D Partnership', amount: 800000, stage: 'lead',
      companyId: wayne.id, contactId: c6.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Clean Energy Pilot Program', amount: 675000, stage: 'won',
      companyId: stark.id, contactId: c7.id, closeDate: '2025-01-20T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Solar Panel Installation', amount: 290000, stage: 'lost',
      companyId: stark.id, contactId: c15.id, closeDate: '2025-02-10T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Pharma Research Collaboration', amount: 940000, stage: 'qualified',
      companyId: umbrellacorp.id, contactId: c8.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Custom Software Development', amount: 165000, stage: 'lead',
      companyId: initech.id, contactId: c9.id, closeDate: null,
    });
    this.dealService.create({
      name: 'Mobile App Redesign', amount: 89000, stage: 'won',
      companyId: initech.id, contactId: c10.id, closeDate: '2025-03-01T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Distribution Network Setup', amount: 210000, stage: 'lost',
      companyId: wonka.id, contactId: c11.id, closeDate: '2025-01-30T00:00:00.000Z',
    });
    this.dealService.create({
      name: 'Robotics Automation Line', amount: 780000, stage: 'qualified',
      companyId: cyberdyne.id, contactId: c12.id, closeDate: null,
    });
  }
}
