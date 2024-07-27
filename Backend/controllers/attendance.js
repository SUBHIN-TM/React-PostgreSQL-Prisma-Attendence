import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const markAttendance = async (req, res) => {
  console.log("Attendence Marking");
  const { id } = req.user;
  console.log( id);
  try {
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: id
      }
    });
    console.log(attendance);
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  const { id } = req.user;
  console.log("Dashbord Attendance Get Page",id);
  try {
    const attendanceRecords = await prisma.attendance.findMany({
      where: { employeeId: id }
    });

    const employeeDetails = await prisma.employee.findUnique({
      where: { id: id },
      include: {
        department: true,
        branch: true,
        attendances: true,
      },
    });
    
    console.log("all attendence records",attendanceRecords);
    console.log("Employee details",employeeDetails);
    res.json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
