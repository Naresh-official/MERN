import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight";
import { StarsBackground } from "@/components/ui/stars-background";
import { Clock, Star, MapPin } from "lucide-react";

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-orange-50">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="orange"
                    />
                    <StarsBackground />
                    <div className="container px-4 md:px-6">
                        <div className="flex p-5 flex-col w-1/2 mx-auto items-center space-y-4 text-center">
                            <div className="">
                                <h1 className="text-3xl text-center w-full m-5 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to MernEats
                                </h1>
                                <p className="mx-auto max-w-[700px] text-orange-200 md:text-xl">
                                    Experience the fusion of flavors across
                                    multiple cities. Where every bite tells a
                                    story, no matter where you are.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <Button className="w-[180px] bg-orange-600 text-white hover:bg-orange-700">
                                    Find a Location
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-[180px] border-orange-600 text-orange-400 hover:text-orange-500"
                                >
                                    View Menu
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <Clock className="h-10 w-10 text-orange-400" />
                                <h2 className="text-2xl font-bold">
                                    Fast Service
                                </h2>
                                <p className="text-orange-200">
                                    Quick preparation without compromising on
                                    quality, in every city we serve.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <Star className="h-10 w-10 text-orange-400" />
                                <h2 className="text-2xl font-bold">
                                    Top Rated
                                </h2>
                                <p className="text-orange-200">
                                    Consistently rated 5-stars by our satisfied
                                    customers across all locations.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <MapPin className="h-10 w-10 text-orange-400" />
                                <h2 className="text-2xl font-bold">
                                    Multiple Locations
                                </h2>
                                <p className="text-orange-200">
                                    Find us in major cities across the country
                                    for your convenience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Our Signature Dishes
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col items-center space-y-4">
                                <img
                                    alt="Spicy Mern Burger"
                                    className="aspect-square object-cover border-2 border-orange-400 rounded-full"
                                    height="300"
                                    src="https://streetfood.oceanwp.org/wp-content/uploads/2023/07/grilled-cheeseburger-sesame-bun-with-fresh-toppings-generative-ai-1-1.jpg"
                                    width="300"
                                />
                                <h3 className="text-xl font-bold">
                                    Spicy Mern Burger
                                </h3>
                                <p className="text-orange-200 text-center">
                                    Our famous burger with a spicy kick,
                                    available at all locations.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <img
                                    alt="Fusion Pasta"
                                    className="aspect-square object-cover border-2 border-orange-400 rounded-full"
                                    height="300"
                                    src="https://www.vikhrolicucina.com/uploads/stories/1717073553_freshpastawithheartybologneseparmesancheesegeneratedbyai.jpg"
                                    width="300"
                                />
                                <h3 className="text-xl font-bold">
                                    Fusion Pasta
                                </h3>
                                <p className="text-orange-200 text-center">
                                    East meets West in this delightful pasta
                                    dish, a favorite across cities.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <img
                                    alt="Decadent Lava Cake"
                                    className="aspect-square object-cover border-2 border-orange-400 rounded-full"
                                    height="300"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZO-SnNRCVi4JKCXqbrvXweKNJlVyeKKwXXQ&s"
                                    width="300"
                                />
                                <h3 className="text-xl font-bold">
                                    Decadent Lava Cake
                                </h3>
                                <p className="text-orange-200 text-center">
                                    A chocolate lover's dream dessert,
                                    consistently delicious in every city.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Our Locations
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col items-center space-y-4 p-6 border border-orange-600 rounded-lg">
                                <h3 className="text-2xl font-bold">New York</h3>
                                <p className="text-orange-200 text-center">
                                    123 Broadway, New York, NY 10001
                                </p>
                                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                                    Order Now
                                </Button>
                            </div>
                            <div className="flex flex-col items-center space-y-4 p-6 border border-orange-600 rounded-lg">
                                <h3 className="text-2xl font-bold">
                                    Los Angeles
                                </h3>
                                <p className="text-orange-200 text-center">
                                    456 Hollywood Blvd, Los Angeles, CA 90028
                                </p>
                                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                                    Order Now
                                </Button>
                            </div>
                            <div className="flex flex-col items-center space-y-4 p-6 border border-orange-600 rounded-lg">
                                <h3 className="text-2xl font-bold">Chicago</h3>
                                <p className="text-orange-200 text-center">
                                    789 Michigan Ave, Chicago, IL 60611
                                </p>
                                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                                    Order Now
                                </Button>
                            </div>
                            <div className="flex flex-col items-center space-y-4 p-6 border border-orange-600 rounded-lg">
                                <h3 className="text-2xl font-bold">Houston</h3>
                                <p className="text-orange-200 text-center">
                                    101 Main St, Houston, TX 77002
                                </p>
                                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                                    Order Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Join Our Mailing List
                                </h2>
                                <p className="mx-auto max-w-[600px] text-orange-200 md:text-xl">
                                    Stay updated with our latest offers and new
                                    menu items across all our locations.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <Input
                                        className="bg-neutral-800 border-orange-600 placeholder:text-orange-300"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <Button
                                        className="bg-orange-600 text-white hover:bg-orange-700"
                                        type="submit"
                                    >
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-orange-800">
                <p className="text-xs text-orange-400">
                    © 2024 MernEats. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        to={"/"}
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        to={"/"}
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
