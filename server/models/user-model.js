const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    lastName: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String,
        require: true,
    },
    countryCode: {
        type: String,
        require: true,
    },
    streetAddress: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    ZIPCode: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    currentEmployer: {
        type: String,
        require: true,
    },
    jobTitle: {
        type: String,
        require: true,
    },
    jobDescription: {
        type: String,
        require: true,
    },
    employmentStartDate: {
        type: String,
        require: true,
    },
    employmentEndDate: {
        type: String,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    linkdInLink: {
        type: String,
        require: false,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: false,
    },
    isAdmin: {
        type: Boolean,
        require: false,
    },
    workHistory: {
        type: Array,
        require: false,
    },
    skills: {
        type: Array,
        require: false,
    },
    educationQualification: {
        type: Array,
        require: false,
    },
    
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }

})

userSchema.methods.passwordCompare = async function (password) {
    return bcrypt.compare(password, this.password);
}


userSchema.methods.generateToken = async function () {

    try {

        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            phone: this.phone,
        },
            process.env.JWT_SECRET_TOKEN, {
            expiresIn: "30d"
        }
        );
    } catch (error) {
        next(error);
    }

};



const User = new mongoose.model("User", userSchema);

module.exports = User;