export const swaggeroptions = {
  swagger: "2.0",
  info: {
    description: "API Documentation",
    version: "1.0.0",
    title: "Docter Management System",
  },
  host: "health-and-care-apis.onrender.com",
  schemes: ["https"], // Change to 'https' in production if secure
  paths: {
    // Users Api

    "/api/user/signup": {
      post: {
        tags: ["User Management"],
        description: "Create a new user",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User details required for signup",
            required: true,
            schema: {
              type: "object",
              properties: {
                firstname: { type: "string", example: "John" },
                lastname: { type: "string", example: "Doe" },
                email: { type: "string", example: "john.doe@example.com" },
                contactNo: { type: "string", example: "+1234567890" },
                password: { type: "string", example: "password123" },
              },
              required: [
                "firstname",
                "lastname",
                "email",
                "contactNo",
                "password",
              ],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "User created successfully",
            examples: {
              "application/json": {
                status: "success",
                message: "User Created Successfully",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
              },
            },
          },
          400: {
            description: "Validation error or bad request",
            examples: {
              "application/json": {
                status: "failed",
                message: "All fields are required",
              },
            },
          },
          409: {
            description: "User already exists",
            examples: {
              "application/json": {
                status: "failed",
                message: "User already exists",
              },
            },
          },
          500: {
            description: "Server error",
            examples: {
              "application/json": {
                status: "failed",
                message: "Unable to register",
              },
            },
          },
        },
      },
    },
    "/api/user/login": {
      post: {
        tags: ["User Management"],
        description: "Login a user",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User login credentials",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "john.doe@example.com" },
                password: { type: "string", example: "password123" },
              },
              required: ["email", "password"],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Login successful",
            examples: {
              "application/json": {
                status: "Success",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
                message: "Login Successfully",
              },
            },
          },
          401: {
            description: "Invalid credentials",
            examples: {
              "application/json": {
                status: "failed",
                message: "Email or Password is not Valid",
              },
            },
          },
          404: {
            description: "User not found",
            examples: {
              "application/json": {
                code: "failed",
                message: "You are not a Registered User",
              },
            },
          },
          400: {
            description: "Email or password missing",
            examples: {
              "application/json": {
                code: "failed",
                message: "Email or Password Required",
              },
            },
          },
          500: {
            description: "Server error",
            examples: {
              "application/json": {
                status: "failed",
                message: "Unable to Login",
              },
            },
          },
        },
      },
    },

    // Docters Apis

    "/api/save/SaveDocter": {
      post: {
        tags: ["Doctor Management"],
        description: "Create a new doctor profile",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Doctor details required to create a profile",
            required: true,
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string", example: "John" },
                lastName: { type: "string", example: "Doe" },
                email: { type: "string", example: "john.doe@example.com" },
                contactNo: { type: "string", example: "+1234567890" },
                password: { type: "string", example: "password123" },
                specialtyId: {
                  type: "string",
                  example: "63f7f1c5e0c1ab001c8f64e9",
                },
                fees: { type: "number", example: 500 },
                departmentId: {
                  type: "string",
                  example: "63f7f2b5e0c1ab001c8f64ea",
                },
                experience: { type: "number", example: 5 },
              },
              required: [
                "firstName",
                "lastName",
                "email",
                "contactNo",
                "password",
                "specialtyId",
                "fees",
                "departmentId",
                "experience",
              ],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          201: {
            description: "Doctor created successfully",
            examples: {
              "application/json": {
                status: "Success",
                message: "Doctor created successfully",
              },
            },
          },
          400: {
            description: "Validation error or user already exists",
            examples: {
              "application/json": {
                status: "Failed",
                message: "All fields are required",
              },
              "application/json": {
                status: "Failed",
                message: "User already exists",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                status: "Error",
                message: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    "/api/get/AllDocters": {
      get: {
        tags: ["Doctor Management"],
        description: "Retrieve a list of all doctors",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successfully retrieved doctors list",
            examples: {
              "application/json": {
                code: "Success",
                data: [
                  {
                    _id: "63f1bd79e13a9c9876543210",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    contactNo: "+1234567890",
                    roleId: "doctorRoleId",
                  },
                ],
                message: "Doctors List",
              },
              "application/json": {
                code: "Failed",
                message: "No Doctor Found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Unable To Get Doctors",
              },
            },
          },
        },
      },
    },
    "/api/save/SaveSpaciality": {
      post: {
        tags: ["Specialty Management"],
        description: "Create a new specialty",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Specialty details required to create a new specialty",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Cardiology" },
              },
              required: ["name"],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Specialty added successfully or already exists",
            examples: {
              "application/json": {
                code: "Success",
                message: "Specialty Added Successfully",
              },
              "application/json": {
                code: "Failed",
                message: "Specialty Already Available",
              },
            },
          },
          400: {
            description: "Validation error - name is required",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Name Required",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                status: "Error",
                message: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    "/api/get/AllSpecility": {
      get: {
        tags: ["Specialty Management"],
        description: "Retrieve a list of all specialties",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successfully retrieved the list of specialties",
            examples: {
              "application/json": {
                code: "Success",
                data: [
                  {
                    _id: "63f1be79e13a9c0987654321",
                    name: "Cardiology",
                  },
                  {
                    _id: "63f1be79e13a9c0987654322",
                    name: "Neurology",
                  },
                ],
                message: "Speciality list retrieved successfully",
              },
            },
          },
          404: {
            description: "No specialties found",
            examples: {
              "application/json": {
                code: "Failed",
                message: "No specialties found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Unable to get speciality list",
              },
            },
          },
        },
      },
    },
    "/api/save/SaveDepartment": {
      post: {
        tags: ["Department Management"],
        description: "Create a new department",
        parameters: [
          {
            in: "body",
            name: "body",
            description:
              "Department details required to create a new department",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Radiology" },
              },
              required: ["name"],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Department added successfully or already exists",
            examples: {
              "application/json": {
                code: "Success",
                message: "Department Added Successfully",
              },
              "application/json": {
                code: "Failed",
                message: "Department Already Available",
              },
            },
          },
          400: {
            description: "Validation error - name is required",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Name Required",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                status: "Error",
                message: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    "/api/get/AllDepartment": {
      get: {
        tags: ["Department Management"],
        description: "Retrieve a list of all departments",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successfully retrieved the list of departments",
            examples: {
              "application/json": {
                code: "Success",
                data: [
                  {
                    _id: "63f1bf79e13a9c0987654321",
                    name: "Cardiology",
                  },
                  {
                    _id: "63f1bf79e13a9c0987654322",
                    name: "Orthopedics",
                  },
                ],
                message: "Department list retrieved successfully",
              },
            },
          },
          404: {
            description: "No departments found",
            examples: {
              "application/json": {
                code: "Failed",
                message: "No Departments found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Unable to get Department list",
              },
            },
          },
        },
      },
    },
    "/api/save/SaveStatus": {
      post: {
        tags: ["Status Management"],
        description: "Create a new status",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Status details required to create a new status",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Active" },
              },
              required: ["name"],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Status added successfully or already exists",
            examples: {
              "application/json": {
                code: "Success",
                message: "Status Added Successfully",
              },
              "application/json": {
                code: "Failed",
                message: "Status Already Available",
              },
            },
          },
          400: {
            description: "Validation error - name is required",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Name Required",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                status: "Error",
                message: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    "/api/get/AllStatus": {
      get: {
        tags: ["Status Management"],
        description: "Retrieve a list of all appointment statuses",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successfully retrieved the list of statuses",
            examples: {
              "application/json": {
                code: "Success",
                data: [
                  {
                    _id: "63f1c079e13a9c0987654321",
                    name: "Pending",
                  },
                  {
                    _id: "63f1c079e13a9c0987654322",
                    name: "Confirmed",
                  },
                  {
                    _id: "63f1c079e13a9c0987654323",
                    name: "Completed",
                  },
                ],
                message: "Status list retrieved successfully",
              },
            },
          },
          404: {
            description: "No statuses found",
            examples: {
              "application/json": {
                code: "Failed",
                message: "No Status found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Unable to get Status list",
              },
            },
          },
        },
      },
    },
    "/api/save/Saveappointment": {
      post: {
        tags: ["Appointment Management"],
        description: "Book an appointment with a doctor",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Appointment details required to book an appointment",
            required: true,
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string", example: "John" },
                lastName: { type: "string", example: "Doe" },
                email: { type: "string", example: "john.doe@example.com" },
                contactNo: { type: "string", example: "+1234567890" },
                dateOfAppointment: {
                  type: "string",
                  format: "date",
                  example: "2024-12-15",
                },
                departmentId: {
                  type: "string",
                  example: "63f1bc36e13a9c123456789a",
                },
                docterId: {
                  type: "string",
                  example: "63f1bd79e13a9c9876543210",
                },
                notes: {
                  type: "string",
                  example: "Patient requires an urgent consultation.",
                },
              },
              required: [
                "firstName",
                "lastName",
                "email",
                "contactNo",
                "dateOfAppointment",
                "departmentId",
                "docterId",
              ],
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Appointment request sent successfully",
            examples: {
              "application/json": {
                code: "Success",
                data: {
                  _id: "63f1be79e13a9c0987654321",
                  firstname: "John",
                  lastname: "Doe",
                  email: "john.doe@example.com",
                  contactNo: "+1234567890",
                  appointmentDate: "2024-12-15",
                  departmentId: "63f1bc36e13a9c123456789a",
                  doctorId: "63f1bd79e13a9c9876543210",
                  notes: "Patient requires an urgent consultation.",
                  status: "pending",
                },
                message: "Appointment request sent successfully",
              },
            },
          },
          400: {
            description: "Validation error or missing fields",
            examples: {
              "application/json": {
                status: "Failed",
                message: "All fields are required",
              },
              "application/json": {
                status: "Failed",
                message: "Invalid email format",
              },
              "application/json": {
                status: "Failed",
                message: "Invalid contact number format",
              },
            },
          },
          404: {
            description: "Department or doctor not found",
            examples: {
              "application/json": {
                status: "Failed",
                message: "Department not found",
              },
              "application/json": {
                status: "Failed",
                message: "Doctor not found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                status: "Error",
                message: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    "/api/get/AllAppointment": {
      get: {
        tags: ["Appointment Management"],
        description: "Retrieve a list of all appointments",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successfully retrieved the list of appointments",
            examples: {
              "application/json": {
                code: "Success",
                data: [
                  {
                    _id: "63f1c079e13a9c0987654321",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    appointmentDate: "2024-12-05T10:00:00Z",
                    departmentId: "63f1b8f9e13a9c0987654321",
                    doctorId: "63f1c3f2e13a9c0987654322",
                    status: "pending",
                  },
                  {
                    _id: "63f1c079e13a9c0987654322",
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "jane.smith@example.com",
                    appointmentDate: "2024-12-06T14:00:00Z",
                    departmentId: "63f1b8f9e13a9c0987654323",
                    doctorId: "63f1c3f2e13a9c0987654324",
                    status: "confirmed",
                  },
                ],
                message: "Appointment list retrieved successfully",
              },
            },
          },
          404: {
            description: "No appointments found",
            examples: {
              "application/json": {
                code: "Failed",
                message: "No Appointment found",
              },
            },
          },
          500: {
            description: "Internal server error",
            examples: {
              "application/json": {
                code: "Failed",
                message: "Unable to get Appointment list",
              },
            },
          },
        },
      },
    },
  },
};
