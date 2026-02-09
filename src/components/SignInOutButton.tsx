"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface SignInOutButtonProps {
    isAuthenticated: boolean;
    handleSignIn: () => void;
}

const SignInOutButton: React.FC<SignInOutButtonProps> = ({
    isAuthenticated,
    handleSignIn,
}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <Button
            variant="ghost"
            className="text-left px-2 w-full justify-start"
            onClick={isAuthenticated ? handleSignOut : handleSignIn}
        >
            {isAuthenticated ? "Sign Out" : "Sign In"}
        </Button>
    );
};

export default SignInOutButton;
