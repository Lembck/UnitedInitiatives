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
import { Button } from "./ui/button";
import OverlayCard from "./OverlayCard";
import { InitiativeProgress } from "../types/initiativeProgress";

export interface InitiativeCardProps {
    title: string;
    description: string;
    initiativeImage: string;
    initiativeURL: string;
    organizationImage: string;
    organizationURL: string;
    logInitiativeProgress: (progress: InitiativeProgress) => void;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({
    title,
    description,
    initiativeImage,
    initiativeURL,
    organizationImage,
    organizationURL,
    logInitiativeProgress,
}) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    const ShowOverlay = () => {
        logInitiativeProgress("Clicked");
        setShowOverlay(true);
    };

    return (
        <OverlayCard
            showOverlay={showOverlay}
            logInitiativeProgress={logInitiativeProgress}
        >
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <Link
                        href={initiativeURL}
                        target="_blank"
                        onClick={ShowOverlay}
                    >
                        {title}
                    </Link>
                    <Link
                        href={organizationURL}
                        target="_blank"
                        className="min-h-6.75 min-w-6.75 max-w-6.75 max-h-6.75"
                    >
                        <Image
                            className="dark:invert"
                            src={organizationImage}
                            alt={organizationImage}
                            width={30}
                            height={100}
                            priority
                        />
                    </Link>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <Link
                    href={initiativeURL}
                    target="_blank"
                    onClick={ShowOverlay}
                >
                    <Image
                        className="dark:invert"
                        src={initiativeImage}
                        alt={initiativeImage}
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
