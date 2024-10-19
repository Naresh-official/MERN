import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <UtensilsCrossed className="h-24 w-24 text-orange-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold mb-4 text-orange-400">
                    404 - Page Not Found
                </h1>
                <p className="text-xl mb-8">
                    Oops! Looks like this dish isn't on our menu.
                </p>
                <p className="mb-8">
                    Don't worry, we've got plenty of other delicious options for
                    you to choose from.
                </p>
                <div className="flex flex-col justify-center sm:flex-row gap-4">
                    <Button
                        asChild
                        className="bg-orange-600 text-white hover:bg-orange-700 w-full sm:w-auto"
                    >
                        <Link to="/">Return to Home</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-orange-600 text-orange-400 hover:text-orange-500 w-full sm:w-auto"
                    >
                        <Link to="/menu">View Our Menu</Link>
                    </Button>
                </div>
            </div>
            <div className="mt-12 text-center">
                <p className="text-sm text-neutral-400">
                    If you believe this is an error, please contact our support
                    team at{" "}
                    <a
                        href="mailto:support@merneats.com"
                        className="text-orange-400 hover:underline"
                    >
                        support@merneats.com
                    </a>
                </p>
            </div>
        </div>
    );
}
