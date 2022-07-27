import { Client } from '../clients/client.model';
import { UserAssignedData } from '../system-setting/user_assigned-data';
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
  docketNumberDescription: string;
  docketNumberStart: number;
  docketNumberEnd: number;
  clientName?: string;
  violationInfo: ViolationInfo;
  dateOfInspection: Date | string;
  transmitters: TransmittersInfo[];
  dateOfDeficiencyHearing: Date | string;
  isDone: boolean;
  regionalDirector: string;
  regionalDirectorInfo?: UserAssignedData;
  regionalDirectorApproved: string;
}
