"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import OverlayCard from "./OverlayCard";
import { InitiativeProgress } from "../types/initiativeProgress";
import { Initiative } from "@/types/initiative";

export interface InitiativeCardProps {
    initiative: Initiative;
    logInitiativeProgress: (progress: InitiativeProgress, id: string) => void;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({
    initiative,
    logInitiativeProgress,
}) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    const ShowOverlay = () => {
        logInitiativeProgressWithId("Clicked");
        setShowOverlay(true);
    };

    const logInitiativeProgressWithId = (progress: InitiativeProgress) => {
        logInitiativeProgress(progress, initiative.id);
    };

    return (
        <OverlayCard
            showOverlay={showOverlay}
            action={initiative.action}
            logInitiativeProgress={logInitiativeProgressWithId}
        >
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <Link
                        href={initiative.url}
                        target="_blank"
                        onClick={ShowOverlay}
                    >
                        {initiative.title}
                    </Link>
                    <Link
                        href={initiative.organization_url}
                        target="_blank"
                        className="min-h-6.75 min-w-6.75 max-w-6.75 max-h-6.75"
                    >
                        <Image
                            className="dark:invert"
                            src={initiative.organization_image}
                            alt={initiative.organization_image}
                            width={30}
                            height={100}
                            priority
                        />
                    </Link>
                </CardTitle>
                <CardDescription>{initiative.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <Link
                    href={initiative.url}
                    target="_blank"
                    onClick={ShowOverlay}
                >
                    <Image
                        className="dark:invert"
                        src={initiative.image}
                        alt={initiative.image}
                        width={500}
                        height={100}
                        priority
                    />
                </Link>
            </CardContent>
        </OverlayCard>
    );
};

export default InitiativeCard;
