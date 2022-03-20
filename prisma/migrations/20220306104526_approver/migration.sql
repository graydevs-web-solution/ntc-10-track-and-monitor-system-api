/*
  Warnings:

  - You are about to drop the column `is_approved` on the `mobile_phone_dealers` table. All the data in the column will be lost.
  - You are about to drop the column `is_approved` on the `service_center_report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "complaint" ADD COLUMN     "regional_director_approved" BOOLEAN;

-- AlterTable
ALTER TABLE "deficiency_notice" ADD COLUMN     "regional_director_approved" BOOLEAN;

-- AlterTable
ALTER TABLE "mobile_phone_dealers" DROP COLUMN "is_approved",
ADD COLUMN     "noted_by_approved" BOOLEAN,
ADD COLUMN     "regional_director_approved" BOOLEAN;

-- AlterTable
ALTER TABLE "radio_dealers" ADD COLUMN     "regional_director_approved" BOOLEAN;

-- AlterTable
ALTER TABLE "radio_transceivers" ADD COLUMN     "noted_by_approved" BOOLEAN,
ADD COLUMN     "regional_director_approved" BOOLEAN;

-- AlterTable
ALTER TABLE "service_center_report" DROP COLUMN "is_approved",
ADD COLUMN     "noted_by_approved" BOOLEAN,
ADD COLUMN     "regional_director_approved" BOOLEAN;
