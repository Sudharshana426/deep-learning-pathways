const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema({
    name: String,
    provider: String,
    issueDate: String,
    expiryDate: String,
    credentialID: String,
    skills: [String]
});

const Certification = mongoose.model("Certification", CertificationSchema);
module.exports = Certification;
