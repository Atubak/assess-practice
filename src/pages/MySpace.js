import { useDispatch } from "react-redux";
import { deleteStory } from "../store/spaces/thunks";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { useState } from "react";

import "./MySpace.css";

export default function MySpace() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formActive, setFormActive] = useState(false);

  const initialForm = {};
  const [form, setForm] = useState(initialForm);

  const storyForm = (
    <div id="storyForm">
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <br />
        <br />
        <label>
          Content:
          <input type="text" />
        </label>
        <br />
        <br />
        <label>
          ImageUrl:
          <input type="text" />
        </label>
        <br />
        <br />
        <img src="" alt="" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  return !user ? (
    "youre not logged in!"
  ) : (
    <div id="MySpace">
      <div
        id="SpaceDetails"
        style={{
          backgroundColor: user.space.backgroundColor,
          color: user.space.color,
        }}
      >
        <div id="spaceHeaderSection">
          <h1>{user.space.title}</h1>
          <p>{user.space.description}</p>
        </div>
        <div id="storiesList">
          {!user.space.stories
            ? "no stories for this user"
            : user.space.stories.map((story) => {
                return (
                  <div key={story.id} className="story">
                    <button
                      onClick={() => {
                        //   dispatch(deleteStory(story.id));
                        //   window.location.reload();
                        console.log("this should delete a story");
                      }}
                    >
                      Delete Story
                    </button>
                    <h3>{story.name}</h3>
                    <p>{story.content}</p>
                    <img src={story.imageUrl} alt="" />
                  </div>
                );
              })}
        </div>
      </div>
      <button onClick={() => setFormActive(true)}>Post a cool story bro</button>
      {formActive ? storyForm : ""}
    </div>
  );
}
