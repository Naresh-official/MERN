import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
    const cartItems = [
        { id: 1, name: "Spicy Mern Burger", price: 14.99, quantity: 2 },
        { id: 2, name: "Fusion Pasta", price: 16.99, quantity: 1 },
        { id: 3, name: "Mern Mojito", price: 9.99, quantity: 2 },
    ];

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.08; // Assuming 8% tax
    const total = subtotal + tax;

    return (
        <div className="min-h-screen mt-10 bg-neutral-950 text-neutral-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-orange-400">
                    Your Cart
                </h1>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <Card
                                key={item.id}
                                className="mb-4 bg-neutral-900 text-neutral-50 border-orange-600"
                            >
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-orange-400">
                                        {item.name}
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-orange-400 hover:text-orange-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">
                                            ${item.price.toFixed(2)}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="text-lg font-semibold">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <Card className="bg-neutral-900 border-orange-600 text-neutral-50">
                            <CardHeader>
                                <CardTitle className="text-orange-400">
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">
                                    Proceed to Checkout
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
