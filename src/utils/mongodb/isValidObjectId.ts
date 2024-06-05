import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const isValidObjectId = (id: string) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id;
export default isValidObjectId;
