-- AddForeignKey
ALTER TABLE "SmsLog" ADD CONSTRAINT "SmsLog_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;