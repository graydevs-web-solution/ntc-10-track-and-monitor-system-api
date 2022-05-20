import { Client } from '../clients/client.model';

interface ServiceOrTestEquipments {
  particular: string;
  numberOfUnits: number;
}

interface EmployedElectronicsTechnicians {
  name: string;
  qualifications: string;
}

interface SundryOfInformation {
  one: string;
  two: string;
  three: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface ServiceCenterReport {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  listOfServiceOrTestEquipments: ServiceOrTestEquipments[];
  employedElectronicsTechnicians: EmployedElectronicsTechnicians[];
  sundryOfInformation: SundryOfInformation;
  remarksDeficienciesDiscrepanciesNoted: string;
  inspectedBy: string;
  ownerInfo: OwnerInfo;
  recommendations: string;
  notedBy: string;
  notedByApproved: boolean;
  regionalDirector: string;
  regionalDirectorApproved: boolean;
}
