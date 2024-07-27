import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  console.log("Register Page");
  const { name, email, password, departmentId, branchId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        departmentId,
        branchId
      }
    });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  console.log("Login page");
  const { email, password } = req.body;
  try {
    const user = await prisma.employee.findUnique({
      where: { email }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });
     console.log("EMPLOYEE DETAILS",user);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
