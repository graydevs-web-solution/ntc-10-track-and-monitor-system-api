import { ViolationsType } from '../../models/deficiency-notice/violations.model';

export const violations: ViolationsType[] = [
  { 
      name: 'Operation without Radio Station license/temporary permit.',
      formControlName: 'operationWithoutRSL',
},
  { 
      name: 'Operation without licensed radio operator.',
      formControlName: 'operationWithoutLRO',
    },
  { 
      name: 'Operating on unauthorized frequency.',
      formControlName: 'operationUnauthorizedFrequency',
 },
  {
    name: 'Possession of transmitter/transceiver without permit to purchased/possess.',
    formControlName: 'possessionTransmitterWithoutPP',
  },
  {
    name: 'No NTC pertinent papers presented at the time of inspection of the units/s mentioned.',
    formControlName: 'noNTCPertinentPapers',
  },
];