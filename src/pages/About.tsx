import OurMission from "@/components/OurMission";
import OurServices from "@/components/OurServices";


const About = () => {
  return (
    <div className="">
      {/* --- Page Header --- */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-semibold mb-4">About Us</h2>
        </div>
      </section>

      <OurServices />

      <OurMission />

     
    </div>
  );
};

export default About;