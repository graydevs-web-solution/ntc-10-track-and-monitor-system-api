import { ClientAPI } from '../clients/client-api.model';
import { Client } from '../clients/client.model';
import { UserAssignedData } from '../system-setting/user_assigned-data';
interface Transmitters {
  ['transmitter']: string;
  ['serial_number']: string;
}

interface ViolationInfo {
  ['operation_without_rsl']: boolean;
  ['operation_without_lro']: boolean;
  ['operation_unauhtorized_frequency']: boolean;
  ['possession_transmitter_without_pp']: boolean;
  ['no_ntc_pertinent_papers']: boolean;
}

export interface ComplaintAPI {
  ['id']?: number;
  ['date']: Date | string;
  ['complainant_name']: string;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['respondent_name']: string;
  ['docket_number_description']: string;
  ['docket_number_start']: number;
  ['docket_number_end']: number;
  ['date_of_inspection']: Date | string;
  ['location']: string;
  ['reason']: string;
  ['complaint_transmitter']: Transmitters[];
  ['vi_operation_without_rsl']: boolean;
  ['vi_operation_without_lro']: boolean;
  ['vi_operation_unauthorized_frequency']: boolean;
  ['vi_possession_transmitter_without_pp']: boolean;
  ['vi_no_ntc_pertinent_papers']: boolean;
  ['date_time_of_hearing']: Date;
  ['regional_director']: string;
  ['is_done']: boolean;
  ['regional_director_info']: UserAssignedData;
  ['regional_director_approved']: boolean;
}
