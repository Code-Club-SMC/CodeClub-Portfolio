import React from "react";
import HeroMain from "../components/heroSection/HeroMain";
import Helper from "../components/helper";
import CursorDot from "../components/CursorDot";
import DifferenceMain from "../components/DifferenceMain";
import GuidanceMain from "../components/Guidance";
import ExpertiseMain from "../components/ExpertiseMain";
import NumbersMain from "../components/numbers/NumbersMain";
import ServicesMain from "../components/services/ServicesMain";
import ContactMain from "../components/contact/contactMain";
import UnlockComponent from "../components/UnlockComponent";
import Brands from "../components/brands/brands";


const Index = () => {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#001c3d] text-white">
      <CursorDot></CursorDot>
      <HeroMain></HeroMain>
      <DifferenceMain></DifferenceMain>
      <GuidanceMain></GuidanceMain>
      <ExpertiseMain></ExpertiseMain>
      <NumbersMain></NumbersMain>
      <ServicesMain></ServicesMain>
      <Brands></Brands>
      <UnlockComponent></UnlockComponent>
    </div>
  );
};

export default Index;
