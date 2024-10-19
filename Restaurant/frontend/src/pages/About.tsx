import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Users, Leaf, MapPin } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen mt-10 bg-neutral-950 text-neutral-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-orange-400">
                    About MernEats
                </h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                        Our Story
                    </h2>
                    <p className="mb-4">
                        Founded in 2015, MernEats began as a small fusion
                        restaurant in New York City. Our unique blend of flavors
                        and innovative dishes quickly gained popularity, leading
                        to rapid expansion across major U.S. cities.
                    </p>
                    <p className="mb-4">
                        Today, MernEats proudly serves customers in New York,
                        Los Angeles, Chicago, and Houston, bringing our
                        signature taste to food enthusiasts across the nation.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                        Our Mission
                    </h2>
                    <p className="mb-4">
                        At MernEats, our mission is to revolutionize the dining
                        experience by fusing diverse culinary traditions with
                        modern techniques. We strive to create memorable meals
                        that surprise and delight our customers, while fostering
                        a sense of community around good food.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-orange-400">
                        Our Values
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-neutral-900 border-orange-600">
                            <CardHeader>
                                <CardTitle className="flex items-center text-orange-400">
                                    <UtensilsCrossed className="mr-2 h-6 w-6" />
                                    Culinary Innovation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-neutral-50">
                                We constantly push the boundaries of flavor,
                                combining unexpected ingredients to create
                                exciting new dishes.
                            </CardContent>
                        </Card>
                        <Card className="bg-neutral-900 border-orange-600">
                            <CardHeader>
                                <CardTitle className="flex items-center text-orange-400">
                                    <Users className="mr-2 h-6 w-6" />
                                    Community Focus
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-neutral-50">
                                We believe in creating welcoming spaces where
                                people can come together to share great food and
                                make lasting memories.
                            </CardContent>
                        </Card>
                        <Card className="bg-neutral-900 border-orange-600">
                            <CardHeader>
                                <CardTitle className="flex items-center text-orange-400">
                                    <Leaf className="mr-2 h-6 w-6" />
                                    Sustainability
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-neutral-50">
                                We're committed to sourcing ingredients
                                responsibly and minimizing our environmental
                                impact across all our locations.
                            </CardContent>
                        </Card>
                        <Card className="bg-neutral-900 border-orange-600">
                            <CardHeader>
                                <CardTitle className="flex items-center text-orange-400">
                                    <MapPin className="mr-2 h-6 w-6" />
                                    Local Engagement
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-neutral-50">
                                In each city we operate, we strive to engage
                                with local communities and support local
                                producers and suppliers.
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                        Join Us on Our Culinary Journey
                    </h2>
                    <p className="mb-4">
                        Whether you're a long-time fan or new to MernEats, we
                        invite you to join us on our ongoing culinary journey.
                        Visit any of our locations to experience the unique
                        flavors, warm atmosphere, and exceptional service that
                        define the MernEats experience.
                    </p>
                    <p>
                        Thank you for being a part of our story. We look forward
                        to serving you and continuing to evolve the world of
                        fusion cuisine.
                    </p>
                </section>
            </div>
        </div>
    );
}
