import { PDFEntryValue } from './../../models/pdf-generate.model';
import { dateToString } from '../../shared/utility';
import { ServiceCenterReportAPI } from '../../models/service-center/service-center-report-api.model';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 462, y: 189, size: defaultSize }, // 00 date inspected
    { text: '', x: 193, y: 233, size: defaultSize }, // 01 name of dealer
    { text: '', x: 193, y: 248, size: defaultSize }, // 02 business address
    { text: '', x: 264, y: 262, size: defaultSize }, // 03 cellphone number
    { text: '', x: 463, y: 262, size: defaultSize }, // 04 fax number
    { text: '', x: 263, y: 291, size: defaultSize }, // 05 exact location
    { text: '', x: 193, y: 321, size: defaultSize }, // 06 mobile phone dealer permit
    { text: '', x: 465, y: 321, size: defaultSize }, // 07 mobile phone dealer expiry date
    { text: '', x: 192, y: 349, size: defaultSize }, // 08 sec/dti registration number
    { text: '', x: 464, y: 349, size: defaultSize }, // 09 mayor permit number
    { text: '', x: 129, y: 727, size: defaultSize }, // 10 sundry 1
    { text: '', x: 129, y: 802, size: defaultSize }, // 11 sundry 2
    { text: '', x: 129, y: 866, size: defaultSize }, // 12 sundry 3

    { text: '', x: 127, y: 82, size: defaultSize }, // 13 remarks
    { text: '', x: 81, y: 170, size: defaultSize }, // 14 inspector
    { text: '', x: 253, y: 274, size: defaultSize }, // 15 owner name
    { text: '', x: 253, y: 317, size: defaultSize }, // 16 owner position
    { text: '', x: 79, y: 390, size: defaultSize }, // 17 recomendations
    { text: '', x: 318, y: 454, size: defaultSize }, // 18 approve/disapprove
    { text: '', x: 72, y: 480, size: defaultSize }, // 19 noted by
    { text: '', x: 358, y: 480, size: defaultSize }, // 20 regional director
];

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const PLOT_SERVICE = { x: 46, y: 422, size: defaultSize };
    const PLOT_EET = { x: 46, y: 613, size: defaultSize };
    const LIMIT_SERVICE = 4;
    const LIMIT_EET = 4;
    const SPACING = 12;
    const value: ServiceCenterReportAPI = val;
    let ITERATION_SERVICE = 0;
    let ITERATION_EET = 0;
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
    pdfPlots[12].text = value.sundry_three;
    pdfPlots[13].text = value.remarks_deficiencies_discrepancies_noted
    pdfPlots[14].text = value.inspected_by;
    pdfPlots[15].text = value.owner_name;
    pdfPlots[16].text = value.owner_position;
    pdfPlots[17].text = value.recommendations
    pdfPlots[18].text = value.is_approved ? 'APPROVED' : 'DISAPPROVED';
    pdfPlots[19].text = value.noted_by;
    pdfPlots[20].text = value.regional_director;

    for (const iterator of Array.from(value.list_of_service_or_test_equipments)) {
        if (ITERATION_SERVICE < LIMIT_SERVICE) {
            pdfPlots.push({ text: iterator.particular, x: 60, y: PLOT_SERVICE.y, size: defaultSize });
            pdfPlots.push({ text: `${iterator.number_of_units}`, x: 330, y: PLOT_SERVICE.y, size: defaultSize });
            ITERATION_SERVICE += 1;
            PLOT_SERVICE.y += SPACING; 
        }
    }

    for (const iterator of Array.from(value.employed_electronics_technicians)) {
        if (ITERATION_EET < LIMIT_EET) {
            pdfPlots.push({ text: iterator.name, x: 60, y: PLOT_EET.y, size: defaultSize });
            pdfPlots.push({ text: iterator.qualifications, x: 330, y: PLOT_EET.y, size: defaultSize });
            ITERATION_EET += 1;
            PLOT_EET.y += SPACING; 
        }
    }

    return pdfPlots;
};