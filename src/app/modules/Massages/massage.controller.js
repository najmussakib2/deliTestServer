import { massageServices } from "./massage.service.js";

const getAllMassages = async (req, res) => {
  try {
    const result = await massageServices.getAllMassageFromDB();

    res.status(200).json({
      success: true,
      message: "massages are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const createMassage = async (req, res) => {
  try {
    const { massage } = req.body;
    const result = await massageServices.createMassageInDB(massage);

    res.status(200).json({
      success: true,
      message: "massage created succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteMassage = async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await massageServices.deleteSingleMassageFromDB(ID);

    res.status(200).json({
      success: true,
      message: "massages retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const massageController = {
  getAllMassages,
  createMassage,
  deleteMassage,
};
