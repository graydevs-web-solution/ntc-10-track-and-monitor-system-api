/*
  Warnings:

  - You are about to drop the column `cp_date_issued` on the `radio_transceivers` table. All the data in the column will be lost.
  - You are about to drop the column `license_date_issued` on the `radio_transceivers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "radio_transceivers" DROP COLUMN "cp_date_issued",
DROP COLUMN "license_date_issued",
ADD COLUMN     "cp_expiration_date" TIMESTAMPTZ(6),
ADD COLUMN     "license_expiration_date" TIMESTAMPTZ(6);
