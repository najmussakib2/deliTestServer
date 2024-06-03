import { massage } from "./massage.model.js";

const createMassageInDB = async (data) => {
    const result = await massage.create(data);
    return result;
  };

const deleteSingleMassageFromDB = async (_id) => {
    const result = await massage.deleteOne({ _id });
    return result;
};

const getAllMassageFromDB = async () => {
    const result = await massage.find();
    return result;
  };



export const massageServices = {
    createMassageInDB,
    deleteSingleMassageFromDB,
    getAllMassageFromDB
}