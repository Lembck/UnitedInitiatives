"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthView = "sign-in" | "sign-up" | "forgot-password" | "check-email";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<AuthView>("sign-up");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "error" | "success";
        text: string;
    } | null>(null);

    // Form fields
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const supabase = createClient();

    if (!isOpen) return null;

    // Helper to check if input is email
    const isEmail = (input: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage({
                type: "error",
                text: "Password must be at least 6 characters",
            });
            setLoading(false);
            return;
        }

        try {
            // 1. Check if username is already taken
            const { data: existingUser } = await supabase
                .from("user_profiles")
                .select("username")
                .eq("username", username)
                .single();

            if (existingUser) {
                setMessage({ type: "error", text: "Username already taken" });
                setLoading(false);
                return;
            }

            // 2. Sign up with email and password
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            // 3. Create user profile with username
            if (data.user) {
                const { error: profileError } = await supabase
                    .from("user_profiles")
                    .insert({
                        id: data.user.id,
                        username: username,
                        email: email,
                    });

                if (profileError) throw profileError;
            }

            setMessage({
                type: "success",
                text: "Account created! Please check your email to verify your account.",
            });

            // Switch to check-email view
            setTimeout(() => {
                setView("check-email");
            }, 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message || "Sign up failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let emailToUse = usernameOrEmail;

            // If input is not an email, look up the email from username
            if (!isEmail(usernameOrEmail)) {
                const { data: profile, error: lookupError } = await supabase
                    .from("user_profiles")
                    .select("email")
                    .eq("username", usernameOrEmail)
                    .single();

                if (lookupError || !profile) {
                    setMessage({ type: "error", text: "Username not found" });
                    setLoading(false);
                    return;
                }

                emailToUse = profile.email;
            }

            // Sign in with email and password
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailToUse,
                password: password,
            });

            if (error) throw error;

            setMessage({ type: "success", text: "Signed in successfully!" });

            // Close modal after success
            setTimeout(() => {
                onClose();
                resetForm();
            }, 1000);
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message || "Sign in failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let emailToUse = usernameOrEmail;

            // If input is not an email, look up the email from username
            if (!isEmail(usernameOrEmail)) {
                const { data: profile, error: lookupError } = await supabase
                    .from("user_profiles")
                    .select("email")
                    .eq("username", usernameOrEmail)
                    .single();

                if (lookupError || !profile) {
                    setMessage({ type: "error", text: "Username not found" });
                    setLoading(false);
                    return;
                }

                emailToUse = profile.email;
            }

            // Send password reset email
            const { error } = await supabase.auth.resetPasswordForEmail(
                emailToUse,
                {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                },
            );

            if (error) throw error;

            setMessage({
                type: "success",
                text: "Password reset link sent! Check your email.",
            });

            // Switch to check-email view
            setTimeout(() => {
                setView("check-email");
            }, 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message || "Password reset failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setUsernameOrEmail("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage(null);
    };

    const switchView = (newView: AuthView) => {
        setView(newView);
        resetForm();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                {/* Close button */}
                <button
                    onClick={() => {
                        onClose();
                        resetForm();
                        setView("sign-in"); // Reset to sign-in view when closing
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-6">
                    {view === "sign-in" && "Sign In"}
                    {view === "sign-up" && "Create Account"}
                    {view === "forgot-password" && "Reset Password"}
                    {view === "check-email" && "Check Your Email"}
                </h2>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-4 p-3 rounded ${
                            message.type === "error"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Sign In Form */}
                {view === "sign-in" && (
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username or Email
                            </label>
                            <input
                                type="text"
                                value={usernameOrEmail}
                                onChange={(e) =>
                                    setUsernameOrEmail(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="username or email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => switchView("forgot-password")}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot password?
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => switchView("sign-up")}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                )}

                {/* Sign Up Form */}
                {view === "sign-up" && (
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="johndoe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => switchView("sign-in")}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </form>
                )}

                {/* Forgot Password Form */}
                {view === "forgot-password" && (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Enter your username or email and we'll send you a
                            link to reset your password.
                        </p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username or Email
                            </label>
                            <input
                                type="text"
                                value={usernameOrEmail}
                                onChange={(e) =>
                                    setUsernameOrEmail(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="username or email@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending link..." : "Send Reset Link"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Remember your password?{" "}
                            <button
                                type="button"
                                onClick={() => switchView("sign-in")}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </form>
                )}

                {/* Check Email View */}
                {view === "check-email" && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-green-500"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <p className="mt-4 text-gray-600">
                                We've sent you an email with instructions.
                                Please check your inbox and spam folder.
                            </p>
                        </div>

                        <button
                            onClick={() => switchView("sign-in")}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Back to Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
