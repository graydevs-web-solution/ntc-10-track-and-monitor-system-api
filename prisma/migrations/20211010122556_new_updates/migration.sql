/*
  Warnings:

  - You are about to drop the column `businessAddress` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `ownerPosition` on the `clients` table. All the data in the column will be lost.
  - Added the required column `business_name` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_name` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_position` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "businessAddress",
DROP COLUMN "businessName",
DROP COLUMN "ownerName",
DROP COLUMN "ownerPosition",
ADD COLUMN     "business_address" VARCHAR(250),
ADD COLUMN     "business_name" VARCHAR(250) NOT NULL,
ADD COLUMN     "owner_name" VARCHAR(250) NOT NULL,
ADD COLUMN     "owner_position" VARCHAR(250) NOT NULL;

-- CreateTable
CREATE TABLE "complaint_transmitter" (
    "complaint_id" INTEGER,
    "transmitter" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
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
    "regional_director" VARCHAR(250),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "complaint_transmitter.id_unique" ON "complaint_transmitter"("id");

-- AddForeignKey
ALTER TABLE "complaint_transmitter" ADD FOREIGN KEY ("complaint_id") REFERENCES "complaint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
