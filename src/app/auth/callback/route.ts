import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    console.log("Callback hit - code:", code);
    console.log("All search params:", Object.fromEntries(searchParams));

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        console.log("Exchange error:", error);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }

        // Include error details in redirect
        return NextResponse.redirect(
            `${origin}/auth/auth-code-error?error=${error.message}`,
        );
    }

    // No code provided
    console.log("No code in callback");
    return NextResponse.redirect(
        `${origin}/auth/auth-code-error?error=no_code`,
    );
}
