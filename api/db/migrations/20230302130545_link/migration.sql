-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "bargainId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_bargainId_fkey" FOREIGN KEY ("bargainId") REFERENCES "Bargain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
