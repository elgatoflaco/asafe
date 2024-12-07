import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'

async function getStatistics() {
    // Simulamos una llamada a API con un retraso
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        {
            title: "Pokémon Totales",
            value: "1008",
            icon: Users,
            description: "Generación 1-9",
        },
        {
            title: "Tipos",
            value: "18",
            icon: DollarSign,
            description: "Desde Normal hasta Hada",
        },
        {
            title: "Regiones",
            value: "9",
            icon: ShoppingCart,
            description: "De Kanto a Paldea",
        },
        {
            title: "Juegos Principales",
            value: "32",
            icon: TrendingUp,
            description: "Incluyendo variantes",
        },
    ]
}

export async function StatisticsCards() {
    const stats = await getStatistics()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="dark:bg-black dark:text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium dark:text-gray-200">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
