import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuCard from "@/components/menuCard/MenuCard";

export default function MenuPage() {
    return (
        <div className="flex mt-16 md:mt-10 flex-col min-h-screen bg-neutral-950 text-orange-50">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-center">
                            Our Menu
                        </h1>
                        <Tabs defaultValue="starters" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-neutral-900">
                                <TabsTrigger
                                    value="starters"
                                    className="text-orange-400 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                >
                                    Starters
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mains"
                                    className="text-orange-400 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                >
                                    Main Courses
                                </TabsTrigger>
                                <TabsTrigger
                                    value="desserts"
                                    className="text-orange-400 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                >
                                    Desserts
                                </TabsTrigger>
                                <TabsTrigger
                                    value="drinks"
                                    className="text-orange-400 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                >
                                    Drinks
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="starters" className="mt-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <MenuCard
                                        title="Spicy Mern Nachos"
                                        description="Crispy tortilla chips loaded with melted cheese, jalapeños, and our signature Mern sauce."
                                        price={11.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Fusion Spring Rolls"
                                        description="Crispy rolls filled with a blend of vegetables and exotic spices, served with sweet chili sauce."
                                        price={7.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Mern-style Bruschetta"
                                        description="Toasted baguette slices topped with a mixture of diced tomatoes, garlic, basil, and olive oil."
                                        price={6.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="mains" className="mt-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <MenuCard
                                        title="Spicy Mern Burger"
                                        description="Our famous burger with a spicy kick, served with crispy fries and coleslaw."
                                        price={14.9}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Fusion Pasta"
                                        description="East meets West in this delightful pasta dish, tossed in a creamy sauce with exotic spices."
                                        price={16.9}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Mern Steak"
                                        description="Perfectly grilled steak seasoned with our secret Mern spice blend, served with roasted vegetables."
                                        price={24.9}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="desserts" className="mt-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <MenuCard
                                        title="Decadent Lava Cake"
                                        description="A chocolate lover's dream dessert, oozing with warm chocolate sauce."
                                        price={8.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Mern Cheesecake"
                                        description="Creamy cheesecake with a twist of exotic flavors, topped with fresh berries."
                                        price={7.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Fusion Fruit Tart"
                                        description="A delicate pastry filled with custard and topped with a medley of fresh, seasonal fruits."
                                        price={6.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="drinks" className="mt-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <MenuCard
                                        title="Mern Mojito"
                                        description="A refreshing blend of mint, lime, and rum with a Mern twist."
                                        price={9.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Fusion Iced Tea"
                                        description="Our signature iced tea infused with exotic fruits and spices."
                                        price={4.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                    <MenuCard
                                        title="Spicy Mango Margarita"
                                        description="A spicy-sweet combination of mango, tequila, and a hint of chili."
                                        price={10.99}
                                        imageSrc="/placeholder.svg?height=100&width=100"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
        </div>
    );
}
