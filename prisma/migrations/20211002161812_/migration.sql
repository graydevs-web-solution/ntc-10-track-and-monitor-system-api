/*
  Warnings:

  - You are about to drop the column `name` on the `clients` table. All the data in the column will be lost.
  - Added the required column `businessName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerPosition` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "name",
ADD COLUMN     "businessName" VARCHAR(250) NOT NULL,
ADD COLUMN     "ownerName" VARCHAR(250) NOT NULL,
ADD COLUMN     "ownerPosition" VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE "deficiency_notice" ADD COLUMN     "date_of_inspection" TIMESTAMPTZ(6),
ADD COLUMN     "respondent_name" VARCHAR(250);
