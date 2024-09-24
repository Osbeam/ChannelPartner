const express = require("express");
const bussinessIncome = express.Router();
const bussinessServices = require("../services/bussinessIncomeServices");
const BussinessIncome = require("../model/bussinessIncomeSchema");
const ProfessionalIncome = require("../model/professionalIncomeSchema");
const SalaryIncome = require("../model/salaryIncomeSchema");
const { sendResponse } = require("../utils/common");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const imgUpload = require("../utils/imageUpload");



const City = [
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Aizawl",
  "Ajmer",
  "Alappuzha",
  "Aligarh",
  "Allahabad",
  "Ambala",
  "Amravati",
  "Amritsar",
  "Anantapur",
  "Aurangabad",
  "Bangalore",
  "Bareilly",
  "Belgaum",
  "Bhagalpur",
  "Bharatpur",
  "Bhilai",
  "Bhiwandi",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Bilaspur",
  "Bokaro Steel City",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Durgapur",
  "Erode",
  "Faridabad",
  "Firozabad",
  "Ghaziabad",
  "Gorakhpur",
  "Gulbarga",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Hubli",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jamnagar",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Kannur",
  "Kanpur",
  "Karnal",
  "Kochi",
  "Kolkata",
  "Kollam",
  "Kozhikode",
  "Kurnool",
  "Latur",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Malappuram",
  "Mathura",
  "Meerut",
  "Moradabad",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Nanded",
  "Nashik",
  "Nellore",
  "Noida",
  "Patna",
  "Pondicherry",
  "Prayagraj",
  "Pune",
  "Raipur",
  "Rajahmundry",
  "Rajkot",
  "Ranchi",
  "Rourkela",
  "Salem",
  "Sangli",
  "Shimla",
  "Siliguri",
  "Solapur",
  "Srinagar",
  "Surat",
  "Thanjavur",
  "Thiruvananthapuram",
  "Tiruchirappalli",
  "Tiruppur",
  "Udaipur",
  "Ujjain",
  "Vadodara",
  "Varanasi",
  "Vasai-Virar",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
  "Yamunanagar",
  "Ahmednagar",
  "Ajmer",
  "Akola",
  "Aligarh",
  "Alwar",
  "Amroha",
  "Anand",
  "Arrah",
  "Asansol",
  "Bahraich",
  "Ballari",
  "Begusarai",
  "Bhagalpur",
  "Bharuch",
  "Bhavnagar",
  "Bhiwani",
  "Bidar",
  "Bulandshahr",
  "Chhapra",
  "Davanagere",
  "Dhule",
  "Dibrugarh",
  "Dimapur",
  "Etawah",
  "Farrukhabad",
  "Fatehpur",
  "Firozpur",
  "Gandhinagar",
  "Gaya",
  "Ghazipur",
  "Godhra",
  "Gopalpur",
  "Gulbarga",
  "Hajipur",
  "Haldwani",
  "Hisar",
  "Hoshangabad",
  "Idukki",
  "Jabalpur",
  "Jagdalpur",
  "Jalgaon",
  "Jalna",
  "Jalpaiguri",
  "Jammu",
  "Jamnagar",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Junagadh",
  "Kadapa",
  "Kakinada",
  "Kalyan-Dombivli",
  "Kamarhati",
  "Kancheepuram",
  "Karaikudi",
  "Karimnagar",
  "Karnal",
  "Karur",
  "Katni",
  "Kavali",
  "Kishanganj",
  "Kolhapur",
  "Kollam",
  "Kota",
  "Kottayam",
  "Kozhikode",
  "Kumbakonam",
  "Kurnool",
  "Latur",
  "Loni",
  "Madhubani",
  "Malda",
  "Mangalore",
  "Margoa",
  "Mathura",
  "Medinipur",
  "Mehsana",
  "Mirzapur",
  "Morena",
  "Muzaffarpur",
  "Nadiad",
  "Nagaon",
  "Nagercoil",
  "Nagapattinam",
  "Nagpur",
  "Nainital",
  "Namakkal",
  "Nanded",
  "Nandurbar",
  "Narasaraopet",
  "Navsari",
  "Nellore",
  "New Delhi",
  "Neyveli",
  "Nizamabad",
  "Noida",
  "Nokha",
  "Ongole",
  "Palakkad",
  "Palanpur",
  "Pali",
  "Panipat",
  "Parbhani",
  "Pathankot",
  "Patiala",
  "Phagwara",
  "Pondicherry",
  "Pudukkottai",
  "Raebareli",
  "Raichur",
  "Rajahmundry",
  "Rajapalayam",
  "Rajgarh",
  "Rajkot",
  "Rajsamand",
  "Ramagundam",
  "Rampur",
  "Ranchi",
  "Ratlam",
  "Ratnagiri",
  "Rewa",
  "Rewari",
  "Rohtak",
  "Rourkela",
  "Sagar",
  "Saharanpur",
  "Salem",
  "Sambalpur",
  "Sangli",
  "Satara",
  "Satna",
  "Sehore",
  "Shahjahanpur",
  "Shimla",
  "Shillong",
  "Shimoga",
  "Sikar",
  "Silchar",
  "Siliguri",
  "Sindhudurg",
  "Singrauli",
  "Sirsa",
  "Sitapur",
  "Solan",
  "Sonipat",
  "South Dumdum",
  "Sri Ganganagar",
  "Srikakulam",
  "Srinagar",
  "Surat",
  "Tadepalligudem",
  "Tandur",
  "Tenali",
  "Tenkasi",
  "Tezpur",
  "Thanjavur",
  "Thiruvalla",
  "Thiruvananthapuram",
  "Thoothukudi",
  "Thrissur",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupati",
  "Tiruppur",
  "Tiruvannamalai",
  "Tonk",
  "Tumkur",
  "Udaipur",
  "Udgir",
  "Ujjain",
  "Ulhasnagar",
  "Ullal",
  "Umarkhed",
  "Unnao",
  "Vadodara",
  "Valsad",
  "Vapi",
  "Varanasi",
  "Vellore",
  "Veraval",
  "Vidisha",
  "Vijayawada",
  "Viluppuram",
  "Virar",
  "Virudhunagar",
  "Visakhapatnam",
  "Vizianagaram",
  "Warangal",
  "Wardha",
  "Wayanad",
  "Yavatmal",
  "Yelahanka",
  "Yemmiganur",
  "Yerraguntla",
];


bussinessIncome.put("/updateOrCreateBussiness/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    const additionalData = req.body;

    let interestedCustomerData = null;

    if (id) {
      // Try to fetch data from SalaryIncome first
      interestedCustomerData = await SalaryIncome.findById(id).lean();
      if (!interestedCustomerData) {
        // If not found in SalaryIncome, fetch from Admin
        interestedCustomerData = await Admin.findById(id).lean();
        if (!interestedCustomerData) {
          // If not found in Admin, fetch from ProfessionalIncome
          interestedCustomerData = await ProfessionalIncome.findById(id).lean();
          if (!interestedCustomerData) {
            // If not found in Admin, fetch from LeadSchema
            interestedCustomerData = await Lead.findById(id).lean();
          }
        }
      }
    }

    let newData = { ...additionalData };

    if (interestedCustomerData) {
      // Combine the interested customer data with the additional data
      newData = {
        ...interestedCustomerData,
        ...additionalData,        
      };                                            
    }

    // Check if a document exists in the BussinessIncome schema with the same ID
    let updatedBussinessIncome;
    if (id) {
      updatedBussinessIncome = await BussinessIncome.findById(id);
    }

    if (updatedBussinessIncome) {
      // Update the existing document
      updatedBussinessIncome = await BussinessIncome.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
    } else {
      // Create a new document
      newData._id = id; // Set the ID to the new document
      updatedBussinessIncome = new BussinessIncome(newData);
      await updatedBussinessIncome.save();
    }

    // Respond with the updated or created data
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Business Income updated or created successfully!",
      data: updatedBussinessIncome,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});


bussinessIncome.get("/getAllBusinessIncome", async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (currentPage - 1) * limit;

    // Fetch all salary income documents
    const salaryIncomes = await SalaryIncome.find().lean();
    // Fetch all business income documents
    const businessIncomes = await BussinessIncome.find().lean();
    // Fetch all professional income documents
    const professionalIncomes = await ProfessionalIncome.find().lean();

    // Create maps for salary, business, and professional incomes
    const salaryIncomeMap = salaryIncomes.reduce((acc, income) => {
      acc[income._id] = income;
      return acc;
    }, {});
    
    const businessIncomeMap = businessIncomes.reduce((acc, income) => {
      acc[income._id] = income;
      return acc;
    }, {});

    const professionalIncomeMap = professionalIncomes.reduce((acc, income) => {
      acc[income._id] = income;
      return acc;
    }, {});

    // Create a list of all user IDs found in salary, business, and professional incomes
    const allUserIds = new Set([
      ...Object.keys(salaryIncomeMap),
      ...Object.keys(businessIncomeMap),
      ...Object.keys(professionalIncomeMap)
    ]);

    // Combine salary, business, and professional income data
    const combinedIncomes = Array.from(allUserIds).map(userId => ({
      userId,
      salaryIncome: salaryIncomeMap[userId] || null,
      businessIncome: businessIncomeMap[userId] || null,
      professionalIncome: professionalIncomeMap[userId] || null
    }));

    // Calculate totalCount for combined data
    const totalCount = combinedIncomes.length;
    // Paginate combined data
    const paginatedIncomes = combinedIncomes.slice(skip, skip + limit);

    // Respond with the combined data and pagination info
    sendResponse(res, 200, "Success", {
      success: true,
      message: "User income documents retrieved successfully!",
      data: paginatedIncomes,
      pagination: {
        currentPage,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});


bussinessIncome.get("/cities", (req, res) =>
  sendResponse(res, 200, "Success", {
    success: true,
    message: "Cities retrieve successfully!",
    Cities: City,
  })
);


bussinessIncome.get("/GetUserIncomes/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return sendResponse(res, 400, "Failed", {
        message: "userId parameter is required",
      });
    }

    const salaryIncomes = await SalaryIncome.find({ _id: userId }).lean();
    const businessIncomes = await BussinessIncome.find({ _id: userId }).lean();

    const userIncomes = {
      userId,
      salaryIncomes,
      businessIncomes,
    };

    sendResponse(res, 200, "Success", {
      success: true,
      message: "User income documents retrieved successfully!",
      data: userIncomes,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});


bussinessIncome.put("/EditBusinessData", async (req, res) => {
  try {
    const data = await bussinessServices.updateData({ _id: req.body._id }, req.body);
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Business Updated successfully!",
      data: data
    });
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});



module.exports = bussinessIncome;
