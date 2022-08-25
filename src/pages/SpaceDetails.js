import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//thunk
import { getSpaceDetails } from "../store/spaces/thunks";

export function SpaceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpaceDetails(id));
  }, [dispatch, id]);
  return <div id="SpaceDetails">spacedetails!!!!!!!!!!!!{id}</div>;
}
