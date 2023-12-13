const mongoose = require("mongoose");

employeeSchema = mongoose.Schema({
    first_Name:{type:String,required:true},
    last_Name:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String,required:true,enum:["Tech","Marketing","Operations"]},
    salary:{type:String,required:true},
})

const EmployeeModel = mongoose.model("employee",employeeSchema)


module.exports = {EmployeeModel};