import { RadioDealerAPI } from './../../models/radio-dealer/radio-dealer-api.model';
import { PDFEntryValue } from './../../models/pdf-generate.model';
import { dateToString } from '../../shared/utility';

const defaultSize = 8 ;

export const plots: PDFEntryValue[] = [
    { text: '', x: 441, y: 173, size: defaultSize }, // 00 date Inspected
    { text: '', x: 185, y: 207, size: defaultSize }, // 01 name of dealer
    { text: '', x: 185, y: 229, size: defaultSize }, // 02 business address
    { text: '', x: 166, y: 251, size: defaultSize }, // 03 tel number
    { text: '', x: 401, y: 251, size: defaultSize }, // 04 fax number
    { text: '', x: 150, y: 273, size: defaultSize }, // 05 permit number
    { text: '', x: 403, y: 273, size: defaultSize }, // 06 permit expiry date
    { text: '', x: 96, y: 433, size: defaultSize }, // 07 reflectometer
    { text: '', x: 96, y: 443, size: defaultSize }, // 08 frequency counter 
    { text: '', x: 96, y: 454, size: defaultSize }, // 09 rf power meter
    { text: '', x: 96, y: 466, size: defaultSize }, // 10 vtvm digital multimeter
    { text: '', x: 96, y: 476, size: defaultSize }, // 11 rf and af signal generator
    { text: '', x: 96, y: 486, size: defaultSize }, // 12 oscilloscope
    { text: '', x: 96, y: 497, size: defaultSize }, // 13 VOM 
    { text: '', x: 96, y: 508, size: defaultSize }, // 14 dummy load antenna
    { text: '', x: 0, y: 527, size: defaultSize }, // 15 laboratory shield
    { text: '', x: 106, y: 562, size: defaultSize }, // 16 remarks
    { text: '', x: 386, y: 623, size: defaultSize }, // 17 radio regulation inspectors
    { text: '', x: 380, y: 702, size: defaultSize }, // 18 owner 
    { text: '', x: 103, y: 758, size: defaultSize }, // 19 recommendation
    { text: '', x: 350, y: 851, size: defaultSize }, // 20 regional director
]; 

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const PLOT_ECE = { x: 222, y: 325, size: defaultSize };
    const PLOT_TECHNICIANS = { x: 112, y: 379, size: defaultSize };
    const LIMIT_ECE = 2;
    const LIMIT_TECHNICIANS = 2;
    const SPACING = 12;
    const value: RadioDealerAPI = val;
    let ITERATION_ECE = 0;
    let ITERATION_TECHNICIANS = 0;
    pdfPlots[0].text = dateToString(value.date_inspected as Date);
    pdfPlots[1].text = value.clients.business_name;
    pdfPlots[2].text = value.clients.business_address;
    pdfPlots[3].text = value.clients.cellphoneNumber;
    pdfPlots[4].text = value.clients.faxNumber;
    pdfPlots[5].text = value.permit_number;
    pdfPlots[6].text = dateToString(value.permit_expiry_date as Date);
    pdfPlots[7].text = value.dtemi_reflectometer ? 'X' : '';
    pdfPlots[8].text = value.dtemi_frequency_counter ? 'X' : '';
    pdfPlots[9].text = value.dtemi_power_meter ? 'X' : '';
    pdfPlots[10].text = value.dtemi_vtvm_digital_multimeter ? 'X' : '';
    pdfPlots[11].text = value.dtemi_signal_generator ? 'X' : '';
    pdfPlots[12].text = value.dtemi_oscilloscope ? 'X' : '';
    pdfPlots[13].text = value.dtemi_vom_digital_multimeter ? 'X' : '';
    pdfPlots[14].text = value.dtemi_dummy_load_antenna ? 'X' : '';
    pdfPlots[15].text = value.is_laboratory_room_shielded ? 'X' : '';
    pdfPlots[16].text = value.remarks;
    pdfPlots[17].text = value.radio_regulation_inspector;
    pdfPlots[18].text = value.owner_name;
    pdfPlots[19].text = value.recommendations;
    pdfPlots[20].text = value.regional_director_info.name_first as string;

    for (const iterator of Array.from(value.supervising_ece)) {
        if (ITERATION_ECE < LIMIT_ECE) {
            pdfPlots.push({ text: iterator.name, x: 112, y: PLOT_ECE.y, size: defaultSize });
            pdfPlots.push({ text: iterator.license_number, x: 263, y: PLOT_ECE.y, size: defaultSize });
            pdfPlots.push({ text: dateToString(iterator.expiry_date as Date), x: 340, y: PLOT_ECE.y, size: defaultSize });
            pdfPlots.push({ text: iterator.ptr_number, x: 404, y: PLOT_ECE.y, size: defaultSize });
            pdfPlots.push({ text: dateToString(iterator.date_issued as Date), x: 486, y: PLOT_ECE.y, size: defaultSize });
            ITERATION_ECE += 1;
            PLOT_ECE.y += SPACING; 
        }
    }

    for (const iterator of Array.from(value.radio_technicians)) {
        if (ITERATION_TECHNICIANS < LIMIT_TECHNICIANS) {
            pdfPlots.push({ text: iterator.name, x: 112, y: PLOT_TECHNICIANS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.particulars_of_license, x: 328, y: PLOT_TECHNICIANS.y, size: defaultSize });
            pdfPlots.push({ text: dateToString(iterator.expiry_date as Date), x: 475, y: PLOT_TECHNICIANS.y, size: defaultSize });
            ITERATION_TECHNICIANS += 1;
            PLOT_TECHNICIANS.y += SPACING; 
        }
    }

    return pdfPlots;
}