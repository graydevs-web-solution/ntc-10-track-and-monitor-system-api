-- CreateTable
CREATE TABLE "system_settings" (
    "id" SERIAL NOT NULL,
    "setting" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "name_first" VARCHAR(250) NOT NULL,
    "name_middle" VARCHAR(250) NOT NULL,
    "name_last" VARCHAR(250) NOT NULL,
    "user_name" VARCHAR(20) NOT NULL,
    "position" VARCHAR(250) NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "reset_token_expiration_date" DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "clients" (
    "clientId" UUID NOT NULL,
    "owner_name" VARCHAR(250) NOT NULL,
    "owner_position" VARCHAR(250) NOT NULL,
    "business_name" VARCHAR(250) NOT NULL,
    "business_address" VARCHAR(250),
    "cellphoneNumber" VARCHAR(11),
    "faxNumber" VARCHAR(15),
    "exactLocation" VARCHAR(250),
    "secDtiRegistrationNumber" VARCHAR(250),
    "businessMayorPermitNumber" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "accomplishment_report" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "description" VARCHAR(250),
    "number_of_admin_case" INTEGER NOT NULL,
    "number_of_show_case" INTEGER NOT NULL,
    "number_of_hearing" INTEGER NOT NULL,
    "number_of_pending_complaint" INTEGER NOT NULL,
    "number_of_resolved" INTEGER NOT NULL,
    "attorney" UUID NOT NULL,

    CONSTRAINT "accomplishment_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceiver_items" (
    "radio_transceiver_id" INTEGER,
    "model" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "freq_range" VARCHAR(250),
    "power_output" VARCHAR(250),
    "freq_control" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "radio_transceiver_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceiver_receivers" (
    "radio_transceiver_id" INTEGER,
    "name" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "freq_range" VARCHAR(250),
    "power_output" VARCHAR(250),
    "freq_control" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "radio_transceiver_receivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceiver_others" (
    "radio_transceiver_id" INTEGER,
    "name" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "freq_range" VARCHAR(250),
    "power_output" VARCHAR(250),
    "freq_control" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "radio_transceiver_others_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceiver_operators" (
    "radio_transceiver_id" INTEGER,
    "name" VARCHAR(250),
    "particular_of_license" VARCHAR(250),
    "expiration_date" DATE,
    "id" SERIAL NOT NULL,

    CONSTRAINT "radio_transceiver_operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceivers" (
    "id" SERIAL NOT NULL,
    "date_issued" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "class_type" VARCHAR(250),
    "nature_of_service" VARCHAR(250),
    "working_hours" VARCHAR(250),
    "form_type" VARCHAR(250),
    "call_sign" VARCHAR(250),
    "motor_number" VARCHAR(250),
    "plate_number" VARCHAR(250),
    "gross_tonnage" VARCHAR(250),
    "pp_number" VARCHAR(250),
    "pp_date_issued" TIMESTAMPTZ(6),
    "tp_number" VARCHAR(250),
    "tp_expiration_date" TIMESTAMPTZ(6),
    "cp_number" VARCHAR(250),
    "cp_expiration_date" TIMESTAMPTZ(6),
    "license_number" VARCHAR(250),
    "license_expiration_date" TIMESTAMPTZ(6),
    "points_of_communication" VARCHAR(250),
    "freq_assigned_freq" VARCHAR(250),
    "freq_crystal_freq" VARCHAR(250),
    "freq_measured_freq" VARCHAR(250),
    "freq_if_receiver" VARCHAR(250),
    "freq_type_of_emission" VARCHAR(250),
    "as_type" VARCHAR(250),
    "as_elevation_from_gmd" VARCHAR(250),
    "as_length_of_radiator" VARCHAR(250),
    "as_gain" VARCHAR(250),
    "as_directivity" VARCHAR(250),
    "as_power_supply" VARCHAR(250),
    "as_battery" VARCHAR(250),
    "as_voltage_and_type" VARCHAR(250),
    "as_capacity" VARCHAR(250),
    "as_ah" VARCHAR(250),
    "illegal_construction_without_permit" BOOLEAN,
    "illegal_transfer" BOOLEAN,
    "operation_without_rsl" BOOLEAN,
    "operation_without_lro" BOOLEAN,
    "operation_without_logbook" BOOLEAN,
    "operation_on_lower_sideband" BOOLEAN,
    "operation_on_unauthorized_hours" BOOLEAN,
    "operation_operating_unauthorized_freq" BOOLEAN,
    "off_frequency" BOOLEAN,
    "still_in_the_old_frequency_grouping" BOOLEAN,
    "illegal_possession" BOOLEAN,
    "others" VARCHAR(250),
    "sundray_info_radio_operator_logbook" VARCHAR(250),
    "sundray_info_station_product_unwanted_signal" VARCHAR(250),
    "sundray_info_radio_equipment_operative" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "authorized_representative" VARCHAR(250),
    "radio_requlation_inspector" VARCHAR(250),
    "noted_by" UUID NOT NULL,
    "regional_director" UUID NOT NULL,

    CONSTRAINT "radio_transceivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spares_and_accessories" (
    "mobile_phone_dealer_id" INTEGER,
    "particular" VARCHAR(250),
    "number_of_units" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "spares_and_accessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_phones" (
    "mobile_phone_dealer_id" INTEGER,
    "model" VARCHAR(250),
    "imei_number" VARCHAR(250),
    "source" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "mobile_phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sim" (
    "mobile_phone_dealer_id" INTEGER,
    "sim_number" VARCHAR(250),
    "mobile_phone_company" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "sim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_phone_dealers" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "permit_number" VARCHAR(250),
    "permit_expiry_date" TIMESTAMPTZ(6),
    "sundry_one" VARCHAR(250),
    "sundry_two" VARCHAR(250),
    "remarks_deficiencies_discrepancies_noted" VARCHAR(250),
    "inspected_by" VARCHAR(250),
    "owner_name" VARCHAR(250),
    "owner_position" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "noted_by" UUID,
    "regional_director" UUID,
    "is_approved" BOOLEAN,

    CONSTRAINT "mobile_phone_dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_of_service_or_test_equipments" (
    "service_center_report_id" INTEGER,
    "particular" VARCHAR(250),
    "number_of_units" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "list_of_service_or_test_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employed_electronics_technicians" (
    "service_center_report_id" INTEGER,
    "name" VARCHAR(250),
    "qualifications" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "employed_electronics_technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_center_report" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "permit_number" VARCHAR(250),
    "permit_expiry_date" TIMESTAMPTZ(6),
    "sundry_one" VARCHAR(250),
    "sundry_two" VARCHAR(250),
    "sundry_three" VARCHAR(250),
    "remarks_deficiencies_discrepancies_noted" VARCHAR(250),
    "inspected_by" VARCHAR(250),
    "owner_name" VARCHAR(250),
    "owner_position" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "noted_by" UUID,
    "regional_director" UUID,
    "is_approved" BOOLEAN,

    CONSTRAINT "service_center_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervising_ece" (
    "radio_dealer_id" INTEGER,
    "name" VARCHAR(250),
    "license_number" VARCHAR(250),
    "expiry_date" TIMESTAMP(3),
    "ptr_number" VARCHAR(250),
    "date_issued" TIMESTAMP(3),
    "id" SERIAL NOT NULL,

    CONSTRAINT "supervising_ece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_technicians" (
    "radio_dealer_id" INTEGER,
    "name" VARCHAR(250),
    "particulars_of_license" VARCHAR(250),
    "expiry_date" TIMESTAMP(3),
    "id" SERIAL NOT NULL,

    CONSTRAINT "radio_technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_dealers" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
    "permit_number" VARCHAR(250),
    "permit_expiry_date" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "dtemi_reflectometer" BOOLEAN,
    "dtemi_frequency_counter" BOOLEAN,
    "dtemi_power_meter" BOOLEAN,
    "dtemi_vtvm_digital_multimeter" BOOLEAN,
    "dtemi_signal_generator" BOOLEAN,
    "dtemi_oscilloscope" BOOLEAN,
    "dtemi_vom_digital_multimeter" BOOLEAN,
    "dtemi_dummy_load_antenna" BOOLEAN,
    "is_laboratory_room_shielded" BOOLEAN,
    "remarks" VARCHAR(250),
    "radio_regulation_inspector" VARCHAR(250),
    "owner_name" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "regional_director" UUID,

    CONSTRAINT "radio_dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deficiency_notice_transmitter" (
    "deficiency_notice_id" INTEGER,
    "transmitter" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "deficiency_notice_transmitter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deficiency_notice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "respondent_name" VARCHAR(250),
    "date_of_inspection" TIMESTAMPTZ(6),
    "docket_number" VARCHAR(250),
    "vi_operation_without_rsl" BOOLEAN,
    "vi_operation_without_lro" BOOLEAN,
    "vi_operation_unauthorized_frequency" BOOLEAN,
    "vi_possession_transmitter_without_pp" BOOLEAN,
    "vi_no_ntc_pertinent_papers" BOOLEAN,
    "date_of_deficiency_hearing" TIMESTAMPTZ(6),
    "is_done" BOOLEAN,
    "regional_director" UUID,

    CONSTRAINT "deficiency_notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint_transmitter" (
    "complaint_id" INTEGER,
    "transmitter" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "id" SERIAL NOT NULL,

    CONSTRAINT "complaint_transmitter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "complainant_name" VARCHAR(250),
    "respondent_name" VARCHAR(250),
    "docket_number" VARCHAR(250),
    "date_of_inspection" TIMESTAMPTZ(6),
    "location" VARCHAR(250),
    "reason" VARCHAR(250),
    "vi_operation_without_rsl" BOOLEAN,
    "vi_operation_without_lro" BOOLEAN,
    "vi_operation_unauthorized_frequency" BOOLEAN,
    "vi_possession_transmitter_without_pp" BOOLEAN,
    "vi_no_ntc_pertinent_papers" BOOLEAN,
    "date_time_of_hearing" TIMESTAMPTZ(6),
    "is_done" BOOLEAN,
    "regional_director" UUID,

    CONSTRAINT "complaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_id_key" ON "system_settings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_items_id_key" ON "radio_transceiver_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_receivers_id_key" ON "radio_transceiver_receivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_others_id_key" ON "radio_transceiver_others"("id");

-- CreateIndex
CREATE UNIQUE INDEX "spares_and_accessories_id_key" ON "spares_and_accessories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mobile_phones_id_key" ON "mobile_phones"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sim_id_key" ON "sim"("id");

-- CreateIndex
CREATE UNIQUE INDEX "list_of_service_or_test_equipments_id_key" ON "list_of_service_or_test_equipments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employed_electronics_technicians_id_key" ON "employed_electronics_technicians"("id");

-- CreateIndex
CREATE UNIQUE INDEX "supervising_ece_id_key" ON "supervising_ece"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_technicians_id_key" ON "radio_technicians"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deficiency_notice_transmitter_id_key" ON "deficiency_notice_transmitter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "complaint_transmitter_id_key" ON "complaint_transmitter"("id");

-- AddForeignKey
ALTER TABLE "accomplishment_report" ADD CONSTRAINT "accomplishment_report_attorney_fkey" FOREIGN KEY ("attorney") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_items" ADD CONSTRAINT "radio_transceiver_items_radio_transceiver_id_fkey" FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_receivers" ADD CONSTRAINT "radio_transceiver_receivers_radio_transceiver_id_fkey" FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_others" ADD CONSTRAINT "radio_transceiver_others_radio_transceiver_id_fkey" FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_operators" ADD CONSTRAINT "radio_transceiver_operators_radio_transceiver_id_fkey" FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD CONSTRAINT "radio_transceivers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD CONSTRAINT "radio_transceivers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD CONSTRAINT "radio_transceivers_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spares_and_accessories" ADD CONSTRAINT "spares_and_accessories_mobile_phone_dealer_id_fkey" FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phones" ADD CONSTRAINT "mobile_phones_mobile_phone_dealer_id_fkey" FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sim" ADD CONSTRAINT "sim_mobile_phone_dealer_id_fkey" FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD CONSTRAINT "mobile_phone_dealers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD CONSTRAINT "mobile_phone_dealers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD CONSTRAINT "mobile_phone_dealers_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_of_service_or_test_equipments" ADD CONSTRAINT "list_of_service_or_test_equipments_service_center_report_i_fkey" FOREIGN KEY ("service_center_report_id") REFERENCES "service_center_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employed_electronics_technicians" ADD CONSTRAINT "employed_electronics_technicians_service_center_report_id_fkey" FOREIGN KEY ("service_center_report_id") REFERENCES "service_center_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD CONSTRAINT "service_center_report_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD CONSTRAINT "service_center_report_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD CONSTRAINT "service_center_report_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervising_ece" ADD CONSTRAINT "supervising_ece_radio_dealer_id_fkey" FOREIGN KEY ("radio_dealer_id") REFERENCES "radio_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_technicians" ADD CONSTRAINT "radio_technicians_radio_dealer_id_fkey" FOREIGN KEY ("radio_dealer_id") REFERENCES "radio_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_dealers" ADD CONSTRAINT "radio_dealers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_dealers" ADD CONSTRAINT "radio_dealers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deficiency_notice_transmitter" ADD CONSTRAINT "deficiency_notice_transmitter_deficiency_notice_id_fkey" FOREIGN KEY ("deficiency_notice_id") REFERENCES "deficiency_notice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deficiency_notice" ADD CONSTRAINT "deficiency_notice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deficiency_notice" ADD CONSTRAINT "deficiency_notice_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint_transmitter" ADD CONSTRAINT "complaint_transmitter_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "complaint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
