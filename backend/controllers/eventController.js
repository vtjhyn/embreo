import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEvent = async (req, res) => {
  const { companyId, vendorId } = req.params;
  try {
    const response = await prisma.event.findMany({
      where: {
        companyId,
        vendorId
      },
      include: {
        company: true,
        location: true,
        name: true,
        vendor: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEventById = async (req, res) => {
  const eventId = req.params;
  try {
    const response = await prisma.event.findUnique({
      where: {
        id : eventId
      },
      include: {
        company: true,
        location: true,
        name: true,
        vendor: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addEvent = async (req, res) => {
  const {
    companyId,
    proposedDates1,
    proposedDates2,
    proposedDates3,
    locationId,
    nameId,
    vendorId,
  } = req.body;
  try {
    const response = await prisma.event.create({
      data: {
        companyId,
        proposedDates1,
        proposedDates2,
        proposedDates3,
        locationId,
        nameId,
        status: "PENDING",
        vendorId,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const approveEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const { status, confirmedDate, remarks } = req.body;
  try {
    const response = await prisma.event.update({
      where: {
        id : eventId
      },
      data: {
        status,
        confirmedDate,
        remarks
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
