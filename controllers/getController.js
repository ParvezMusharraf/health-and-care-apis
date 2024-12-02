
import SpecialtyModel from '../models/Spaciality.js'
import userModel from '../models/Users.js'
import Department from '../models/Departments.js';
import Appointment from '../models/Appointments.js';
import StatusModel from '../models/Status.js';

const docterRoleId = "6733464c000991a91df08e5a";

class getController {
    static getAllDocters = async(req,res)=>{
        try {
            const DoctersList = await userModel.find({roleId:docterRoleId})
            if(DoctersList.length == 0 ){
                return res.status(200).json({
                    code :"Failed",
                    message:"No Docter Found"
                })
            }
            res.status(200).json({
                code:"Failed",
                data:DoctersList,
                message:"Docters List"
            })

        } catch (error) {
            res.json({
                code:"Failed",
                message:"Unable To Get Docters"
            })
        }
    }
    static getAllSpeciality = async (req, res) => {
        try {
          const SpecilityList = await SpecialtyModel.find(); // Corrected query
          if (SpecilityList.length === 0) {
            return res.status(404).json({
              code: "Failed",
              message: "No specialties found",
            });
          }
      
          console.log(SpecilityList, "SpecilityList");
          res.status(200).json({
            code: "Success",
            data: SpecilityList,
            message: "Speciality list retrieved successfully",
          });
        } catch (error) {
          console.error("Error fetching speciality list:", error.message);
          res.status(500).json({
            code: "Failed",
            message: "Unable to get speciality list",
          });
        }
    };
    static getAllDepartments = async (req, res) => {
        try {
          const SpecilityList = await Department.find(); // Corrected query
          if (SpecilityList.length === 0) {
            return res.status(404).json({
              code: "Failed",
              message: "No Departments found",
            });
          }
      
          console.log(SpecilityList, "department");
          res.status(200).json({
            code: "Success",
            data: SpecilityList,
            message: "Department list retrieved successfully",
          });
        } catch (error) {
          console.error("Error fetching Department list:", error.message);
          res.status(500).json({
            code: "Failed",
            message: "Unable to get Department list",
          });
        }
    };
    static getAllAppointments = async (req, res) => {
        try {
          const SpecilityList = await Appointment.find(); // Corrected query
          if (SpecilityList.length === 0) {
            return res.status(404).json({
              code: "Failed",
              message: "No Appointment found",
            });
          }
      
          console.log(SpecilityList, "appointment");
          res.status(200).json({
            code: "Success",
            data: SpecilityList,
            message: "Appointment list retrieved successfully",
          });
        } catch (error) {
          console.error("Error fetching Appointment list:", error.message);
          res.status(500).json({
            code: "Failed",
            message: "Unable to get Appointment list",
          });
        }
    };
    static getAllStatus = async (req, res) => {
        try {
          const SpecilityList = await StatusModel.find(); // Corrected query
          if (SpecilityList.length === 0) {
            return res.status(404).json({
              code: "Failed",
              message: "No Status found",
            });
          }
      
          console.log(SpecilityList, "status");
          res.status(200).json({
            code: "Success",
            data: SpecilityList,
            message: "Status list retrieved successfully",
          });
        } catch (error) {
          console.error("Error fetching Status list:", error.message);
          res.status(500).json({
            code: "Failed",
            message: "Unable to get Status list",
          });
        }
    };
}

export default getController;