import React from "react";
import SavedApplication from "./_molecules/index";

const page = async props => {
  const searchParams = await props.searchParams;
  return <SavedApplication searchParams={searchParams} />;
};

export default page;
