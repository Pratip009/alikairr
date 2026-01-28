import React from "react";
import IndustriesServed from "../components/industries-component";
import PublicHospitals from "../components/Public-hospitals-component";
import ClinicsAndFacilities from "../components/ClinicsAndFacilities";
import PublicInstitutions from "../components/PublicInstitutions";
import PrimeContractors from "../components/PrimeContractors";

const Industries = () => {
  return (
    <section>
      <IndustriesServed />
      <PublicHospitals />
      <ClinicsAndFacilities />
      <PublicInstitutions />
      <PrimeContractors />
    </section>
  );
};

export default Industries;
