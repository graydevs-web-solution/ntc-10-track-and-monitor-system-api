import { UserAssignedData } from '../system-setting/user_assigned-data';

export interface AccomplishmentReportAPI {
  ['id']?: number;
  ['month']: number;
  ['year']: number;
  ['description']: string;
  ['number_of_admin_case']: number;
  ['number_of_show_case']: number;
  ['number_of_hearing']: number;
  ['number_of_pending_complaint']: number;
  ['number_of_resolved']: number;
  ['attorney_info']: UserAssignedData;
}
