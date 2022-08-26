import { useDispatch } from "react-redux";
import { deleteStory } from "../store/user/thunks";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { useState } from "react";

//thunk
import { createStory } from "../store/user/thunks";
import { showMessageWithTimeout } from "../store/appState/thunks";

import "./MySpace.css";

export default function MySpace() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //state for deciding to hide or show the form
  const [formActive, setFormActive] = useState(false);

  //state of the form inputs
  const initialForm = { name: "", content: "", imageUrl: "" };
  const [form, setForm] = useState(initialForm);

  const formSetter = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitter = (e) => {
    e.preventDefault();
    console.log("this should submit a story");

    //make a dispatch to a thunk that creates a new story with the spaceId included
    dispatch(createStory(form, user.space.id));

    //hide the form and reset the input values
    setFormActive(false);
    // setForm(initialForm);

    //show success message using the templates message
    dispatch(showMessageWithTimeout("success", false, "story posted!", 2500));
  };

  const storyForm = (
    <div id="storyForm">
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={formSetter}
          />
        </label>
        <br />
        <br />
        <label>
          Content:
          <input
            type="text"
            name="content"
            value={form.content}
            onChange={formSetter}
          />
        </label>
        <br />
        <br />
        <label>
          ImageUrl:
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={formSetter}
          />
        </label>
        <br />
        <br />
        <img src={form.imageUrl} alt="" />
        <br />
        <br />
        <button
          style={{ display: "table", margin: "auto" }}
          type="submit"
          onClick={submitter}
        >
          Submit
        </button>
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
                        dispatch(deleteStory(story.id));

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
