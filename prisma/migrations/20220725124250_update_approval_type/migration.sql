/*
  Warnings:

  - You are about to drop the column `docket_number` on the `complaint` table. All the data in the column will be lost.
  - You are about to drop the column `docket_number` on the `deficiency_notice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[setting]` on the table `system_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "complaint" DROP COLUMN "docket_number",
ADD COLUMN     "docket_number_description" VARCHAR(250),
ADD COLUMN     "docket_number_end" INTEGER,
ADD COLUMN     "docket_number_start" INTEGER,
ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "deficiency_notice" DROP COLUMN "docket_number",
ADD COLUMN     "docket_number_description" VARCHAR(250),
ADD COLUMN     "docket_number_end" INTEGER,
ADD COLUMN     "docket_number_start" INTEGER,
ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "mobile_phone_dealers" ALTER COLUMN "noted_by_approved" SET DATA TYPE TEXT,
ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "radio_dealers" ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "radio_transceivers" ALTER COLUMN "noted_by_approved" SET DATA TYPE TEXT,
ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "service_center_report" ALTER COLUMN "noted_by_approved" SET DATA TYPE TEXT,
ALTER COLUMN "regional_director_approved" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_setting_key" ON "system_settings"("setting");
