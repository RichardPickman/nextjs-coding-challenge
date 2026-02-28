import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { useUserAuth } from "../hooks/useAuth";

export const Login = () => {
    const [username, setUsername] = useState("");
    const { login, isLoggingIn } = useUserAuth();

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            login(username);
                        }}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="competitor№1"
                                    required
                                    disabled={isLoggingIn}
                                    onChange={(e) =>
                                        setUsername(e.currentTarget.value)
                                    }
                                    value={username}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
