const express = require("express");
const { EmployeeModel } = require("../models/employeeModel");

const employeeController = express.Router();



employeeController.get("/", async (req, res) => {
    const _id = req.params.id
    const {filterBy,page,limit,q,sortBy,order} = req.query;
     console.log(filterBy);
  let employeeData = [];
 // let  skippedPage  = (page+)*limit


  try {
     if (filterBy && filterBy){
        employeeData = await EmployeeModel.find({department:filterBy});
        return res.json({ data: employeeData });
    }else if(page && limit){
        employeeData = await EmployeeModel.find().skip(page).limit(limit);
        return res.json({ data: employeeData });
    }else if(sortBy && order){
        if(order==="asc"){
            employeeData = await EmployeeModel.find().sort({salary:1});
        return res.json({ data: employeeData });
        }else if(order==="desc"){
              employeeData = await EmployeeModel.find().sort({salary:-1});
        return res.json({ data: employeeData });
        }
    }else if (q){
        employeeData = await EmployeeModel.find({department:{$regex:q}});
        return res.json({ data: employeeData });
    }
    else {
    employeeData = await EmployeeModel.find();
    return res.json({ data: employeeData });
    }
  } catch (err) {
    res.json({status:"Please provide a valid id"})
    console.log(err);
  }
});

employeeController.get("/:id",async(req,res)=>{
    const _id = req.params.id
    if(_id){
        employeeData = await EmployeeModel.findById(_id);
        return res.json({ data: employeeData });
    }
})

  // Creating Employee
employeeController.post("/create", async (req, res) => {
  const { first_Name, last_Name, email, department, salary } = req.body;

  try {
    const newEmployee = await EmployeeModel.create({
      first_Name,
      last_Name,
      email,
      department,
      salary,
    });
    return res.json({ newEmployee: newEmployee });
  } catch (err) {
    console.log(err);
  }
});

  // Creating Employee
  employeeController.patch("/edit/:id", async (req, res) => {
    const { first_Name, last_Name, email, department, salary } = req.body;
    const _id = req.params.id
     const updateBody = req.body;
    try {
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(_id,updateBody)
      const newUpdatedEmployee = await EmployeeModel.findOne({_id})
      return res.json({status:"success", updatedEmployee: newUpdatedEmployee });
    } catch (err) {
      console.log(err);
    }
  });


    // Creating Employee
employeeController.delete("/delete/:id", async (req, res) => {
    const { first_Name, last_Name, email, department, salary } = req.body;
    const _id = req.params.id
    try {
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(_id)
      return res.json({ status:"Deleted SuccessFully"});
    } catch (err) {
      console.log(err);
    }
  });


















module.exports = { employeeController };
