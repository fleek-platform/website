type AgentType = 'standard' | 'tee';
type PlanNumber = 1 | 2 | 3 | 4 | 5;

export type Plan = {
  agentType: AgentType;
  plan: PlanNumber;
};

type Options = {
  value: AgentType;
  label: string;
  multiplier: number;
};

export const OPTIONS: Options[] = [
  { value: 'standard', label: 'Standard', multiplier: 1 },
  { value: 'tee', label: 'TEE-enabled', multiplier: 2 },
];

type Plans = {
  plan: PlanNumber;
  label: string;
  basePrice: number;
};

export const PLANS: Plans[] = [
  {
    plan: 1,
    label: '1',
    basePrice: 10,
  },
  {
    plan: 2,
    label: '2-5',
    basePrice: 25,
  },
  {
    plan: 3,
    label: '6-25',
    basePrice: 50,
  },
  {
    plan: 4,
    label: '26-100',
    basePrice: 100,
  },
  {
    plan: 5,
    label: '100+',
    basePrice: 0,
  },
];
