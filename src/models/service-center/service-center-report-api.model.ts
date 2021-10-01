import { ClientAPI } from '../clients/client-api.model';
import { Client } from '../clients/client.model';

interface ServiceOrTestEquipments {
  ['particular']: string;
  ['number_of_units']: number;
}

interface EmployedElectronicsTechnicians {
  ['name']: string;
  ['qualifications']: string;
}

interface OwnerInfo {
  ['name']: string;
  ['position']: string;
}

export interface ServiceCenterReportAPI {
  id?: number;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['date_inspected']: Date | string;
  ['permit_number']: string;
  ['permit_expiry_date']: Date | string;
  ['list_of_service_or_test_equipments']: ServiceOrTestEquipments[];
  ['employed_electronics_technicians']: EmployedElectronicsTechnicians[];
  ['sundry_one']: string;
  ['sundry_two']: string;
  ['sundry_three']: string;
  ['remarks_deficiencies_discrepancies_noted']: string;
  ['inspected_by']: string;
  ['owner_name']: string;
  ['owner_position']: string;
  ['recommendations']: string;
  ['noted_by']: string;
  ['regional_director']: string;
  ['is_approved']: boolean;
}
