import { UserAssignedData } from '../system-setting/user_assigned-data';

export interface AccomplishmentReport {
  id?: number;
  month: number;
  year: number;
  description: string;
  numberOfAdminCase: number;
  numberOfShowCause: number;
  numberOfHearing: number;
  numberOfPendingComplaint: number;
  numberOfResolvedComplaint: number;
  attorney: string | UserAssignedData;
}
