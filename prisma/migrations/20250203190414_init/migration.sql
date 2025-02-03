-- CreateTable
CREATE TABLE "sales_representative" (
    "nm_representative" CHAR NOT NULL,
    "ds_email" CHAR NOT NULL,
    "ph_representative" CHAR NOT NULL,
    "pw_representative" CHAR NOT NULL,
    "id_office" CHAR NOT NULL,
    "id_representative" SERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "companies" (
    "id_company" SERIAL NOT NULL,
    "nm_company" VARCHAR(255) NOT NULL,
    "lg_logo" VARCHAR(255),
    "nr_phone" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "pw_company" VARCHAR(255) NOT NULL,
    "ds_email" VARCHAR(255),
    "ds_endereco" VARCHAR(255),

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id_company")
);

-- CreateTable
CREATE TABLE "leadsHeads" (
    "id_leads_head" SERIAL NOT NULL,
    "id_office" INTEGER NOT NULL,
    "nm_notesgeral" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "id_representative" INTEGER NOT NULL,
    "nm_client" CHAR NOT NULL,
    "nr_phoneclient" CHAR,
    "ds_clientemail" CHAR,

    CONSTRAINT "LeadsHeads_pkey" PRIMARY KEY ("id_leads_head")
);

-- CreateTable
CREATE TABLE "leadsLines" (
    "id_leadline" SERIAL NOT NULL,
    "id_leads_head" INTEGER NOT NULL,
    "id_service" INTEGER NOT NULL,
    "nm_notesdetail" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "LeadsLines_pkey" PRIMARY KEY ("id_leadline")
);

-- CreateTable
CREATE TABLE "offices" (
    "id_office" SERIAL NOT NULL,
    "id_company" INTEGER NOT NULL,
    "nm_office" VARCHAR(255) NOT NULL,
    "nr_phone" INTEGER,
    "nm_contact" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "ds_endereco" CHAR,

    CONSTRAINT "Offices_pkey" PRIMARY KEY ("id_office")
);

-- CreateTable
CREATE TABLE "services" (
    "id_service" SERIAL NOT NULL,
    "id_company" INTEGER NOT NULL,
    "nm_service" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id_service")
);

-- AddForeignKey
ALTER TABLE "leadsHeads" ADD CONSTRAINT "LeadsHeads_id_office_fkey" FOREIGN KEY ("id_office") REFERENCES "offices"("id_office") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leadsLines" ADD CONSTRAINT "LeadsLines_id_leads_head_fkey" FOREIGN KEY ("id_leads_head") REFERENCES "leadsHeads"("id_leads_head") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leadsLines" ADD CONSTRAINT "LeadsLines_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "Offices_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "companies"("id_company") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "Services_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "companies"("id_company") ON DELETE CASCADE ON UPDATE CASCADE;
