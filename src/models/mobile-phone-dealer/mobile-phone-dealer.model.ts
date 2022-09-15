import { Client } from '../clients/client.model';
interface StocksOfSparesAndAccessories {
  particular: string;
  numberOfUnits: number;
}

interface MobilePhone {
  model: string;
  imeiNumber: string;
  source: string;
}

interface SIM {
  simNumber: string;
  mobilePhoneCompany: string;
}

interface SundryOfInformation {
  oneCb: string;
  twoCb: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface MobilePhoneDealer {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  listOfStocksOfSparesAndAccessories: StocksOfSparesAndAccessories[];
  listOfStocksOfMobilePhone: MobilePhone[];
  listOfStocksOfSubscriberIdentificationModule: SIM[];
  sundryOfInformation: SundryOfInformation;
  remarksDeficienciesDiscrepanciesNoted: string;
  inspectedBy: string;
  ownerInfo: OwnerInfo;
  recommendations: string;
  notedBy: string;
  notedByApproved: string;
  regionalDirector: string;
  regionalDirectorApproved: string;
}
