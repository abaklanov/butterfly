-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Butterflies" (
    "id" TEXT NOT NULL,
    "common_name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "article" TEXT NOT NULL,

    CONSTRAINT "Butterflies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
