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

interface TimeInfo {
  hour: number;
  minute: number;
}

export interface Complaint {
  id?: number;
  date: Date | string;
  deficiencyNoticeId: number;
  complainantName: string;
  clientId: number | Client;
  clientName?: string;
  respondentName: string;
  docketNumberDescription: string;
  docketNumberStart: number;
  docketNumberEnd: number;
  dateOfInspection: Date | string;
  location: string;
  reason: string;
  transmitters: TransmittersInfo[];
  violationInfo: ViolationInfo;
  dateOfHearing: Date | string;
  timeOfHearing: TimeInfo;
  regionalDirector: string;
  regionalDirectorInfo?: UserAssignedData;
  regionalDirectorApproved: string;
  isDone: boolean;
}
