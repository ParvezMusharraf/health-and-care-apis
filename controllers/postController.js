import doctorModel from "../models/Docter.js";
import roleModel from "../models/Roles.js";
import SpecialtyModel from "../models/Spaciality.js";
import userModel from "../models/Users.js";
import StatusModel from "../models/Status.js";
import Department from "../models/Departments.js";
import Appointment from "../models/Appointments.js";

const pendingStatusId = "674c7b2b87f7153d70cdef81";

class postController {
  static postRoles = async (req, res) => {
    try {
      const { roleName } = req.body;

      // Check if roleName is provided
      if (!roleName) {
        return res
          .status(400)
          .send({ code: "failed", message: "Role Name is required" });
      }

      // Check if the role already exists
      const role = await roleModel.findOne({ roleName });
      if (role) {
        return res
          .status(409)
          .send({ code: "failed", message: "Role already exists" });
      }

      // Create and save the new role
      const newRole = new roleModel({ roleName });
      await newRole.save();

      // Send a success response
      res.status(201).send({
        code: "success",
        message: "Role created successfully",
        data: newRole,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ code: "error", message: "Internal Server Error" });
    }
  };

  static saveDocter = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contactNo,
        password,
        // specialtyId,
        fees,
        departmentId,
        experience,
      } = req.body;

      // Check for all required fields
      if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNo ||
        !password ||
        // !specialtyId ||
        !fees ||
        !departmentId ||
        !experience
      ) {
        return res
          .status(400)
          .json({ code: "Failed", message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ code: "Failed", message: "User already exists" });
      }

      const docter = await roleModel.findOne({ roleName: "docter" });

      if (docter) {
        const newUser = new userModel({
          firstname: firstName,
          lastname: lastName,
          email: email,
          contactNo: contactNo,
          password: password,
          roleId: docter._id, // Replace with actual doctor role ID
        });

        const savedUser = await newUser.save();

        if (savedUser) {
          // Create doctor profile
          const newDoctor = new doctorModel({
            userId: savedUser._id, // Use the created user's ID
            // specialtyId: specialtyId,
            experience: experience,
            fees: fees,
            departmentId: departmentId,
          });

          await newDoctor.save();

          return res.status(201).json({
            code: "Success",
            message: "Doctor created successfully",
          });
        } else {
          return res.status(500).json({
            code: "Failed",
            message: "Error creating user",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: "Error", message: "Internal Server Error" });
    }
  };

  static saveSpeciality = async (req, res) => {
    try {
      const { name } = req.body;

      if (name) {
        const isAvailable = await SpecialtyModel.findOne({ name });
        if (isAvailable) {
          res.send({ code: "Failed", message: "Specilaity Already Available" });
        } else {
          const newSpeciality = new SpecialtyModel({ name: name.trim() });
          await newSpeciality.save();
          res.send({
            code: "Success",
            message: "Spaciality Added Successfully",
          });
        }
      } else {
        res.send({
          code: "Failed",
          message: "Name Required",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: "Error", message: "Internal Server Error" });
    }
  };

  static saveDepartment = async (req, res) => {
    try {
      const { name } = req.body;

      if (name) {
        const isAvailable = await Department.findOne({ name });
        if (isAvailable) {
          res.send({ code: "Failed", message: "Department Already Available" });
        } else {
          const newSpeciality = new Department({ name: name.trim() });
          await newSpeciality.save();
          res.send({
            code: "Success",
            message: "Department Added Successfully",
          });
        }
      } else {
        res.send({
          code: "Failed",
          message: "Name Required",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: "Error", message: "Internal Server Error" });
    }
  };

  static saveStatus = async (req, res) => {
    try {
      const { name } = req.body;

      if (name) {
        const isAvailable = await StatusModel.findOne({ name });
        if (isAvailable) {
          res.send({ code: "Failed", message: "Status Already Available" });
        } else {
          const newSpeciality = new StatusModel({ name: name.trim() });
          await newSpeciality.save();
          res.send({
            code: "Success",
            message: "Status Added Successfully",
          });
        }
      } else {
        res.send({
          code: "Failed",
          message: "Name Required",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: "Error", message: "Internal Server Error" });
    }
  };

  static saveAppointment = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contactNo,
        dateOfAppointment,
        departmentId,
        docterId,
        notes,
      } = req.body;

      // Validate required fields
      if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNo ||
        !departmentId ||
        !dateOfAppointment ||
        !docterId
      ) {
        return res
          .status(400)
          .json({ code: "Failed", message: "All fields are required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ code: "Failed", message: "Invalid email format" });
      }

      // Validate contact number format (e.g., 10-15 digits)
      const contactNoRegex = /^\+?\d{10,15}$/;
      if (!contactNoRegex.test(contactNo)) {
        return res
          .status(400)
          .json({ code: "Failed", message: "Invalid contact number format" });
      }

      // Verify department and doctor existence
      const department = await Department.findById(departmentId);
      if (!department) {
        return res
          .status(404)
          .json({ code: "Failed", message: "Department not found" });
      }

      const doctor = await doctorModel.findById(docterId);
      if (!doctor) {
        return res
          .status(404)
          .json({ code: "Failed", message: "Doctor not found" });
      }

      // Save the appointment
      const appointment = new Appointment({
        firstname: firstName,
        lastname: lastName,
        email: email,
        contactNo,
        appointmentDate: dateOfAppointment,
        departmentId,
        doctorId: docterId,
        notes,
        status: pendingStatusId,
      });

      await appointment.save();

      // Respond with success
      res.status(200).json({
        code: "Success",
        data: appointment,
        message: "Appointment request sent successfully",
      });
    } catch (error) {
      console.error("Error saving appointment:", error.message);
      res.status(500).json({
        code: "Error",
        message: "Internal Server Error",
      });
    }
  };
}

export default postController;
