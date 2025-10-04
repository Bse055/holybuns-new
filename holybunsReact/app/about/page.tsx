import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const aboutCards = [
    {
      emoji: "🍔",
      title: "Crafted with Passion",
      desc: "Every burger is built with love, fresh ingredients, and a passion for flavor. From juicy smashed beef patties to crispy fried chicken, each bite is heaven.",
    },
    {
      emoji: "🍟",
      title: "More than Just Food",
      desc: "At Holy Buns, we don't just serve meals — we create experiences. Whether it's a late-night craving or a casual hangout, we've got you covered.",
    },
    {
      emoji: "🔥",
      title: "Loaded with Flavor",
      desc: "Our loaded fries, premium add-ons, and heavenly sides are designed to make every order unforgettable and keep you coming back for more.",
    },
    {
      emoji: "✨",
      title: "Straight Out'a Heaven",
      desc: "Friendly service, cozy vibes, and a menu that truly delivers. Holy Buns is where every bite is a blessing.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h2 className="hb-section-title">About Holy Buns</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {aboutCards.map((card) => (
          <Card key={card.title} className="border-border bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{card.emoji}</div>
              <h3 className="font-semibold text-primary mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
