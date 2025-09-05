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
          <Faqs/>
          {/* <OurTeam/> */}
          {/* <NewsLetter/> */}
        </div>
    );
};

export default Home;