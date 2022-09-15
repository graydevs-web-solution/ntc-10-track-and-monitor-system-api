-- AlterTable
ALTER TABLE "radio_dealers" ADD COLUMN     "noted_by" UUID;

-- AddForeignKey
ALTER TABLE "radio_dealers" ADD CONSTRAINT "radio_dealers_noted_by_fkey" FOREIGN KEY ("noted_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
