import { User } from "../../../types";
import { UsersRepository } from "../UsersRepository";
import { lineRed } from "../../../utils/logger";
import userModel from "./models/user.model";
import { isValidObjectId } from "../../../utils";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const apiSecret = process.env.API_SECRET;
const MongooseUsersRepository = (): UsersRepository => {
  return {
    getAllUsers: async function (): Promise<User[]> {
      try {
        const users = await userModel.find({});
        return users;
      } catch (error) {
        lineRed(`Error trying to find users: ${error}`);
        throw error;
      }
    },
    login: async function (userContent): Promise<Object | null> {
      try {
        const { username, password } = userContent;
        const user = await userModel.findOne({ username });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        const token = jwt.sign(
          { id: user._id, username: user.username, role: user.role },
          apiSecret,
          {
            expiresIn: "4h",
          }
        );

        return { token, username: user.username, role: user.role };
      } catch (error) {
        lineRed(`Error trying to log in, error: ${error}`);
        return null;
      }
    },
    register: async function (userContent): Promise<User | null> {
      try {
        const { username, password, email } = userContent;

        const existingUser = await userModel.findOne({ username });
        if (existingUser) return null;

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) return null;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
          username,
          password: hashedPassword,
          email,
          created_at: dayjs().toISOString(),
          liked_posts: [],
          points: 0,
          role: "Regular",
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        lineRed(`Error trying to register user: ${error}`);
        return null;
      }
    },
    updateUser: async function (id: string, user: User): Promise<User | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const { username, password, email, points, role } = user;

        await userModel.findByIdAndUpdate(id, {
          username,
          password,
          email,
          points,
          role,
        });
        return user;
      } catch (error) {
        lineRed(
          `Error trying to update the user with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    removeUser: async function (id: string): Promise<string | null> {
      if (!isValidObjectId(id)) return null;
      try {
        await userModel.findByIdAndDelete(id);
        return id;
      } catch (error) {
        lineRed(
          `Error trying to remove the user with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
    getUser: async function (id: string): Promise<User | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const user = await userModel.findById(id);
        return user;
      } catch (error) {
        lineRed(
          `Error trying to find the user with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
  };
};
export default MongooseUsersRepository;
