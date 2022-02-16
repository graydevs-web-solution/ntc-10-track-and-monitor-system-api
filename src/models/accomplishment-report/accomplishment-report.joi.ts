import joi from 'joi';
import { AccomplishmentReport } from './accomplishment-report.model';

export const accomplishmentReportSchema = joi.object<AccomplishmentReport>({
    id: joi.number().allow(null),
    month: joi.number().required().messages({
        'number.base': `Month should be a type of number`,
    }),
    year: joi.number().required().messages({
        'number.base': `Year should be a type of number`,
    }),
    description: joi.string().required().messages({
        'string.base': `Description should be a type of string`,
    }),
    numberOfAdminCase: joi.number().allow(null),
  numberOfShowCause: joi.number().allow(null),
  numberOfHearing: joi.number().allow(null),
  numberOfPendingComplaint: joi.number().allow(null),
  numberOfResolvedComplaint: joi.number().allow(null),
  attorney: joi.string().allow(''),
});