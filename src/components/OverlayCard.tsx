import { Card } from "@/components/ui/card";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

interface OverlayCardProps {
    children: ReactNode;
    showOverlay: boolean;
}

const OverlayCard: React.FC<OverlayCardProps> = ({ children, showOverlay }) => {
    return (
        <div className="relative w-full">
            <Card className="w-full pb-0 overflow-hidden">{children}</Card>
            {showOverlay && (
                <div className="absolute inset-0 bg-neutral-900/90 border rounded-xl flex flex-col items-center justify-center z-10 gap-3">
                    <div className="text-white font-bold text-2xl text-center space-y-4">
                        Let us know if you<br/>called your senators.
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline">Not yet</Button>
                        <Button variant="outline">Yes, In Progress</Button>
                        <Button variant="secondary">Yes, Complete</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverlayCard;
