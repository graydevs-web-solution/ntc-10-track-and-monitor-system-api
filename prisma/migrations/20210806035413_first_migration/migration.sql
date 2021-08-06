-- CreateTable
CREATE TABLE "clients" (
    "clientId" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "businessAddress" VARCHAR(250),
    "cellphoneNumber" VARCHAR(11),
    "faxNumber" VARCHAR(15),
    "exactLocation" VARCHAR(250),
    "secDtiRegistrationNumber" VARCHAR(250),
    "businessMayorPermitNumber" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "radio_transceivers" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER,
    "class_type" VARCHAR(250),
    "nature_of_service" VARCHAR(250),
    "working_hours" VARCHAR(250),
    "form_type" VARCHAR(250),
    "call_sign" VARCHAR(250),
    "pp_number" VARCHAR(250),
    "cp_number" VARCHAR(250),
    "license_number" VARCHAR(250),
    "points_of_communication" VARCHAR(250),
    "freq_assigned_freq" VARCHAR(250),
    "freq_crystal_freq" VARCHAR(250),
    "freq_measured_freq" VARCHAR(250),
    "freq_if_receiver" VARCHAR(250),
    "freq_type_of_emission" VARCHAR(250),
    "freq_antenna_system_type" VARCHAR(250),
    "freq_elevation_from_gmd" VARCHAR(250),
    "freq_gain" VARCHAR(250),
    "freq_directivity" VARCHAR(250),
    "freq_power_supply" VARCHAR(250),
    "freq_battery" VARCHAR(250),
    "freq_voltage_and_type" VARCHAR(250),
    "freq_capacity" VARCHAR(250),
    "freq_ah" VARCHAR(250),
    "illegal_construction_without_permit" BOOLEAN,
    "illegal_transfer" BOOLEAN,
    "operation_without_rsl" BOOLEAN,
    "operation_without_lro" BOOLEAN,
    "operation_without_logbook" BOOLEAN,
    "operation_operating_unauthorized_freq" BOOLEAN,
    "illegal_possession" BOOLEAN,
    "others" VARCHAR(250),
    "radio_requlation_inspector" VARCHAR(250),
    "authorized_representative" VARCHAR(250),
    "regional_director" VARCHAR(250),
    "date_issued" TIMESTAMPTZ(6),
    "pp_date_issued" TIMESTAMPTZ(6),
    "cp_date_issued" TIMESTAMPTZ(6),
    "license_date_issued" TIMESTAMPTZ(6),

    PRIMARY KEY ("id")
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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_transceiver_operators" (
    "radio_transceiver_id" INTEGER,
    "name" VARCHAR(250),
    "particular_of_license" VARCHAR(250),
    "expiration_date" DATE,
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients.id_unique" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_items.id_unique" ON "radio_transceiver_items"("id");

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_items" ADD FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_operators" ADD FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
