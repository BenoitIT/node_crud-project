const express = require("express");
const Doctor = require("../Models/Doctor");
const newDoctor = async(req, res) => {
    try {
        const doctorInfo = new Doctor()
        doctorInfo.doctor_name = req.body.doctor_name;
        doctorInfo.doctor_email = req.body.doctor_email;
        doctorInfo.doctor_age = req.body.doctor_age;
        doctorInfo.doctor_nationality = req.body.doctor_nationality;
        doctorInfo.hospital = req.body.hospital;
        const results = await doctorInfo.save()
        res.json({ message: "doctor records saved successfully" })
    } catch (error) {
        console.log(error.message)
    }
}
const doctorlist = async(req, res) => {
    const list = await Doctor.find()
        .populate("hospital", "hospitalName hospitalLocation-_id")
        .select("doctor_name doctor_email hospital")
    res.json({ message: "list of doctors", doctors: list })
}
const deleteDoctor = async(req, res) => {
    const did = req.params.id
    try {
        const ondelete = await Doctor.findByIdAndRemove(did)
        res.json({ message: "single data deleted" })
    } catch (error) {
        console.log(error.message)
    }

}
const updateDoctor = async(req, res) => {
    const did = req.params.id
    try {
        const onupdatdoc = await Doctor.findById(did)
        if (!onupdatdoc) {
            res.json({
                message: "no record found"
            })
        }
        onupdatdoc.doctor_name = req.body.doctor_name;
        onupdatdoc.doctor_email = req.body.doctor_email;
        onupdatdoc.doctor_age = req.body.doctor_age;
        onupdatdoc.doctor_nationality = req.body.doctor_nationality;
        onupdatdoc.hospital = req.body.hospital;
        onupdatdoc.save()
        res.json({ message: "records updated" })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { newDoctor, doctorlist, deleteDoctor, updateDoctor }