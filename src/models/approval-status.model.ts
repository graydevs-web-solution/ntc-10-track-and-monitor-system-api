import { Complaint } from './complaint/complaint.model';
import { DeficiencyNotice } from './deficiency-notice/deficiency-notice';
import { MobilePhoneDealer } from './mobile-phone-dealer/mobile-phone-dealer.model';
import { RadioDealer } from './radio-dealer/radio-dealer.model';
import { RadioTransceiver } from './radio-transceivers/radio-transceiver.model';
import { ServiceCenterReport } from './service-center/service-center-report.model';


export interface Approval {
  userID: string;
  radioTransceiver?: RadioTransceiver;
  radioDealer?: RadioDealer;
  serviceCenter?: ServiceCenterReport;
  mobilePhoneDealer?: MobilePhoneDealer;
  complaint?: Complaint;
  deficiencyNotice?: DeficiencyNotice;
  approvalStatus: string;
  position: string;
}
