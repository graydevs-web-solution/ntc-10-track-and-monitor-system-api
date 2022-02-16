import { object, number, string, date, array, boolean } from 'joi';
import { AccomplishmentReport } from './accomplishment-report.model';

export const accomplishmentReportSchema = object<AccomplishmentReport>({
    id: number().allow(null),
    month: number().required().messages({
        'number.base': `Month should be a type of number`,
    }),
    year: number().required().messages({
        'number.base': `Year should be a type of number`,
    }),
    description: string().required().messages({
        'string.base': `Description should be a type of string`,
    }),
    numberOfAdminCase: number().allow(null),
  numberOfShowCause: number().allow(null),
  numberOfHearing: number().allow(null),
  numberOfPendingComplaint: number().allow(null),
  numberOfResolvedComplaint: number().allow(null),
  attorney: string().allow(''),
});