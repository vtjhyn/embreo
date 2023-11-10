import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEvent = async (req, res) => {
  try {
    const response = await prisma.companyHR.findUnique();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEventByHR = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await prisma.companyHR.findUnique({
      where: {
        id: userId,
      },
      select: {
        events: {
          include: {
            company: {
              select: {
                company: true,
              },
            },
            name: {
              select: {
                name: true,
              },
            },
            vendor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEventByVendor = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await prisma.vendor.findUnique({
      where: {
        id: userId,
      },
      select: {
        events: {
          include: {
            company: {
              select: {
                company: true,
              },
            },
            name: {
              select: {
                name: true,
              },
            },
            vendor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addEvent = async (req, res) => {
  const currentTimestamp = Date.now();
  const createdAt = new Date(currentTimestamp).toISOString();
  const {
    companyId,
    proposedDates1,
    proposedDates2,
    proposedDates3,
    location,
    nameId,
    vendorId,
  } = req.body;
  try {
    const response = await prisma.event.create({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
        proposedDates1,
        proposedDates2,
        proposedDates3,
        location,
        name: {
          connect: {
            id: nameId,
          },
        },
        status: "PENDING",
        confirmedDate: null,
        vendor: {
          connect: {
            id: vendorId,
          },
        },
        createdAt,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const eventApprovement = async (req, res) => {
  const eventId = req.params.id;
  const { status, confirmedDate, remarks } = req.body;
  try {
    const response = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        status,
        confirmedDate,
        remarks,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
