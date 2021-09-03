-- CreateTable
CREATE TABLE "spares_and_accessories" (
    "mobile_phone_dealer_id" INTEGER,
    "particular" VARCHAR(250),
    "number_of_units" INTEGER,
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_phones" (
    "mobile_phone_dealer_id" INTEGER,
    "model" VARCHAR(250),
    "imei_number" VARCHAR(250),
    "source" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sim" (
    "mobile_phone_dealer_id" INTEGER,
    "sim_number" VARCHAR(250),
    "mobile_phone_company" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobile_phone_dealers" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "sundry_one" VARCHAR(250),
    "sundry_two" VARCHAR(250),
    "remarks_deficiencies_discrepancies_noted" VARCHAR(250),
    "inspected_by" VARCHAR(250),
    "owner_name" VARCHAR(250),
    "owner_position" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "noted_by" VARCHAR(250),
    "regional_director" VARCHAR(250),
    "is_approved" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_of_service_or_test_equipments" (
    "service_center_report_id" INTEGER,
    "particular" VARCHAR(250),
    "number_of_units" INTEGER,
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employed_electronics_technicians" (
    "service_center_report_id" INTEGER,
    "name" VARCHAR(250),
    "qualifications" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_center_report" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "sundry_one" VARCHAR(250),
    "sundry_two" VARCHAR(250),
    "sundry_three" VARCHAR(250),
    "remarks_deficiencies_discrepancies_noted" VARCHAR(250),
    "inspected_by" VARCHAR(250),
    "owner_name" VARCHAR(250),
    "owner_position" VARCHAR(250),
    "recommendations" VARCHAR(250),
    "noted_by" VARCHAR(250),
    "regional_director" VARCHAR(250),
    "is_approved" BOOLEAN,

    PRIMARY KEY ("id")
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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_technicians" (
    "radio_dealer_id" INTEGER,
    "name" VARCHAR(250),
    "particulars_of_license" VARCHAR(250),
    "expiry_date" TIMESTAMP(3),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_dealers" (
    "id" SERIAL NOT NULL,
    "date_inspected" TIMESTAMPTZ(6),
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
    "regional_director" VARCHAR(250),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spares_and_accessories.id_unique" ON "spares_and_accessories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mobile_phones.id_unique" ON "mobile_phones"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sim.id_unique" ON "sim"("id");

-- CreateIndex
CREATE UNIQUE INDEX "list_of_service_or_test_equipments.id_unique" ON "list_of_service_or_test_equipments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employed_electronics_technicians.id_unique" ON "employed_electronics_technicians"("id");

-- CreateIndex
CREATE UNIQUE INDEX "supervising_ece.id_unique" ON "supervising_ece"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_technicians.id_unique" ON "radio_technicians"("id");

-- AddForeignKey
ALTER TABLE "spares_and_accessories" ADD FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phones" ADD FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sim" ADD FOREIGN KEY ("mobile_phone_dealer_id") REFERENCES "mobile_phone_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_of_service_or_test_equipments" ADD FOREIGN KEY ("service_center_report_id") REFERENCES "service_center_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employed_electronics_technicians" ADD FOREIGN KEY ("service_center_report_id") REFERENCES "service_center_report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervising_ece" ADD FOREIGN KEY ("radio_dealer_id") REFERENCES "radio_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_technicians" ADD FOREIGN KEY ("radio_dealer_id") REFERENCES "radio_dealers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_dealers" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
