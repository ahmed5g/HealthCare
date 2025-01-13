import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config"; // Correct import
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    console.log("Creating user with data:", user); // Debugging
    console.log("Appwrite Endpoint:", process.env.NEXT_PUBLIC_ENDPOINT); // Debugging
    console.log("Appwrite Project ID:", process.env.PROJECT_ID); // Debugging
  
    try {
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name 
      );
      console.log("User created successfully:", newUser); // Debugging
      return parseStringify(newUser);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating user:", error); // Debugging
      if (error?.code === 409) {
        const documents = await users.list([Query.equal("email", [user.email])]);
        return parseStringify(documents.users[0]);
      }
      throw error; 
    }
  };