-- CreateTable
CREATE TABLE "folders" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "parent_id" UUID,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "folder_id" UUID,
    "name" TEXT NOT NULL,
    "storage_key" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_shares" (
    "id" UUID NOT NULL,
    "file_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "folders_owner_id_parent_id_idx" ON "folders"("owner_id", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "files_storage_key_key" ON "files"("storage_key");

-- CreateIndex
CREATE INDEX "files_owner_id_folder_id_idx" ON "files"("owner_id", "folder_id");

-- CreateIndex
CREATE UNIQUE INDEX "file_shares_token_key" ON "file_shares"("token");

-- CreateIndex
CREATE INDEX "file_shares_file_id_idx" ON "file_shares"("file_id");

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_shares" ADD CONSTRAINT "file_shares_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
