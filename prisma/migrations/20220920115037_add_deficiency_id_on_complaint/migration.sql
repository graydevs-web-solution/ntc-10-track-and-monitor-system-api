-- AlterTable
ALTER TABLE "complaint" ADD COLUMN     "deficiency_notice_id" INTEGER;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_deficiency_notice_id_fkey" FOREIGN KEY ("deficiency_notice_id") REFERENCES "deficiency_notice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
