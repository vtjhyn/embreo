import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = "8awoyrc8ob3ccyaYOdawcynlayw7yarl8cyw38ayccawra83crnyrac5ca";

export const Register = async (req, res) => {
  const { name, company, username, password, type } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    if (type === "HR") {
      const user = await prisma.companyHR.create({
        data: {
          company,
          username,
          hashedPassword,
        },
      });
      res.status(201).json(user);
    }
    if (type === "Vendor") {
      const user = await prisma.vendor.create({
        data: {
          name,
          username,
          hashedPassword,
        },
      });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res) => {
  const { username, password, type } = req.body;

  try {
    if (type === "HR") {
      const user = await prisma.companyHR.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (!isCorrectPassword) {
        return res.status(401).json({ msg: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ token, user });
    }
    if (type === "Vendor") {
      const user = await prisma.vendor.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (!isCorrectPassword) {
        return res.status(401).json({ msg: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
