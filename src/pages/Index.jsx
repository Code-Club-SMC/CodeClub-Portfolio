import React from "react";
// import HeaderMain from "../components/header/headerMain";
import HeroMain from "../components/heroSection/HeroMain";
import Helper from "../components/helper";
import CursorDot from "../components/CursorDot";
import DifferenceMain from "../components/differenceSec/DifferenceMain";
import GuidanceMain from "../components/guidance/GuidanceMain";
import ExpertiseMain from "../components/expertise/ExpertiseMain";
import NumbersMain from "../components/numbers/NumbersMain";
import ServicesMain from "../components/services/ServicesMain";
import ContactMain from "../components/contact/contactMain";
import UnlockComponent from "../components/UnlockComponent";
import Brands from "../components/brands/brands";
// import FooterMain from "../components/footer/FooterMain";

const Index = () => {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#001c3d] text-white">
      <CursorDot></CursorDot>
      {/* <HeaderMain></HeaderMain> */}
      <HeroMain></HeroMain>
      <DifferenceMain></DifferenceMain>
      <GuidanceMain></GuidanceMain>
      <ExpertiseMain></ExpertiseMain>
      <NumbersMain></NumbersMain>
      <ServicesMain></ServicesMain>
      <Brands></Brands>
      <UnlockComponent></UnlockComponent>
      {/* <ContactMain></ContactMain> */}
      {/* <FooterMain></FooterMain> */}
      {/* <Helper></Helper> */}
    </div>
  );
};

export default Index;
