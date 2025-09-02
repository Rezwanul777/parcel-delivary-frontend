import { About } from "@/components/modules/Home/About"
import { Contact } from "@/components/modules/Home/Contact"
import { Faq } from "@/components/modules/Home/FAQ"
import { Hero } from "@/components/modules/Home/Hero"


const Homepage = () => {
  return (
    <div className="p-10">
      <Hero/>
      <About/>
      <Faq
        heading="FAQs about Parcel Delivery"
        description="Find answers to common questions."
        supportHeading="Still need help?"
        supportDescription="Contact our support team for assistance."
        supportButtonText="Contact Support"
        supportButtonUrl="/support"
      />
      <Contact/>
    </div>
  )
}

export default Homepage