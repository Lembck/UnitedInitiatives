import InitiativeCardContainer from "@/components/InitiativeCardContainer";
import MenuDropdown from "@/components/MenuDropdown";
import SignOutButton from "@/components/SignInOutButton";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
            <header className="flex justify-between items-center w-full px-4">
                <MenuDropdown />
                <div className="font-bold text-3xl py-6 bg-linear-to-br from-red-600 via-white to-blue-600 bg-clip-text text-transparent">
                    United Initiatives
                </div>
                <div className="w-12 h-6"></div>
            </header>
            <main className="flex w-full min-h-screen sm:flex-row flex-col items-center justify-between px-3 pb-3 gap-3 dark:bg-black sm:items-start">
                <InitiativeCardContainer />
            </main>
        </div>
    );
}
