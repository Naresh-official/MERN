import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function MenuCard({
    title,
    description,
    price,
    imageSrc,
}: {
    title: string;
    description: string;
    price: number;
    imageSrc: string;
}) {
    return (
        <Card className="bg-neutral-900 border-orange-600">
            <CardHeader>
                <CardTitle className="text-orange-400">{title}</CardTitle>
                <CardDescription className="text-orange-50">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-400">
                        ₹ {price}
                    </span>
                    <img
                        alt={title}
                        className="rounded-full"
                        height="100"
                        src={imageSrc}
                        style={{
                            aspectRatio: "100/100",
                            objectFit: "cover",
                        }}
                        width="100"
                    />
                </div>
                <Button className="w-full mt-4 bg-orange-600 text-white hover:bg-orange-700">
                    Add to Order
                </Button>
            </CardContent>
        </Card>
    );
}
