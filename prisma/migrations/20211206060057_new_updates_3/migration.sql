/*
  Warnings:

  - The `regional_director` column on the `complaint` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regional_director` column on the `deficiency_notice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `noted_by` column on the `mobile_phone_dealers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regional_director` column on the `mobile_phone_dealers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regional_director` column on the `radio_dealers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `noted_by` column on the `service_center_report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regional_director` column on the `service_center_report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `regional_director` to the `radio_transceivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noted_by` to the `radio_transceivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "complaint" DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID;

-- AlterTable
ALTER TABLE "deficiency_notice" DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID;

-- AlterTable
ALTER TABLE "mobile_phone_dealers" DROP COLUMN "noted_by",
ADD COLUMN     "noted_by" UUID,
DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID;

-- AlterTable
ALTER TABLE "radio_dealers" DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID;

-- AlterTable
ALTER TABLE "radio_transceivers" DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID NOT NULL,
DROP COLUMN "noted_by",
ADD COLUMN     "noted_by" UUID NOT NULL;

-- AlterTable
ALTER TABLE "service_center_report" DROP COLUMN "noted_by",
ADD COLUMN     "noted_by" UUID,
DROP COLUMN "regional_director",
ADD COLUMN     "regional_director" UUID;

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

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_id_key" ON "system_settings"("id");

-- RenameForeignKey
ALTER TABLE "list_of_service_or_test_equipments" RENAME CONSTRAINT "list_of_service_or_test_equipment_service_center_report_id_fkey" TO "list_of_service_or_test_equipments_service_center_report_i_fkey";

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD CONSTRAINT "radio_transceivers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_transceivers" ADD CONSTRAINT "radio_transceivers_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD CONSTRAINT "mobile_phone_dealers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_phone_dealers" ADD CONSTRAINT "mobile_phone_dealers_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD CONSTRAINT "service_center_report_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_center_report" ADD CONSTRAINT "service_center_report_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radio_dealers" ADD CONSTRAINT "radio_dealers_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deficiency_notice" ADD CONSTRAINT "deficiency_notice_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_regional_director_fkey" FOREIGN KEY ("regional_director") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "clients.id_unique" RENAME TO "clients_id_key";

-- RenameIndex
ALTER INDEX "complaint_transmitter.id_unique" RENAME TO "complaint_transmitter_id_key";

-- RenameIndex
ALTER INDEX "deficiency_notice_transmitter.id_unique" RENAME TO "deficiency_notice_transmitter_id_key";

-- RenameIndex
ALTER INDEX "employed_electronics_technicians.id_unique" RENAME TO "employed_electronics_technicians_id_key";

-- RenameIndex
ALTER INDEX "list_of_service_or_test_equipments.id_unique" RENAME TO "list_of_service_or_test_equipments_id_key";

-- RenameIndex
ALTER INDEX "mobile_phones.id_unique" RENAME TO "mobile_phones_id_key";

-- RenameIndex
ALTER INDEX "radio_technicians.id_unique" RENAME TO "radio_technicians_id_key";

-- RenameIndex
ALTER INDEX "radio_transceiver_items.id_unique" RENAME TO "radio_transceiver_items_id_key";

-- RenameIndex
ALTER INDEX "radio_transceiver_others.id_unique" RENAME TO "radio_transceiver_others_id_key";

-- RenameIndex
ALTER INDEX "radio_transceiver_receivers.id_unique" RENAME TO "radio_transceiver_receivers_id_key";

-- RenameIndex
ALTER INDEX "sim.id_unique" RENAME TO "sim_id_key";

-- RenameIndex
ALTER INDEX "spares_and_accessories.id_unique" RENAME TO "spares_and_accessories_id_key";

-- RenameIndex
ALTER INDEX "supervising_ece.id_unique" RENAME TO "supervising_ece_id_key";
