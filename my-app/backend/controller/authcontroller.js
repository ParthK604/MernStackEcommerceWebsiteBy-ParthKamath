import User from "../Models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretkey=process.env.JWT_SECRET || "devs_secret";

export async function handlesignup(req, res) {
  try {
    const { fname, lname, email, phno, age, gender, pass, usern } = req.body;

    const existinguser = await User.findOne({ usern });
    if (existinguser) {
      return res.status(400).send("Username already exists");
    }

    const hashedpass = await bcrypt.hash(pass, 10);

    const newuser = new User({
      fname,
      lname,
      email,
      phno,
      age,
      gender,
      pass: hashedpass,
      usern,
    });

    await newuser.save();
    return res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Signing Up");
  }
}
export async function handlelogin(req, res) {
  try {
    const { loginuser, loginpass } = req.body;

    const existinguser = await User.findOne({ usern: loginuser });
    if (!existinguser) {
      return res.status(400).send("User not found");
    }

    const ismatch = await bcrypt.compare(loginpass, existinguser.pass);
    if (!ismatch) {
      return res.status(400).send("Invalid username or password");
    }

    const token = jwt.sign(
      { id: existinguser._id },
      secretkey,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
}

