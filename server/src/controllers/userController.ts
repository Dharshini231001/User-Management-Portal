import { Request, Response } from "express";
import { UserPayload } from "../types/userPayload";


export const createUser = async (
  req: Request<{}, {}, UserPayload>,
  res: Response
) => {
  try {
    const user = req.body;

    return res.status(201).json({
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Users fetched successfully",
      data: []
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateUser = async (
  req: Request<{ id: string }, {}, UserPayload>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    return res.status(200).json({
      message: `User ${id} updated`,
      data: payload
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: `User ${id} deleted`
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
