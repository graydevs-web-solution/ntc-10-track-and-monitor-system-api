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

interface TimeInfo {
  hour: number;
  minute: number;
}

export interface Complaint {
  id?: number;
  date: Date | string;
  complainantName: string;
  clientId: number | Client;
  clientName?: string;
  respondentName: string;
  docketNumber: string;
  dateOfInspection: Date | string;
  location: string;
  reason: string;
  transmitters: TransmittersInfo[];
  violationInfo: ViolationInfo;
  dateOfHearing: Date | string;
  timeOfHearing: TimeInfo;
  regionalDirector: string;
  isDone: boolean;
}
