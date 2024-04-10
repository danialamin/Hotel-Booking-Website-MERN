import { Schema, model } from "mongoose";

type UserType = {
  _id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

const schema = new Schema<UserType>({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
})

const userModel = model<UserType>("user", schema)
export default userModel
export {UserType}