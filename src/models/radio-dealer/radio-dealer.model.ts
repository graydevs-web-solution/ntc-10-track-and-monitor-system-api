import { Client } from '../clients/client.model';
interface SupervisingECE {
  name: string;
  licenseNumber: string;
  expiryDate: Date | string;
  ptrNumber: string;
  dateIssued: Date | string;
}

interface Technician {
  name: string;
  particularsOfLicense: string;
  expiryDate: Date | string;
}

interface DiagnosticTestEquipmentAndMeasuringInstrumentInfo {
  reflectometer: boolean;
  frequencyCounter: boolean;
  powerMeter: boolean;
  vtvmDigitalMultimeter: boolean;
  signalGenerator: boolean;
  oscilloscope: boolean;
  vomDigitalMultimeter: boolean;
  dummyLoadAntenna: boolean;
}

export interface RadioDealer {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  supervisingECE: SupervisingECE[];
  radioTechnicians: Technician[];
  diagnosticTestEquipmentAndMeasuringInstrumentInfo: DiagnosticTestEquipmentAndMeasuringInstrumentInfo;
  isLaboratoryRoomShielded: boolean;
  remarks: string;
  radioRegulationInspector: string;
  ownerName: string;
  recommendations: string;
  notedBy: string;
  notedByApproved: string;
  regionalDirector: string;
  regionalDirectorApproved: string;
}
