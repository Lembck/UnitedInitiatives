import InitiativeCard from "@/components/InitiativeCard";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
            <header>
                <div className="font-bold text-2xl py-6 text-[#333]">
                    United Initiatives
                </div>
            </header>
            <main className="flex w-full min-h-screen sm:flex-row flex-col items-center justify-between px-3 pb-3 gap-3 dark:bg-black sm:items-start">
                <InitiativeCard
                    title="Sign the petition to Impeach Trump. Again."
                    description="Demand that Congress immediately impeach and remove Trump for his unlawful conduct. (List of impeachable offenses included)."
                    initiativeImage="/images/ImpeachTrumpAgain.png"
                    initiativeURL="https://www.impeachtrumpagain.org/#action"
                    organizationImage="/images/FreeSpeech4People.svg"
                    organizationURL="https://freespeechforpeople.org/"
                />
                <InitiativeCard
                    title="Not a penny more for ICE brutality"
                    description="Call your senators to refuse to vote for any appropriations bill funding the DHS that fails to rein in ICE."
                    initiativeImage="/images/Indivisible-ICEOUT.png"
                    initiativeURL="https://act.indivisible.org/sign/stop-gops-new-voter-suppression-legislation/"
                    organizationImage="/images/Indivisible.png"
                    organizationURL="https://indivisible.org/"
                />
                <InitiativeCard
                    title="Stop the GOP’s new voter suppression legislation"
                    description="Email your member of congress to vote against legislation that will make it harder for millions of Americans to vote."
                    initiativeImage="/images/Indivisible-VoterSuppression.png"
                    initiativeURL="https://act.indivisible.org/sign/stop-gops-new-voter-suppression-legislation/"
                    organizationImage="/images/Indivisible.png"
                    organizationURL="https://indivisible.org/"
                />
                <InitiativeCard
                    title="Permanently Protect Our National Forests from Industrial Development"
                    description="Sign the petition demanding accountability for the ICE abuses she's excusing and encouraging."
                    initiativeImage="/images/SierraClub-ProtectForests.jpeg"
                    initiativeURL="https://act.sierraclub.org/actions/National?actionId=AR0569577"
                    organizationImage="/images/SierraClub.svg"
                    organizationURL="https://www.sierraclub.org/"
                />
                <InitiativeCard
                    title="Demand the Removal of Kristi Noem"
                    description="Sign the petition demanding accountability for the ICE abuses she's excusing and encouraging."
                    initiativeImage="/images/CommonCause-FireNoem.png"
                    initiativeURL="https://act.commoncause.org/petitions/fire-kristi-noem/"
                    organizationImage="/images/CommonCause.png"
                    organizationURL="https://www.commoncause.org/"
                />
            </main>
        </div>
    );
}
