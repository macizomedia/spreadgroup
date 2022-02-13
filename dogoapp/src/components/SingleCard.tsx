import React from "react";
import { useParams } from "react-router-dom";

export const SingleCard = () => {
  let params = useParams();
  return <div>{`From params got${JSON.stringify(params)} `}</div>;
};
