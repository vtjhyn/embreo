import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getVendorList = async (req, res) => {
  try {
    const response = await prisma.vendor.findMany({
      include: {
        events: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
