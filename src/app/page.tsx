import InitiativeCard from "@/components/InitiativeCard";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 font-sans dark:bg-black">
            <main className="flex w-full min-h-screen sm:flex-row flex-col items-center justify-between py-32 px-3 gap-3 dark:bg-black sm:items-start">
                <InitiativeCard
                    title="Demand the Removal of Kristi Noem"
                    description="Sign the petition demanding accountability for the ICE abuses she's excusing and encouraging."
                    initiativeImage="/images/CommonCause-FireNoem.png"
                    initiativeURL="https://act.commoncause.org/petitions/fire-kristi-noem/"
                    organizationImage="/images/CommonCause.png"
                    organizationURL="https://www.commoncause.org/"
                />
                <InitiativeCard
                    title="Stop the GOP’s new voter suppression legislation"
                    description="Email your member of congress to vote against legislation that will make it harder for millions of Americans to vote."
                    initiativeImage="/images/Indivisible-VoterSuppression.png"
                    initiativeURL="https://act.indivisible.org/sign/stop-gops-new-voter-suppression-legislation/"
                    organizationImage="/images/Indivisible.png"
                    organizationURL="https://indivisible.org/"
                />
            </main>
        </div>
    );
}
