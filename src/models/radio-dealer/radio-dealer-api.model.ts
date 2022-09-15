import { ClientAPI } from '../clients/client-api.model';
import { Client } from '../clients/client.model';
import { UserAssignedData } from '../system-setting/user_assigned-data';

interface SupervisingECE {
  ['name']: string;
  ['license_number']: string;
  ['expiry_date']: Date | string;
  ['ptr_number']: string;
  ['date_issued']: Date | string;
}

interface Technician {
  ['name']: string;
  ['particulars_of_license']: string;
  ['expiry_date']: Date | string;
}

interface DiagnosticTestEquipmentAndMeasuringInstrumentInfo {
  ['reflectometer']: boolean;
  ['frequency_counter']: boolean;
  ['power_meter']: boolean;
  ['vtvm_digital_multimeter']: boolean;
  ['signal_generator']: boolean;
  ['oscilloscope']: boolean;
  ['vom_digital_multimeter']: boolean;
  ['dummy_load_antenna']: boolean;
}

export interface RadioDealerAPI {
  id?: number;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['date_inspected']: Date | string;
  ['permit_number']: string;
  ['permit_expiry_date']: Date | string;
  ['supervising_ece']: SupervisingECE[];
  ['radio_technicians']: Technician[];
  ['dtemi_reflectometer']: boolean;
  ['dtemi_frequency_counter']: boolean;
  ['dtemi_power_meter']: boolean;
  ['dtemi_vtvm_digital_multimeter']: boolean;
  ['dtemi_signal_generator']: boolean;
  ['dtemi_oscilloscope']: boolean;
  ['dtemi_vom_digital_multimeter']: boolean;
  ['dtemi_dummy_load_antenna']: boolean;
  ['is_laboratory_room_shielded']: boolean;
  ['remarks']: string;
  ['radio_regulation_inspector']: string;
  ['owner_name']: string;
  ['recommendations']: string;
  ['regional_director']: string;
  ['regional_director_approved']: string;
  ['regional_director_info']: UserAssignedData;
  ['noted_by']: string;
  ['noted_by_approved']: string;
  ['noted_by_info']: UserAssignedData;
}
