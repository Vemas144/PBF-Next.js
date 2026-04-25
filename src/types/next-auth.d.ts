import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      fullname?: string;
      role?: "member" | "admin" | "editor"; 
      type?: string;                          
      id?: string;                            
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string;
    role?: "member" | "admin" | "editor"; 
    type?: string;                          
    image?: string;                         
    email?: string;                         
  
  }
}