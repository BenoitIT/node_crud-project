const express = require("express")
const user = require("../Models/User");
const hospitals = require("../Models/hospitals");
const saveHospital = async(req, res) => {
    try {
        const Hospital = new hospitals();
        Hospital.hospitalName = req.body.hospitalName;
        Hospital.hospitalLocation = req.body.hospitalLocation;
        Hospital.province = req.body.province;
        Hospital.district = req.body.district;
        await Hospital.save((err) => {
            if (err) throw err
        });
        const doneby = await user.findById(req.authuser._id)
        console.log(doneby.email)
        res.json({
            message: 'data saved',
            data: Hospital,
            savedby: doneby.email
        })
    } catch (error) {
        console.log(error.message)
    }
}
const getHospitals = async(req, res) => {
    try {
        const hospital = await hospitals.find();
        res.json({
            message: "hospitals fetched successfully",
            hospitals: hospital
        })
    } catch (error) {
        console.log(error.message)
    }

}
const deleteHospitals = async(req, res) => {
    try {
        const hospId = req.params.id;
        const ondeleting = await hospitals.findByIdAndRemove(hospId);
        console.log(ondeleting)
        res.json({ message: "hospitals is deleted" })
    } catch (error) {
        console.log(error.message)
    }
}
const updateHospital = async(req, res) => {
    try {
        const hospId = req.params.id;
        const hospital = await hospitals.findById(hospId)
        if (!hospital) return console.log("not found");
        hospital.hospitalName = req.body.hospitalName;
        hospital.hospitalLocation = req.body.hospitalLocation;
        hospital.district = req.body.district;
        hospital.province = req.body.province;
        await hospital.save()
        res.json({ message: "hospital updated" })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = { saveHospital, getHospitals, deleteHospitals, updateHospital }