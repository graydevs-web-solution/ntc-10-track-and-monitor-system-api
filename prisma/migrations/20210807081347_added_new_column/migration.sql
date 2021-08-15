-- AlterTable
ALTER TABLE "radio_transceivers" ADD COLUMN     "off_frequency" BOOLEAN,
ADD COLUMN     "operation_on_lower_sideband" BOOLEAN,
ADD COLUMN     "operation_on_unauthorized_hours" BOOLEAN,
ADD COLUMN     "still_in_the_old_frequency_grouping" BOOLEAN,
ADD COLUMN     "sundray_info_radio_equipment_operative" VARCHAR(250),
ADD COLUMN     "sundray_info_radio_operator_logbook" VARCHAR(250),
ADD COLUMN     "sundray_info_station_product_unwanted_signal" VARCHAR(250),
ADD COLUMN     "tp_expiration_date" TIMESTAMPTZ(6),
ADD COLUMN     "tp_number" VARCHAR(250);
