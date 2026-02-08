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

export interface InitiativeCardProps {
    title: string;
    description: string;
    initiativeImage: string;
    initiativeURL: string;
    organizationImage: string;
    organizationURL: string;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({
    title,
    description,
    initiativeImage,
    initiativeURL,
    organizationImage,
    organizationURL,
}) => {
    return (
        <Card className="w-full pb-0 overflow-hidden">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <Link href={initiativeURL} target="_blank">
                        {title}
                    </Link>
                    <Link
                        href={organizationURL}
                        target="_blank"
                        className="min-h-[27px] min-w-[27px] max-w-[27px] max-h-[27px]"
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
                <Link href={initiativeURL} target="_blank">
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
        </Card>
    );
};

export default InitiativeCard;
