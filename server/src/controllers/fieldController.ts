import { Request, Response } from "express";
import Field from "../models/field";

export const createField = async (req: Request, res: Response) => {
  try {
    const field = await Field.create(req.body);
    res.status(201).json(field);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFields = async (_req: Request, res: Response) => {
  try {
    const fields = await Field.find({});
    res.status(200).json(fields);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteField = async (req: Request, res: Response) => {
  await Field.findByIdAndDelete(req.params.id);
  res.json({ message: "Field removed" });
};
