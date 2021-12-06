import { PDFEntryValue } from '../../models/pdf-generate.model';
import { FormType, RadioTransceiverAPI } from '../../models/radio-transceivers/radio-transceiver-api.model';
import { dateToString, formatName } from '../../shared/utility';

const defaultSize = 8;

export const plots: PDFEntryValue[] = [
    { text: '', x: 457, y: 100, size: defaultSize }, // 0 date
    { text: '', x: 173, y: 111, size: defaultSize }, // 1 name of station
    { text: '', x: 173, y: 124, size: defaultSize }, // 2 postal address
    { text: '', x: 181, y: 136, size: defaultSize }, // 3 location of station
    { text: '', x: 111, y: 147, size: defaultSize }, // 4 class
    { text: '', x: 312, y: 147, size: defaultSize }, // 5 nature of service
    { text: '', x: 457, y: 147, size: defaultSize }, // 6 working hour
    { text: '', x: 76, y: 159, size: defaultSize }, // 7 new
    { text: '', x: 76, y: 170, size: defaultSize }, // 8 renewal
    { text: '', x: 76, y: 181, size: defaultSize }, // 9 modification
    { text: '', x: 270, y: 159, size: defaultSize }, // 10 pp no
    { text: '', x: 458, y: 159, size: defaultSize }, // 11 pp date of issued
    { text: '', x: 271, y: 171, size: defaultSize }, // 12 cp no
    { text: '', x: 458, y: 171, size: defaultSize }, // 13 cp exp date
    { text: '', x: 272, y: 182, size: defaultSize }, // 14 tp no
    { text: '', x: 460, y: 182, size: defaultSize }, // 15 tp exp date
    { text: '', x: 272, y: 194, size: defaultSize }, // 16 lic no
    { text: '', x: 462, y: 193, size: defaultSize }, // 17 lic exp date
    { text: '', x: 274, y: 205, size: defaultSize }, // 18 plate no
    { text: '', x: 466, y: 205, size: defaultSize }, // 19 gross tonnage
    { text: '', x: 181, y: 216, size: defaultSize }, // 20 points of coomunication
    { text: '', x: 80, y: 458, size: defaultSize }, // 21 freq assigned freq
    { text: '', x: 212, y: 457, size: defaultSize }, // 22 freq crystal freq
    { text: '', x: 316, y: 457, size: defaultSize }, // 23 freq mesasured freq
    { text: '', x: 400, y: 457, size: defaultSize }, // 24 freq if receiver
    { text: '', x: 458, y: 457, size: defaultSize }, // 25 freq type of emission
    { text: '', x: 81, y: 503, size: defaultSize }, // 26 freq type antenna
    { text: '', x: 214, y: 503, size: defaultSize }, // 27 freq eleavation from grnd
    { text: '', x: 313, y: 503, size: defaultSize }, // 28 freq length of radiator
    { text: '', x: 402, y: 503, size: defaultSize }, // 29 freq gain
    { text: '', x: 459, y: 503, size: defaultSize }, // 30 freq directivity
    { text: '', x: 74, y: 538, size: defaultSize }, // 31 freq power supply
    { text: '', x: 215, y: 538, size: defaultSize }, // 32 freq battery
    { text: '', x: 313, y: 538, size: defaultSize }, // 33 freq voltage and type
    { text: '', x: 402, y: 538, size: defaultSize }, // 34 freq capacity
    { text: '', x: 459, y: 538, size: defaultSize }, // 35 freq ah

    { text: '', x: 91, y: 595, size: defaultSize }, // 36 IC construction permitless
    { text: '', x: 91, y: 606, size: defaultSize }, // 37 IC illegal transfer
    { text: '', x: 91, y: 628, size: defaultSize }, // 38 IO w/o rso permit
    { text: '', x: 91, y: 641, size: defaultSize }, // 39 IO w/o LRO
    { text: '', x: 91, y: 654, size: defaultSize }, // 40 IO w/o logbook
    { text: '', x: 91, y: 666, size: defaultSize }, // 41 IO lower sideband
    { text: '', x: 91, y: 677, size: defaultSize }, // 42 IO unauthorized hours
    { text: '', x: 91, y: 688, size: defaultSize }, // 43 IO unauthorized freq
    { text: '', x: 91, y: 700, size: defaultSize }, // 44 IO off frequency
    { text: '', x: 91, y: 712, size: defaultSize }, // 45 IO still in the old frequency grouping
    { text: '', x: 92, y: 735, size: defaultSize }, // 46 illegal possession
    { text: '', x: 448, y: 769, size: defaultSize }, // 47 sundray one
    { text: '', x: 387, y: 780, size: defaultSize }, // 48 sundray two
    { text: '', x: 400, y: 791, size: defaultSize }, // 49 sundray three
    { text: '', x: 72, y: 819, size: defaultSize }, // 50 authorized representatives
    { text: '', x: 303, y: 817, size: defaultSize }, // 51 radio regulation inspector
    { text: '', x: 174, y: 850, size: defaultSize }, // 52 recommendations
    { text: '', x: 82, y: 874, size: defaultSize }, // 53 noted by
    { text: '', x: 391, y: 876, size: defaultSize }, // 54 approver
    { text: '', x: 120, y: 194, size: defaultSize }, // 55 call sign
    { text: '', x: 120, y: 205, size: defaultSize }, // 56 motor number
];


export const getPDFValues = (value: any): PDFEntryValue[] => {
    const pdfPlots = [...plots];
    const LIMIT_TRANSMITER_RECEIVER = 6;
    const LIMIT_OPERATORS = 2;
    const LIMIT_RECEIVERS = 2;
    const LIMIT_OTHERS = 2;
    const PLOT_OPERATORS = { x: 76, y: 242, size: defaultSize };
    const PLOT_TRANSMITTER = { x: 79, y: 288, size: defaultSize };
    const PLOT_RECEIVERS = { x: 76, y: 375, size: defaultSize };
    const PLOT_OTHERS = { x: 76, y: 423, size: defaultSize };
    const SPACING = 12;
    const data: RadioTransceiverAPI = value;
    console.log(data)
    let ITERATION_OPERATORS = 0;
    let ITERATION_TRANSMITTER = 0;
    let ITERATION_RECEIVERS = 0;
    let ITERATION_OTHERS = 0;
    pdfPlots[0].text = dateToString(data.date_issued as Date);
    pdfPlots[1].text = data.clients.business_name
    pdfPlots[2].text = data.clients.business_address;
    pdfPlots[3].text = data.clients.exactLocation
    pdfPlots[4].text = data.class_type;
    pdfPlots[5].text = data.nature_of_service;
    pdfPlots[6].text = data.working_hours;
    pdfPlots[7].text = data.form_type === FormType.new ? 'X' : '';
    pdfPlots[8].text = data.form_type === FormType.renewal ? 'X' : '';
    pdfPlots[9].text = data.form_type === FormType.modification ? 'X' : '';
    pdfPlots[10].text = data.pp_number;
    pdfPlots[11].text = dateToString(data.pp_date_issued);
    pdfPlots[12].text = data.cp_number;
    pdfPlots[13].text = dateToString(data.cp_expiration_date as Date);
    pdfPlots[14].text = data.tp_number;
    pdfPlots[15].text = dateToString(data.tp_expiration_date as Date);
    pdfPlots[16].text = data.license_number;
    pdfPlots[17].text = dateToString(data.license_expiration_date as Date);
    pdfPlots[18].text = data.plate_number;
    pdfPlots[19].text = data.gross_tonnage;
    pdfPlots[20].text = data.points_of_communication;
    pdfPlots[21].text = data.freq_assigned_freq;
    pdfPlots[22].text = data.freq_crystal_freq;
    pdfPlots[23].text = data.freq_measured_freq;
    pdfPlots[24].text = data.freq_if_receiver;
    pdfPlots[25].text = data.freq_type_of_emission;
    pdfPlots[26].text = data.as_type;
    pdfPlots[27].text = data.as_elevation_from_gmd;
    pdfPlots[28].text = data.as_length_of_radiator;
    pdfPlots[29].text = data.as_gain
    pdfPlots[30].text = data.as_directivity;
    pdfPlots[31].text = data.as_power_supply;
    pdfPlots[32].text = data.as_battery;
    pdfPlots[33].text = data.as_voltage_and_type;
    pdfPlots[34].text = data.as_capacity;
    pdfPlots[35].text = data.as_ah;
    pdfPlots[36].text = data.illegal_construction_without_permit ? 'X' : '';
    pdfPlots[37].text = data.illegal_transfer? 'X' : '';
    pdfPlots[38].text = data.operation_without_rsl? 'X' : '';
    pdfPlots[39].text = data.operation_without_lro? 'X' : '';
    pdfPlots[40].text = data.operation_without_logbook? 'X' : '';
    pdfPlots[41].text = data.operation_on_lower_sideband? 'X' : '';
    pdfPlots[42].text = data.operation_on_unauthorized_hours? 'X' : '';
    pdfPlots[43].text = data.operation_operating_unauthorized_freq? 'X' : '';
    pdfPlots[44].text = data.off_frequency? 'X' : '';
    pdfPlots[45].text = data.still_in_the_old_frequency_grouping? 'X' : '';
    pdfPlots[46].text = data.illegal_possession? 'X' : '';
    pdfPlots[47].text = data.sundray_info_radio_operator_logbook;
    pdfPlots[48].text = data.sundray_info_station_product_unwanted_signal;
    pdfPlots[49].text = data.sundray_info_radio_equipment_operative;
    pdfPlots[50].text = data.authorized_representative;
    pdfPlots[51].text = data.radio_requlation_inspector;
    pdfPlots[52].text = data.recommendations;
    pdfPlots[53].text = data.noted_by_info.name;
    pdfPlots[54].text = data.regional_director_info.name;
    pdfPlots[55].text = data.call_sign;
    pdfPlots[56].text = data.motor_number;

    for (const iterator of Array.from(data.radio_transceiver_operators)) {
                if (ITERATION_OPERATORS < LIMIT_OPERATORS) {
            pdfPlots.push({ text: iterator.name, x: 73, y: PLOT_OPERATORS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.particular_of_license, x: 214, y: PLOT_OPERATORS.y, size: defaultSize });
            pdfPlots.push({ text: dateToString(iterator.expiration_date as Date), x: 409, y: PLOT_OPERATORS.y, size: defaultSize });
            ITERATION_OPERATORS += 1;
            PLOT_OPERATORS.y += SPACING;
        }
    }

    for (const iterator of Array.from(data.radio_transceiver_items)) {
        if (ITERATION_TRANSMITTER < LIMIT_TRANSMITER_RECEIVER) {
            pdfPlots.push({ text: iterator.model, x: 76, y: PLOT_TRANSMITTER.y, size: defaultSize });
            pdfPlots.push({ text: iterator.serial_number, x: 209, y: PLOT_TRANSMITTER.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_range, x: 272, y: PLOT_TRANSMITTER.y, size: defaultSize });
            pdfPlots.push({ text: iterator.power_output, x: 372, y: PLOT_TRANSMITTER.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_control, x: 463, y: PLOT_TRANSMITTER.y, size: defaultSize });
            ITERATION_TRANSMITTER += 1;
            PLOT_TRANSMITTER.y += SPACING;
        }
    }

    for (const iterator of Array.from(data.radio_transceiver_receivers || [])) {
                if (ITERATION_RECEIVERS < LIMIT_RECEIVERS) {
            pdfPlots.push({ text: iterator.name, x: 79, y: PLOT_RECEIVERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.serial_number, x: 215, y: PLOT_RECEIVERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_range, x: 272, y: PLOT_RECEIVERS.y, size: defaultSize });
            // pdfPlots.push({ text: iterator.power_output, x: PLOT_RECEIVERS.x, y: PLOT_RECEIVERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_control, x: 459, y: PLOT_RECEIVERS.y, size: defaultSize });
            ITERATION_RECEIVERS += 1;
            PLOT_RECEIVERS.y += SPACING;
        }
    }

    for (const iterator of Array.from(data.radio_transceiver_others || [])) {
        if (ITERATION_OTHERS < LIMIT_OTHERS) {
            pdfPlots.push({ text: iterator.name, x: 79, y: PLOT_OTHERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.serial_number, x: 215, y: PLOT_OTHERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_range, x: 273, y: PLOT_OTHERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.power_output, x: 371, y: PLOT_OTHERS.y, size: defaultSize });
            pdfPlots.push({ text: iterator.freq_control, x: 459, y: PLOT_OTHERS.y, size: defaultSize });
            ITERATION_OTHERS += 1;
            PLOT_OTHERS.y += SPACING;
        }
    }

    return pdfPlots;
};