"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { InitiativeProgress } from "../types/initiativeProgress";
import InitiativeCard from "./InitiativeCard";
import AuthModal from "./AuthModal";
import { Initiative } from "@/types/initiative";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const InitiativeCardContainer = () => {
    const { user, isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [initiatives, setInitatives] = useState<Initiative[]>([]);

    useEffect(() => {
        const fetchInitiatives = async () => {
            const response = await fetch("/api/get/initiatives", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = (await response.json()).data as Initiative[];
            if (result) {
                setInitatives(result);
            }
        };
        fetchInitiatives();
    }, []);

    const logInitiativeProgress = async (
        progress: InitiativeProgress,
        id: string,
    ) => {
        if (!isAuthenticated && progress != "Clicked" && progress != "NotYet") {
            setShowAuthModal(true);
            return;
        }

        const response = await fetch("/api/add/initiative_progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                progress: progress,
                initiative: id,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Row added:", result.data);
        } else {
            console.error("Error:", result.error);
        }
    };
    return (
        <>
            {initiatives.map((initiative) => {
                return (
                    <InitiativeCard
                        key={initiative.id}
                        id={initiative.id}
                        title={initiative.title}
                        description={initiative.description}
                        initiativeImage={initiative.initiative_image}
                        initiativeURL={initiative.initiative_url}
                        organizationImage={initiative.organization_image}
                        organizationURL={initiative.organization_url}
                        logInitiativeProgress={logInitiativeProgress}
                    />
                );
            })}
            {initiatives.length == 0 ? (
                <>
                    <Card className="w-full h-78">
                        <CardHeader>
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="aspect-video w-full" />
                        </CardContent>
                    </Card>
                    <Card className="w-full h-78">
                        <CardHeader>
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="aspect-video w-full" />
                        </CardContent>
                    </Card>
                    <Card className="w-full h-78">
                        <CardHeader>
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="aspect-video w-full" />
                        </CardContent>
                    </Card>
                </>
            ) : (
                <></>
            )}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};

export default InitiativeCardContainer;
