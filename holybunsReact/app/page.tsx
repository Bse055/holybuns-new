import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeaturedCarousel } from "@/components/featured-carousel"

export default function Page() {
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

  const reviews = [
    {
      text: "Best burgers in town! Juicy, fresh, and packed with flavor. Holy Buns never disappoints.",
      author: "Ayesha K.",
    },
    {
      text: "The loaded fries are out of this world! Perfect combo with their premium beef burgers.",
      author: "Hamza R.",
    },
    {
      text: "Excellent service and heavenly taste. The hype is real — straight out'a heaven indeed!",
      author: "Sana M.",
    },
  ]

  return (
    <div className="container mx-auto px-4">
      {/* Hero */}
      <section className="py-16 text-center hb-hero-anim" id="home">
        <div className="mb-6">
          <Image src="/logo.png" alt="Holy Buns Logo" width={300} height={300} className="mx-auto" priority />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-primary hb-hero-title">
          {"Straight Out'a Heaven Burgers"}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{"Premium Beef & Chicken Burgers | Fries | Drinks"}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/menu">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Menu</Button>
          </Link>
          <Link href="/#about">
            <Button variant="secondary" className="hover:bg-secondary/80">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 hb-fade-in" id="featured">
        <h2 className="hb-section-title mb-8">Featured Items</h2>
        <FeaturedCarousel />
      </section>

      {/* About grid */}
      <section className="py-12 hb-fade-in" id="about">
        <h2 className="hb-section-title mb-8">About Us</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((card) => (
            <Card
              key={card.title}
              className="border-border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{card.emoji}</div>
                <h3 className="font-semibold text-primary mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 hb-fade-in" id="reviews">
        <h2 className="hb-section-title mb-8">Customer Reviews</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Card
              key={i}
              className="border-border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-6">
                <p className="text-sm italic hb-accent-text mb-3">{`"${review.text}"`}</p>
                <p className="text-sm font-medium text-accent">- {review.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
