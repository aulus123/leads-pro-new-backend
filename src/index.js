const Fastify = require('fastify');
const { PrismaClient } = require('@prisma/client');
const cors = require('@fastify/cors');

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Fastify
const server = Fastify({ 
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: false,
      useDefaults: true,
      coerceTypes: false,
      allErrors: true
    }
  }
});

// Register CORS
server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// Add timestamp handling
const addTimestamps = (data) => {
  const now = new Date();
  return {
    ...data,
    createdAt: now,
    updatedAt: now
  };
};

const updateTimestamp = (data) => {
  return {
    ...data,
    updatedAt: new Date()
  };
};

/* ==================== companies ==================== */
server.get('/companies', async (request, reply) => {
const companies = await prisma.companies.findMany();
reply.send(companies);

});

server.post('/companies', async (request, reply) => {
  const { nm_company, lg_logo, nr_phone, ds_email, pw_company, ds_endereco } = request.body;
  const company = await prisma.companies.create({
    data: addTimestamps({
      nm_company,
      lg_logo,
      nr_phone,
      ds_email,
      pw_company,
      ds_endereco
    }),
  });
  reply.code(201).send(company);
});

server.put('/companies/:id', async (request, reply) => {
  const { id } = request.params;
  const { nm_company, lg_logo, nr_phone, ds_email, pw_company, ds_endereco } = request.body;
  const updated = await prisma.companies.update({
    where: { id_company: parseInt(id) },
    data: updateTimestamp({
      nm_company,
      lg_logo,
      nr_phone,
      ds_email,
      pw_company,
      ds_endereco
    }),
  });
  reply.send(updated);
});

server.delete('/companies/:id', async (request, reply) => {
  const { id } = request.params;
  const deleted = await prisma.companies.delete({
    where: { id_company: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== leadsHeads ==================== */
server.get('/leadsheads', async (request, reply) => {
  const leadsHeads = await prisma.leadsHeads.findMany();
  reply.send(leadsHeads);
});

server.post('/leadsheads', async (request, reply) => {
  const { nm_client, nm_notesgeral, id_office } = request.body;
  const leadHead = await prisma.leadsHeads.create({
    data: { nm_client, nm_notesgeral, id_office },
  });
  reply.code(201).send(leadHead);
});

server.put('/leadsheads/:id', async (request, reply) => {
  const { id } = request.params;
  const { nm_client, nm_notesgeral, id_office } = request.body;
  const updated = await prisma.leadsHeads.update({
    where: { id_leads_head: parseInt(id) },
    data: { nm_client, nm_notesgeral, id_office },
  });
  reply.send(updated);
});

server.delete('/leadsheads/:id', async (request, reply) => {
  const { id } = request.params;
  const deleted = await prisma.leadsHeads.delete({
    where: { id_leads_head: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== leadsLines ==================== */
server.get('/leadslines', async (request, reply) => {
  const leadsLines = await prisma.leadsLines.findMany();
  reply.send(leadsLines);
});

server.post('/leadslines', async (request, reply) => {
  const { id_leads_head, nm_notesdetail, id_service } = request.body;
  const leadLine = await prisma.leadsLines.create({
    data: { id_leads_head, nm_notesdetail, id_service },
  });
  reply.code(201).send(leadLine);
});

server.put('/leadslines/:id', async (request, reply) => {
  const { id } = request.params;
  const { id_leads_head, nm_notesdetail, id_service } = request.body;
  const updated = await prisma.leadsLines.update({
    where: { id_leadline: parseInt(id) },
    data: { id_leads_head, nm_notesdetail, id_service },
  });
  reply.send(updated);
});

server.delete('/leadslines/:id', async (request, reply) => {
  const { id } = request.params;
  const deleted = await prisma.leadsLines.delete({
    where: { id_leadline: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== offices ==================== */
server.get('/offices', async (request, reply) => {
  const offices = await prisma.offices.findMany();
  reply.send(offices);
});

server.post('/offices', async (request, reply) => {
  const { id_company, nm_office, nr_phone } = request.body;
  const office = await prisma.offices.create({
    data: { id_company, nm_office, nr_phone },
  });
  reply.code(201).send(office);
});

server.put('/offices/:id', async (request, reply) => {
  const { id } = request.params;
  const { id_company, nm_office, nr_phone } = request.body;
  const updated = await prisma.offices.update({
    where: { id_office: parseInt(id) },
    data: { id_company, nm_office, nr_phone },
  });
  reply.send(updated);
});

server.delete('/offices/:id', async (request, reply) => {
  const { id } = request.params;
  const deleted = await prisma.offices.delete({
    where: { id_office: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== services ==================== */
server.get('/services', async (request, reply) => {
  const services = await prisma.services.findMany();
  reply.send(services);
});

server.post('/services', async (request, reply) => {
  const { id_company, nm_service } = request.body;
  const service = await prisma.services.create({
    data: { id_company, nm_service },
  });
  reply.code(201).send(service);
});

server.put('/services/:id', async (request, reply) => {
  const { id } = request.params;
  const { id_company, nm_service } = request.body;
  const updated = await prisma.services.update({
    where: { id_service: parseInt(id) },
    data: { id_company, nm_service },
  });
  reply.send(updated);
});

server.delete('/services/:id', async (request, reply) => {
  const { id } = request.params;
  const deleted = await prisma.services.delete({
    where: { id_service: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== sales_representative ==================== */
server.get('/sales_representative', async (request, reply) => {
  const representatives = await prisma.sales_representative.findMany();
  reply.send(representatives);
});

server.post('/sales_representative', async (request, reply) => {
  const { nm_representative, ds_email, ph_representative, pw_representative, id_office } = request.body;
  const representative = await prisma.sales_representative.create({
    data: {
      nm_representative,
      ds_email,
      ph_representative,
      pw_representative,
      id_office,
    },
  });
  reply.code(201).send(representative);
});

server.put('/sales_representative/:id', async (request, reply) => {
  const { id } = request.params;
  const { nm_representative, ds_email, ph_representative, pw_representative, id_office } = request.body;

  const updated = await prisma.sales_representative.update({
    where: { id_representative: parseInt(id) },
    data: {
      nm_representative,
      ds_email,
      ph_representative,
      pw_representative,
      id_office,
    },
  });
  reply.send(updated);
});

server.delete('/sales_representative/:id', async (request, reply) => {
  const { id } = request.params;

  const deleted = await prisma.sales_representative.delete({
    where: { id_representative: parseInt(id) },
  });
  reply.send(deleted);
});

/* ==================== Start the Server ==================== */
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});