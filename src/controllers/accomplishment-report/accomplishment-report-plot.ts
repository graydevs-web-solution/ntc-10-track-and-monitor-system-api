import { PDFEntryValue } from '../../models/pdf-generate.model';
import { AccomplishmentReportAPI } from '../../models/accomplishment-report/accomplishment-report-api.model';
import { DateTime } from 'luxon';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 335, y: 102, size: defaultSize }, // 00 month and year
    { text: '', x: 460, y: 255, size: defaultSize }, // 01 admin cases
    { text: '', x: 460, y: 269, size: defaultSize }, // 02 show cause
    { text: '', x: 460, y: 283, size: defaultSize }, // 03 hearing/mediation
    { text: '', x: 460, y: 297, size: defaultSize }, // 04 pending
    { text: '', x: 460, y: 312, size: defaultSize }, // 05 resolved
    { text: '', x: 88, y: 417, size: defaultSize }, // 06 attorney name
    { text: '', x: 88, y: 430, size: defaultSize }, // 07 position
];

export const getPDFValues = (val: any) => {
    const pdfPlots = [...plots];
    const value: AccomplishmentReportAPI = val;
    const newDate = DateTime.local(value.year, value.month).toFormat('MMMM yyyy');
    pdfPlots[0].text = newDate;
    pdfPlots[1].text = value.number_of_admin_case.toString();
    pdfPlots[2].text = value.number_of_show_case.toString();
    pdfPlots[3].text = value.number_of_hearing.toString();
    pdfPlots[4].text = value.number_of_pending_complaint.toString();
    pdfPlots[5].text = value.number_of_resolved.toString();
    pdfPlots[6].text = value.attorney_info.name_first as string;
    pdfPlots[7].text = value.attorney_info.position;

    return pdfPlots;
};