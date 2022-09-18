import { PDFEntryValue } from './../../models/pdf-generate.model';
import { dateToString } from '../../shared/utility';
import { MobilePhoneDealerAPI } from '../../models/mobile-phone-dealer/mobile-phone-dealer-api.model';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 462, y: 164, size: defaultSize }, // 00 date inspected
    { text: '', x: 177, y: 210, size: defaultSize }, // 01 name of dealer
    { text: '', x: 177, y: 227, size: defaultSize }, // 02 business address
    { text: '', x: 251, y: 243, size: defaultSize }, // 03 cellphone number
    { text: '', x: 458, y: 242, size: defaultSize }, // 04 fax number
    { text: '', x: 253, y: 272, size: defaultSize }, // 05 exact location
    { text: '', x: 236, y: 303, size: defaultSize }, // 06 mobile phone dealer permit
    { text: '', x: 461, y: 303, size: defaultSize }, // 07 mobile phone dealer expiry date
    { text: '', x: 179, y: 332, size: defaultSize }, // 08 sec/dti registration number
    { text: '', x: 458, y: 332, size: defaultSize }, // 09 mayor permit number
    { text: '', x: 112, y: 770, size: defaultSize }, // 10 sundry 1
    { text: '', x: 112, y: 844, size: defaultSize }, // 11 sundry 2

    { text: '', x: 127, y: 82, size: defaultSize }, // 12 remarks
    { text: '', x: 81, y: 170, size: defaultSize }, // 13 inspector
    { text: '', x: 253, y: 274, size: defaultSize }, // 14 owner name
    { text: '', x: 253, y: 317, size: defaultSize }, // 15 owner position
    { text: '', x: 79, y: 390, size: defaultSize }, // 16 recomendations
    { text: '', x: 318, y: 454, size: defaultSize }, // 17 approve/disapprove
    { text: '', x: 72, y: 480, size: defaultSize }, // 18 noted by
    { text: '', x: 358, y: 480, size: defaultSize }, // 19 regional director
];

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const PLOT_SPARES = { x: 46, y: 407, size: defaultSize };
    const PLOT_MOBILE_PHONE = { x: 44, y: 528, size: defaultSize };
    const PLOT_SIM = { x: 50, y: 650, size: defaultSize };
    const LIMIT_SPARES = 4;
    const LIMIT_MOBILE_PHONE = 4;
    const LIMIT_SIM = 4;
    const SPACING = 12;
    const value: MobilePhoneDealerAPI = val;
    let ITERATION_SPARES = 0;
    let ITERATION_MOBILE_PHONE = 0;
    let ITERATION_SIM = 0;
    pdfPlots[0].text = dateToString(value.date_inspected as Date);
    pdfPlots[1].text = value.clients.business_name;
    pdfPlots[2].text = value.clients.business_address;
    pdfPlots[3].text = value.clients.cellphoneNumber;
    pdfPlots[4].text = value.clients.faxNumber;
    pdfPlots[5].text = value.clients.exactLocation;
    pdfPlots[6].text = value.permit_number
    pdfPlots[7].text = dateToString(value.permit_expiry_date as Date);
    pdfPlots[8].text = value.clients.secDtiRegistrationNumber;
    pdfPlots[9].text = value.clients.businessMayorPermitNumber;
    pdfPlots[10].text = value.sundry_one;
    pdfPlots[11].text = value.sundry_two;
    pdfPlots[12].text = value.remarks_deficiencies_discrepancies_noted
    pdfPlots[13].text = value.inspected_by;
    pdfPlots[14].text = value.owner_name;
    pdfPlots[15].text = value.owner_position;
    pdfPlots[16].text = value.recommendations
    pdfPlots[17].text = value.regional_director_approved ? 'APPROVED' : 'DISAPPROVED';
    pdfPlots[18].text = `${value.noted_by_info.name_first} ${value.noted_by_info.name_last}`;
    pdfPlots[19].text = `${value.regional_director_info.name_first} ${value.regional_director_info.name_last}`;

    for (const iterator of Array.from(value.spares_and_accessories)) {
        if (ITERATION_SPARES < LIMIT_SPARES) {
            pdfPlots.push({ text: iterator.particular, x: 112, y: PLOT_SPARES.y, size: defaultSize });
            pdfPlots.push({ text: `${iterator.number_of_units}`, x: 263, y: PLOT_SPARES.y, size: defaultSize });
            ITERATION_SPARES += 1;
            PLOT_SPARES.y += SPACING; 
        }
    }

    for (const iterator of Array.from(value.mobile_phones)) {
        if (ITERATION_MOBILE_PHONE < LIMIT_MOBILE_PHONE) {
            pdfPlots.push({ text: iterator.model, x: 112, y: PLOT_MOBILE_PHONE.y, size: defaultSize });
            pdfPlots.push({ text: iterator.imei_number, x: 328, y: PLOT_MOBILE_PHONE.y, size: defaultSize });
            pdfPlots.push({ text: iterator.source, x: 475, y: PLOT_MOBILE_PHONE.y, size: defaultSize });
            ITERATION_MOBILE_PHONE += 1;
            PLOT_MOBILE_PHONE.y += SPACING; 
        }
    }

    for (const iterator of Array.from(value.sim)) {
        if (ITERATION_SIM < LIMIT_SIM) {
            pdfPlots.push({ text: iterator.sim_number, x: 112, y: PLOT_SIM.y, size: defaultSize });
            pdfPlots.push({ text: iterator.mobile_phone_company, x: 328, y: PLOT_SIM.y, size: defaultSize });
            ITERATION_SIM += 1;
            PLOT_MOBILE_PHONE.y += SPACING; 
        }
    }

    return pdfPlots;
};