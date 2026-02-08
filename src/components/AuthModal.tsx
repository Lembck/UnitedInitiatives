"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthView = "sign-in" | "sign-up" | "forgot-password" | "verify-reset";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<AuthView>("sign-in");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "error" | "success";
        text: string;
    } | null>(null);

    // Form fields
    const [usernameOrPhone, setUsernameOrPhone] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [phoneForReset, setPhoneForReset] = useState(""); // Store phone for reset flow

    const supabase = createClient();

    if (!isOpen) return null;

    // Helper to check if input is phone number (starts with + or all digits)
    const isPhoneNumber = (input: string) => {
        return /^[\d+\s()-]+$/.test(input.trim());
    };

    // Helper to format phone number (add + if missing)
    const formatPhone = (input: string) => {
        const cleaned = input.replace(/[\s()-]/g, "");
        return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
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
            const formattedPhone = formatPhone(phone);

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

            // 2. Sign up with phone and password
            const { data, error } = await supabase.auth.signUp({
                phone: formattedPhone,
                password: password,
                options: {
                    data: {
                        username: username,
                    },
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
                        phone: formattedPhone,
                    });

                if (profileError) throw profileError;
            }

            setMessage({
                type: "success",
                text: "Account created! Please verify your phone number with the code sent to you.",
            });

            // Switch to sign in view after a delay
            setTimeout(() => {
                setView("sign-in");
                setMessage(null);
            }, 3000);
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
            let phoneToUse = usernameOrPhone;

            // If input is not a phone number, look up the phone from username
            if (!isPhoneNumber(usernameOrPhone)) {
                const { data: profile, error: lookupError } = await supabase
                    .from("user_profiles")
                    .select("phone")
                    .eq("username", usernameOrPhone)
                    .single();

                if (lookupError || !profile) {
                    setMessage({ type: "error", text: "Username not found" });
                    setLoading(false);
                    return;
                }

                phoneToUse = profile.phone;
            } else {
                phoneToUse = formatPhone(usernameOrPhone);
            }

            // Sign in with phone and password
            const { data, error } = await supabase.auth.signInWithPassword({
                phone: phoneToUse,
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
            let phoneToUse = usernameOrPhone;

            // If input is not a phone number, look up the phone from username
            if (!isPhoneNumber(usernameOrPhone)) {
                const { data: profile, error: lookupError } = await supabase
                    .from("user_profiles")
                    .select("phone")
                    .eq("username", usernameOrPhone)
                    .single();

                if (lookupError || !profile) {
                    setMessage({ type: "error", text: "Username not found" });
                    setLoading(false);
                    return;
                }

                phoneToUse = profile.phone;
            } else {
                phoneToUse = formatPhone(usernameOrPhone);
            }

            // Send OTP for password reset
            const { error } = await supabase.auth.signInWithOtp({
                phone: phoneToUse,
            });

            if (error) throw error;

            // Store the phone for the verification step
            setPhoneForReset(phoneToUse);

            setMessage({
                type: "success",
                text: "Verification code sent to your phone!",
            });

            // Switch to verification view
            setTimeout(() => {
                setView("verify-reset");
                setMessage(null);
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

    const handleVerifyAndResetPassword = async (e: React.FormEvent) => {
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
            // Verify the OTP code and get session
            const { error: verifyError } = await supabase.auth.verifyOtp({
                phone: phoneForReset,
                token: verificationCode,
                type: "sms",
            });

            if (verifyError) throw verifyError;

            // Update the password
            const { error: updateError } = await supabase.auth.updateUser({
                password: password,
            });

            if (updateError) throw updateError;

            setMessage({
                type: "success",
                text: "Password reset successfully!",
            });

            // Switch back to sign in
            setTimeout(() => {
                setView("sign-in");
                resetForm();
            }, 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                text: error.message || "Verification failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setUsernameOrPhone("");
        setUsername("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setVerificationCode("");
        setPhoneForReset("");
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
                    {view === "verify-reset" && "Verify & Reset"}
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
                                Username or Phone Number
                            </label>
                            <input
                                type="text"
                                value={usernameOrPhone}
                                onChange={(e) =>
                                    setUsernameOrPhone(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="username or +1234567890"
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
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+1234567890"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Include country code (e.g., +1 for US)
                            </p>
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
                            Enter your username or phone number and we'll send
                            you a verification code.
                        </p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username or Phone Number
                            </label>
                            <input
                                type="text"
                                value={usernameOrPhone}
                                onChange={(e) =>
                                    setUsernameOrPhone(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="username or +1234567890"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Sending code..."
                                : "Send Verification Code"}
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

                {/* Verify and Reset Password Form */}
                {view === "verify-reset" && (
                    <form
                        onSubmit={handleVerifyAndResetPassword}
                        className="space-y-4"
                    >
                        <p className="text-sm text-gray-600 mb-4">
                            Enter the verification code sent to your phone and
                            your new password.
                        </p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123456"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
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
                                Confirm New Password
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
                            {loading
                                ? "Resetting password..."
                                : "Reset Password"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            <button
                                type="button"
                                onClick={() => switchView("sign-in")}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Back to sign in
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
