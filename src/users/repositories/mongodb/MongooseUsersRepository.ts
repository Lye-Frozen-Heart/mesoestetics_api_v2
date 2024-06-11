import { User } from "../../../types";
import { UsersRepository } from "../UsersRepository";
import { lineRed } from "../../../utils/logger";
import rewardModel from "./models/user.model";
import { isValidObjectId } from "../../../utils";
import dayjs from "dayjs";
const MongooseUsersRepository = (): UsersRepository => {
  return {
    getAllUsers: async function (): Promise<User[]> {
      try {
        const users = await rewardModel.find({});
        return users;
      } catch (error) {
        lineRed(`Error trying to find users: ${error}`);
        throw error;
      }
    },
    getUser: async function (id: string): Promise<User | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const user = await rewardModel.findById(id);
        if (user != null) return user;
        return null;
      } catch (error) {
        lineRed(
          `Error trying to find the user with id ${id}, error found: ${error}`
        );
        return null;
      }
    },
    addUser: async function (User: User): Promise<User | null> {
      try {
        const { username, password, email, role } = User;
        const newUser = new rewardModel({
          username,
          password,
          email,
          created_at: dayjs().toISOString(),
          liked_posts: [],
          points: 0,
          role,
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        lineRed(`Error trying to save the new user: ${error}`);
        return null;
      }
    },
    updateUser: async function (id: string, user: User): Promise<User | null> {
      if (!isValidObjectId(id)) return null;
      try {
        const { username, password, email, points, role } = user;

        await rewardModel.findByIdAndUpdate(id, {
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
        await rewardModel.findByIdAndDelete(id);
        return id;
      } catch (error) {
        lineRed(
          `Error trying to remove the user with id: ${id}, error found: ${error}`
        );
        return null;
      }
    },
  };
};
export default MongooseUsersRepository;
