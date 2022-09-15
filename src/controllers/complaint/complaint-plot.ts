import { PDFEntryValue } from '../../models/pdf-generate.model';
import { dateToString, timeToString } from '../../shared/utility';
import { ComplaintAPI } from '../../models/complaint/complaint-api.model';
import { violations as viol } from '../deficiency-notice/deficiency-notice-shared';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 74, y: 144, size: defaultSize }, // 00 complainant
    { text: '', x: 74, y: 222, size: defaultSize }, // 01 respondent
    { text: '', x: 411, y: 162, size: defaultSize }, // 02 docket number
    { text: '', x: 245, y: 759, size: defaultSize }, // 03 date filed
    { text: '', x: 138, y: 302, size: defaultSize }, // 04 date of inspection
    { text: '', x: 77, y: 317, size: defaultSize }, // 05 location
    { text: '', x: 147, y: 331, size: defaultSize }, // 06 reason
    { text: '', x: 275, y: 496, size: defaultSize }, // 07 respondent/owner
    { text: '', x: 210, y: 662, size: defaultSize }, // 08 date of hearing
    { text: '', x: 292, y: 662, size: defaultSize }, // 09 time of hearing
    { text: '', x: 72, y: 813, size: defaultSize }, // 10 regional director
];

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const PLOT_VIOLATION = { x: 111, y: 370, size: defaultSize };
    const PLOT_TRANSMITTERS = { x: 399, y: 370, size: defaultSize };
    const LIMIT_VIOLATION = 5;
    const LIMIT_TRANSMITTERS = 20;
    const SPACING = 12;
    const value: ComplaintAPI = val;
    let ITERATION_VIOLATION = 0;
    let ITERATION_TRANSMITTERS = 0;
    pdfPlots[0].text = value.complainant_name;
    pdfPlots[1].text = value.respondent_name;
    pdfPlots[2].text = value.docket_number_description;
    pdfPlots[3].text = dateToString(value.date as Date);
    pdfPlots[4].text = dateToString(value.date_of_inspection as Date);
    pdfPlots[5].text = value.location;
    pdfPlots[6].text = value.reason;
    pdfPlots[7].text = value.respondent_name;
    pdfPlots[8].text = dateToString(value.date_time_of_hearing as Date);;
    pdfPlots[9].text = timeToString(value.date_time_of_hearing as Date);
    pdfPlots[10].text = `${value.regional_director_info.name_first} ${value.regional_director_info.name_last}`;

    const violations: string[] = [];
    if (value['vi_operation_without_rsl']) { violations.push(viol[0].name) };
    if (value['vi_operation_without_lro']) { violations.push(viol[1].name) };
    if (value['vi_operation_unauthorized_frequency']) { violations.push(viol[2].name) };
    if (value['vi_possession_transmitter_without_pp']) { violations.push(viol[3].name) };
    if (value['vi_no_ntc_pertinent_papers']){ violations.push(viol[4].name) };

    for (const value of violations) {
        if (ITERATION_VIOLATION < LIMIT_VIOLATION) {
            pdfPlots.push({ text: `${ITERATION_VIOLATION + 1}. ${value}`, x: 125, y: PLOT_VIOLATION.y, size: defaultSize });
            ITERATION_VIOLATION += 1;
            PLOT_VIOLATION.y += SPACING; 
        }
    }

    for (const iterator of Array.from(value.complaint_transmitter)) {
        if (ITERATION_TRANSMITTERS < LIMIT_TRANSMITTERS) {
            pdfPlots.push({ text: iterator.transmitter, x: 122, y: PLOT_TRANSMITTERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.serial_number, x: 415, y: PLOT_TRANSMITTERS.y, size: defaultSize });
            ITERATION_TRANSMITTERS += 1;
            PLOT_TRANSMITTERS.y += 8; 
        }
    }

    return pdfPlots;
};