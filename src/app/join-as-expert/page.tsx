"use client";

import FormPageContainer from "@/components/FormPageContainer/FormPageContainer";
import JoinAsExpertForm from "@/features/JoinAsExpertPage/JoinAsExpertForm/JoinAsExpertForm";
import ROUTES from "@/constants/routes";

const JoinAsExpertPage = () => {
  return (
    <FormPageContainer
      title="Join as an Expert"
      subtitle="Already have an expert account?"
      route={ROUTES.SIGNIN}
      routeLabel="Sign in"
      brandingTitle="Share your expertise and inspire learners around the world."
      showBranding={false}
    >
      <JoinAsExpertForm />
    </FormPageContainer>
  );
};

export default JoinAsExpertPage;
