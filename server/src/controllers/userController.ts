import { Request, Response } from "express";
import User from "./../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {

    const user = await User.create({
      data: req.body,   
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.error("CREATE USER ERROR 👉", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("GET USERS ERROR 👉", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { data: req.body },  
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

