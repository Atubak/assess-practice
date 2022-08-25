import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//thunk
import { getSpaceDetails } from "../store/spaces/thunks";

//selector
import { selectSpaceDetails } from "../store/spaces/selectors";

//css
import "./SpaceDetails.css";

export function SpaceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spaceWithDetails = useSelector(selectSpaceDetails());

  useEffect(() => {
    dispatch(getSpaceDetails(id));
  }, [dispatch, id]);

  return (
    <div
      id="SpaceDetails"
      style={{
        backgroundColor: spaceWithDetails.backgroundColor,
        color: spaceWithDetails.color,
      }}
    >
      <div id="spaceHeaderSection">
        <h1>{spaceWithDetails.title}</h1>
        <p>{spaceWithDetails.description}</p>
      </div>
      <div id="storiesList">
        {!spaceWithDetails.stories
          ? "loading"
          : spaceWithDetails.stories.map((story) => {
              return (
                <div key={story.id} className="story">
                  <h3>{story.name}</h3>
                  <p>{story.content}</p>
                  <img src={story.imageUrl} alt="" />
                </div>
              );
            })}
      </div>
    </div>
  );
}
