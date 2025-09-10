import React from "react";
import MyApplication from "./_molecules";

export default async function page(props) {
  const searchParams = await props.searchParams;
  return <MyApplication searchParams={searchParams}/>;
}
