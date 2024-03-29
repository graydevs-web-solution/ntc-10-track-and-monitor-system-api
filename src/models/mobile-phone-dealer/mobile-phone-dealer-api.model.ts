import { ClientAPI } from '../clients/client-api.model'; 
import { Client } from '../clients/client.model';
import { UserAssignedData } from '../system-setting/user_assigned-data';

interface StocksOfSparesAndAccessories {
  ['particular']: string;   
  ['number_of_units']: number;    
}

interface MobilePhone {
  ['model']: string;
  ['imei_number']: string;
  ['source']: string;
}

interface SIM {
  ['sim_number']: string;
  ['mobile_phone_company']: string;
}

export interface MobilePhoneDealerAPI {
  id?: number;
  ['date_inspected']: Date | string;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['permit_number']: string;
  ['permit_expiry_date']: Date | string;
  ['spares_and_accessories']: StocksOfSparesAndAccessories[];
  ['mobile_phones']: MobilePhone[];
  ['sim']: SIM[];
  ['sundry_one']: string;
  ['sundry_two']: string;
  ['remarks_deficiencies_discrepancies_noted']: string;
  ['inspected_by']: string;
  ['owner_name']: string; 
  ['owner_position']: string;
  ['recommendations']: string;
  ['noted_by']: string;
  ['noted_by_approved']: string;
  ['regional_director']: string;
  ['regional_director_approved']: string;
  ['noted_by_info']: UserAssignedData;
  ['regional_director_info']: UserAssignedData;
}
