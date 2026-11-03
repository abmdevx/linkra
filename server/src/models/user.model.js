import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true
    },

    password:{
      type: String,
      required: [true , "password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

export default model("User", userSchema);