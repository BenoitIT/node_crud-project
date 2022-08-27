const express = require("express");
const mongoose = require("mongoose");
const hospital_controller = require("./controllers/hospitalController")
const doctorsController = require("./controllers/doctorsController")
const authController = require("./controllers/authController")
const auth = require("./controllers/middleware/authMiddleware")
const adminauth = require("./controllers/middleware/adminAuthMiddleware")
const user = require("./Models/User");
const app = express();

app.use(express.json());
//system routes
//hospitals
app.post("/hospital", [auth.authmiddleware, adminauth.Admin], hospital_controller.saveHospital)
app.get("/hospital", hospital_controller.getHospitals)
app.delete("/hospital/:id", hospital_controller.deleteHospitals)
app.put("/hospital/:id", hospital_controller.updateHospital)
    //doctors
app.post("/doctor", doctorsController.newDoctor)
app.get("/doctor", doctorsController.doctorlist)
app.delete("/doctor/:id", doctorsController.deleteDoctor)
app.put("/doctor/:id", doctorsController.updateDoctor)
    //user register
app.post("/newUser", authController.saveUser)
app.get("/allUsers", authController.listUsers)
app.delete("/deleteUser/:id", authController.deleteuser)
app.post("/login", authController.loginUser)






mongoose.connect('mongodb://localhost:27017/ehealth', (err) => {
    if (err) {
        throw err
    } else {
        console.log("database connected successfully")
    }
});
app.listen(3000, () => {
    console.log("serve listening to the server on port 3000")

});