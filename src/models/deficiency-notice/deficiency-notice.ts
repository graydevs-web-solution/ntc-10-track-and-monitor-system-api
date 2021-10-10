import { Client } from '../clients/client.model';
interface TransmittersInfo {
  transmitter: string;
  serialNumber: string;
}

interface ViolationInfo {
  operationWithoutRSL: boolean;
  operationWithoutLRO: boolean;
  operationUnauthorizedFrequency: boolean;
  possessionTransmitterWithoutPP: boolean;
  noNTCPertinentPapers: boolean;
}

export interface DeficiencyNotice {
  id?: number;
  date: Date | string;
  clientId: number | Client;
  respondentName: string;
  docketNumber: string;
  clientName?: string;
  violationInfo: ViolationInfo;
  dateOfInspection: Date | string;
  transmitters: TransmittersInfo[];
  dateOfDeficiencyHearing: Date | string;
  isDone: boolean;
  regionalDirector: string;
}
