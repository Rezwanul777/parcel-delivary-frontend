import Banner from "@/components/Banner";
import Faqs from "@/components/Faqs";



import OurMission from "@/components/OurMission";
import OurServices from "@/components/OurServices";



const Home = () => {
    return (
        <div>
          <Banner/>
          <OurServices/>
          <OurMission/>
         <Faqs
          heading="FAQs about Parcel Delivery"
        description="Find answers to common questions."
        supportHeading="Still need help?"
        supportDescription="Contact our support team for assistance."
        supportButtonText="Contact Support"
        supportButtonUrl="/support"
         />
          {/* <OurTeam/> */}
          {/* <NewsLetter/> */}
        </div>
    );
};

export default Home;