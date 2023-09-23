import LandingBullet from "./LandingBullet"
const LandingWhy = () => {
  return (
    <div className="bg-[#118AB2] p-6 pt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-nunito capitalize font-extrabold full-width-font w-full text-neutral-800">
        Why choose budhub</h2>
      <LandingBullet title="Fast Delivery" text="Get your order delivered quickly with our fleet of dedicated drivers" />
      <LandingBullet title="Top-Quality Products" text="Our partners offer the finest selections of THC and cannibis products available." />
      <LandingBullet title="Customer Support" text="Our friendly support team is here for you, every step of the way." />
      <LandingBullet title="Compliance and Security" text="Our mission goes beyond convenience. We are committed to the safe, responsible, and legal distribution of cannabis products." />
  </div>
  )
}

export default LandingWhy