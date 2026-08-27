export type DealStage = 'lead' | 'qualified' | 'won' | 'lost';

export const DEAL_STAGES: DealStage[] = ['lead', 'qualified', 'won', 'lost'];

export const STAGE_LABELS: Record<DealStage, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  won: 'Won',
  lost: 'Lost',
};

export interface Deal {
  id: string;
  name: string;
  amount: number;
  stage: DealStage;
  companyId: string;
  contactId: string | null;
  closeDate: string | null;
  createdAt: string;
}
