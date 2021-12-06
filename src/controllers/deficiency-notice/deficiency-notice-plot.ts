import { PDFEntryValue } from '../../models/pdf-generate.model';
import { dateToString } from '../../shared/utility';
import { DeficiencyNoticeAPI } from '../../models/deficiency-notice/deficiency-notice-api.model';
import { DeficiencyNotice } from 'src/models/deficiency-notice/deficiency-notice';
import { ViolationsType } from 'src/models/deficiency-notice/violations.model';
import { violations as viol } from './deficiency-notice-shared';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 415, y: 109, size: defaultSize }, // 00 docket number
    { text: '', x: 72, y: 148, size: defaultSize }, // 01 date
    { text: '', x: 72, y: 176, size: defaultSize }, // 02 name of client
    { text: '', x: 72, y: 190, size: defaultSize }, // 03 name of business
    { text: '', x: 72, y: 203, size: defaultSize }, // 04 business address
    { text: '', x: 72, y: 215, size: defaultSize }, // 05 exact location
    { text: '', x: 398, y: 322, size: defaultSize }, // 06 date of inspection
    { text: '', x: 72, y: 336, size: defaultSize }, // 07 client name with address
    { text: '', x: 96, y: 630, size: defaultSize }, // 08 date of deficiency hearing
    { text: '', x: 72, y: 813, size: defaultSize }, // 09 regional director
];

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const PLOT_VIOLATION = { x: 125, y: 374, size: defaultSize };
    const PLOT_TRANSMITTERS = { x: 122, y: 477, size: defaultSize };
    const LIMIT_VIOLATION = 5;
    const LIMIT_TRANSMITTERS = 20;
    const SPACING = 12;
    const value: DeficiencyNoticeAPI = val;
    let ITERATION_VIOLATION = 0;
    let ITERATION_TRANSMITTERS = 0;
    pdfPlots[0].text = value.docket_number;
    pdfPlots[1].text = dateToString(value.date as Date);
    pdfPlots[2].text = value.respondent_name;
    pdfPlots[3].text = value.clients.business_name;
    pdfPlots[4].text = value.clients.business_address;
    pdfPlots[5].text = value.clients.exactLocation;
    pdfPlots[6].text = dateToString(value.date_of_inspection as Date);
    pdfPlots[7].text = `${value.respondent_name}, ${value.clients.business_address}, ${value.clients.exactLocation}`;
    pdfPlots[8].text = dateToString(value.date_of_deficiency_hearing as Date);
    pdfPlots[9].text = value.regional_director_info.name;

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

    for (const iterator of Array.from(value.deficiency_notice_transmitter)) {
        if (ITERATION_TRANSMITTERS < LIMIT_TRANSMITTERS) {
            pdfPlots.push({ text: iterator.transmitter, x: 122, y: PLOT_TRANSMITTERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.serial_number, x: 415, y: PLOT_TRANSMITTERS.y, size: defaultSize });
            ITERATION_TRANSMITTERS += 1;
            PLOT_TRANSMITTERS.y += 8; 
        }
    }

    return pdfPlots;
};