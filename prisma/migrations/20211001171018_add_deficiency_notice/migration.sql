-- AlterTable
ALTER TABLE "mobile_phone_dealers" ADD COLUMN     "permit_expiry_date" TIMESTAMPTZ(6),
ADD COLUMN     "permit_number" VARCHAR(250);

-- AlterTable
ALTER TABLE "radio_dealers" ADD COLUMN     "permit_expiry_date" TIMESTAMPTZ(6),
ADD COLUMN     "permit_number" VARCHAR(250);

-- AlterTable
ALTER TABLE "service_center_report" ADD COLUMN     "permit_expiry_date" TIMESTAMPTZ(6),
ADD COLUMN     "permit_number" VARCHAR(250);

-- CreateTable
CREATE TABLE "deficiency_notice_transmitter" (
    "deficiency_notice_id" INTEGER,
    "transmitter" VARCHAR(250),
    "serial_number" VARCHAR(250),
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deficiency_notice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6),
    "client_id" INTEGER,
    "docket_number" VARCHAR(250),
    "vi_operation_without_rsl" BOOLEAN,
    "vi_operation_without_lro" BOOLEAN,
    "vi_operation_unauthorized_frequency" BOOLEAN,
    "vi_possession_transmitter_without_pp" BOOLEAN,
    "vi_no_ntc_pertinent_papers" BOOLEAN,
    "date_of_deficiency_hearing" TIMESTAMPTZ(6),
    "is_done" BOOLEAN,
    "regional_director" VARCHAR(250),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deficiency_notice_transmitter.id_unique" ON "deficiency_notice_transmitter"("id");

-- AddForeignKey
ALTER TABLE "deficiency_notice_transmitter" ADD FOREIGN KEY ("deficiency_notice_id") REFERENCES "deficiency_notice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deficiency_notice" ADD FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
