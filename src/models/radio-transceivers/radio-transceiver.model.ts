interface PPInfo {
  ppNumber: string;
  dateIssued: Date | string;
}

interface TPInfo {
  tpNumber: string;
  expirationDate: Date | string;
}

interface CPInfo {
  cpNumber: string;
  expirationDate: Date | string;
}

interface LicInfo {
  licNumber: string;
  expirationDate: Date | string;
}

interface Operator {
  id?: number;
  name: string;
  particularOfLicense: string;
  expirationDate: Date | string;
}

interface RadioTransceiverItem {
  id?: number;
  model: string;
  serialNumber: string;
  freqRange: string;
  powerOutput: string;
  freqControl: string;
}

interface FrequenciesInfo {
  assignedFreq: string;
  crystalFreq: string;
  measuredFreq: string;
  ifReceiver: string;
  typeOfEmission: string;
  antennaSystemType: string;
  elevationFromGmd: string;
  lengthOfRadiator: string;
  gain: string;
  directivity: string;
  powerSupply: string;
  battery: string;
  voltageAndType: string;
  capacity: string;
  ah: string;
}

interface IllegalConstructionInfo {
  constructionsOfRadioStationsWithoutConstructionPermit: boolean;
  illegalTransfer: boolean;
}

interface IllegalOperationInfo {
  operationWithoutRadioStationLicensePermit: boolean;
  operationWithoutLicenseRadioOperator: boolean;
  operationWithoutLogbook: boolean;
  operationOnLowerSideband: boolean;
  operationOnUnauthorizedHours: boolean;
  operatingOnUnauthorizedFrequency: boolean;
  offFrequency: boolean;
  stillInTheOldFrequencyGrouping: boolean;
}

interface SundrayInformationAboutRS {
  isRadioOperatorEntryLogbooK: string;
  isStationProduceUnwantedSignals: string;
  isRadioEquipmentOperativeOnInspection: string;
}

export interface RadioTransceiver {
  id?: number;
  dateIssued: Date | string;
  clientId: number;
  classType: string;
  natureOfService: string;
  workingHours: string;
  formType: string;
  callSign: string;
  motorNumber: string;
  plateNumber: string;
  grossTonnage: string;
  ppInfo: PPInfo;
  tpInfo: TPInfo;
  cpInfo: CPInfo;
  licInfo: LicInfo;
  pointsOfCommunication: string;
  operators: Operator[];
  radioTransceivers: RadioTransceiverItem[];
  frequenciesInfo: FrequenciesInfo;
  illegalConstructionInfo: IllegalConstructionInfo;
  illegalOperationInfo: IllegalOperationInfo;
  illegalPossession: boolean;
  others: string;
  sundrayInformationAboutRS: SundrayInformationAboutRS;
  authorizedRepresentative: string;
  radioRegulationInspector: string;
  recommendations: string;
  notedBy: string;
  regionalDirector: string;
}
