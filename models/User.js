const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const validator = require('validator');
//const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true // need to add return message if email has already been used
        // THREE OPTIONS FOR VALIDATION ->
        // 1: validate with validator package
        //         validate: [validator.isEmail, 'invalid email'] 
        // 2: use a regex validator 
        //         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        // 3: or validate on front-end only
        // ---> SAME OPTIONS FOR PASSWORD VAILDATION
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    orientation: {
        type: String
    },
    location: {
        type: String
    },
    top_songs: [
        {
            type: String,
        },
    ],
     // will need front-end validation to limit to 3 items in array
    // add required: true later on?
    image: {
        type: String,
        default: 'https://commons.wikimedia.org/wiki/File:Profile_avatar_placeholder_large.png'
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    matches: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User', // does this work?
        },
    ]
});

// BCRYPT PASSWORD HASHING
// userSchema.methods = {
// 	checkPassword: function(inputPassword) {
// 		return bcrypt.compareSync(inputPassword, this.password);
// 	},
// 	hashPassword: plainTextPassword => {
// 		return bcrypt.hashSync(plainTextPassword, 10);
// 	}
// };

// userSchema.pre('save', function(next) {
// 	if (!this.password) {
// 		console.log('No password!');
// 		next();
// 	} else {
// 		this.password = this.hashPassword(this.password);
// 		next();
// 	}
// })

const User = mongoose.model("User", userSchema);

module.exports = User;
