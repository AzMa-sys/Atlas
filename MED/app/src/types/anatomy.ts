export type SystemId = 'bones' | 'muscles' | 'organs' | 'vessels' | 'nerves';

export type RegionId = 'head' | 'torso' | 'upper' | 'lower';

export interface AnatomyItem {
  id: string;
  system: SystemId;
  region: RegionId;
  nameRu: string;
  nameLa: string;
  short: string;
  description: string;
  facts: string[];
}

export interface SystemDef {
  id: SystemId;
  nameRu: string;
  nameLa: string;
  color: string;
  description: string;
}

export interface RegionDef {
  id: RegionId;
  nameRu: string;
  nameLa: string;
}
