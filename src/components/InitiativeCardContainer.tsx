"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { InitiativeProgress } from "./types/initiativeProgress";
import InitiativeCard from "./InitiativeCard";
import AuthModal from "./AuthModal";

const InitiativeCardContainer = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const logInitiativeProgress = (progress: InitiativeProgress) => {
        console.log(`clicked ${progress}`);
        if (!isAuthenticated && progress != "Clicked" && progress != "NotYet") {
            setShowAuthModal(true);
            return;
        }

        // User is logged in - proceed with action
        console.log("User is logged in:", user?.email);
        // Do your protected action here
    };
    return (
        <>
            <InitiativeCard
                title="Sign the petition to Impeach Trump. Again."
                description="Demand that Congress immediately impeach and remove Trump for his unlawful conduct. (List of impeachable offenses included)."
                initiativeImage="/images/ImpeachTrumpAgain.png"
                initiativeURL="https://www.impeachtrumpagain.org/#action"
                organizationImage="/images/FreeSpeech4People.svg"
                organizationURL="https://freespeechforpeople.org/"
                logInitiativeProgress={logInitiativeProgress}
            />
            <InitiativeCard
                title="Not a penny more for ICE brutality"
                description="Call your senators to refuse to vote for any appropriations bill funding the DHS that fails to rein in ICE."
                initiativeImage="/images/Indivisible-ICEOUT.png"
                initiativeURL="https://indivisible.org/actions/ice-out-senate/"
                organizationImage="/images/Indivisible.png"
                organizationURL="https://indivisible.org/"
                logInitiativeProgress={logInitiativeProgress}
            />
            <InitiativeCard
                title="Stop the GOP’s new voter suppression legislation"
                description="Email your member of congress to vote against legislation that will make it harder for millions of Americans to vote."
                initiativeImage="/images/Indivisible-VoterSuppression.png"
                initiativeURL="https://act.indivisible.org/sign/stop-gops-new-voter-suppression-legislation/"
                organizationImage="/images/Indivisible.png"
                organizationURL="https://indivisible.org/"
                logInitiativeProgress={logInitiativeProgress}
            />
            <InitiativeCard
                title="Permanently Protect Our National Forests from Industrial Development"
                description="Help us protect over 45 million acres of public lands—treasured national forests—from yet another Trump administration attack."
                initiativeImage="/images/SierraClub-ProtectForests.jpeg"
                initiativeURL="https://act.sierraclub.org/actions/National?actionId=AR0569577"
                organizationImage="/images/SierraClub.svg"
                organizationURL="https://www.sierraclub.org/"
                logInitiativeProgress={logInitiativeProgress}
            />
            <InitiativeCard
                title="Demand the Removal of Kristi Noem"
                description="Sign the petition demanding accountability for the ICE abuses she's excusing and encouraging."
                initiativeImage="/images/CommonCause-FireNoem.png"
                initiativeURL="https://act.commoncause.org/petitions/fire-kristi-noem/"
                organizationImage="/images/CommonCause.png"
                organizationURL="https://www.commoncause.org/"
                logInitiativeProgress={logInitiativeProgress}
            />
            {isAuthenticated && <p>Logged in as: {user?.email}</p>}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};

export default InitiativeCardContainer;
