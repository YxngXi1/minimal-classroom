import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github"
import { connectMongoDB } from "./mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({user, account}): Promise<any> {
            const{name, email} = user;
            console.log('User: ', user);
            console.log('Account', account);
        
            if (account && account.provider === "google") {
                try {
                    await connectMongoDB();
                    const UserExists = await User.findOne({ email });

                    if (!UserExists) {
                        await fetch('http://localhost:3000/api/user', {
                            method: 'POST',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                name,
                                email,
                            }),
                        });
            
                        const res = await fetch('http://localhost:3000/api/user', {
                            method: 'POST',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                name,
                                email,
                            }),
                        });
                        
                        if (res.ok) {
                            return user;
                        }
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            return user;
        }
    }
}