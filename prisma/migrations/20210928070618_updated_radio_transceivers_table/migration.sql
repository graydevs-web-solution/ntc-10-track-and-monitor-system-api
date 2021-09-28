/*
  Warnings:

  - You are about to drop the column `freq_ah` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_antenna_system_type` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_battery` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_capacity` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_directivity` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_elevation_from_gmd` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_gain` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_length_of_radiator` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_power_supply` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `freq_voltage_and_type` on the `radio_transceivers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "radio_transceivers" DROP COLUMN "freq_ah",
DROP COLUMN "freq_antenna_system_type",
DROP COLUMN "freq_battery",
DROP COLUMN "freq_capacity",
DROP COLUMN "freq_directivity",
DROP COLUMN "freq_elevation_from_gmd",
DROP COLUMN "freq_gain",
DROP COLUMN "freq_length_of_radiator",
DROP COLUMN "freq_power_supply",
DROP COLUMN "freq_voltage_and_type",
ADD COLUMN     "as_ah" VARCHAR(250),
ADD COLUMN     "as_battery" VARCHAR(250),
ADD COLUMN     "as_capacity" VARCHAR(250),
ADD COLUMN     "as_directivity" VARCHAR(250),
ADD COLUMN     "as_elevation_from_gmd" VARCHAR(250),
ADD COLUMN     "as_gain" VARCHAR(250),
ADD COLUMN     "as_length_of_radiator" VARCHAR(250),
ADD COLUMN     "as_power_supply" VARCHAR(250),
ADD COLUMN     "as_type" VARCHAR(250),
ADD COLUMN     "as_voltage_and_type" VARCHAR(250);

-- CreateTable
CREATE TABLE "radio_transceiver_receivers" (
    "radio_transceiver_id" INTEGER,
    "name" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "freq_range" VARCHAR(250),
    "power_output" VARCHAR(250),
    "freq_control" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
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

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_receivers.id_unique" ON "radio_transceiver_receivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "radio_transceiver_others.id_unique" ON "radio_transceiver_others"("id");

-- AddForeignKey
ALTER TABLE "radio_transceiver_receivers" ADD FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceiver_others" ADD FOREIGN KEY ("radio_transceiver_id") REFERENCES "radio_transceivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
