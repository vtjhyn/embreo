import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProgramList = async (req, res) => {
  try {
    const response = await prisma.program.findMany({
      include: {
        events: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addProgram = async (req, res) => {
  const { name } = req.body;
  try {
    const response = await prisma.program.create({
      data: {
        name: name,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
