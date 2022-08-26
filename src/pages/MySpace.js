import { useDispatch } from "react-redux";
import { deleteStory } from "../store/user/thunks";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { useState } from "react";

//thunk
import { createStory } from "../store/user/thunks";
import { showMessageWithTimeout } from "../store/appState/thunks";

import "./MySpace.css";
import { useEffect } from "react";

export default function MySpace() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //state for deciding to hide or show the story form
  const [storyFormActive, setStoryFormActive] = useState(false);

  //state of the story form inputs
  const initialForm = { name: "", content: "", imageUrl: "" };
  const [form, setForm] = useState(initialForm);

  //state for hiding/showing the edit space form
  const [editFormActive, setEditFormActive] = useState(false);

  const initialEditForm = {
    title: "",
    description: "",
    backgroundColor: "",
    color: "",
  };

  //state of the edit form inputs
  const [editFormInputs, setEditFormInputs] = useState(initialEditForm);
  console.log(editFormInputs);

  //state for making the rest of the screen opaque
  const [opaque, setOpaque] = useState(false);

  const formSetter = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const editFormSetter = (e) => {
    const { name, value } = e.target;
    setEditFormInputs({ ...editFormInputs, [name]: value });
  };

  const submitter = (e) => {
    e.preventDefault();
    console.log("this should submit a story");

    //make a dispatch to a thunk that creates a new story with the spaceId included
    dispatch(createStory(form, user.space.id));

    //hide the form and reset the input values
    setStoryFormActive(false);
    setForm(initialForm);

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
        <button
          style={{ display: "table", margin: "auto" }}
          onClick={() => setStoryFormActive(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  //have to check for user first because it will want to read the user state even though it wont render yet
  const editForm = !user ? (
    ""
  ) : (
    <div id="editForm">
      <form>
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            value={editFormInputs.title}
            onChange={editFormSetter}
          />
        </label>
        <br />
        <br />
        <label>
          Description:
          <br />
          <input
            type="text"
            name="description"
            value={editFormInputs.description ?? ""}
            onChange={editFormSetter}
          />
        </label>
        <br />
        <br />
        <label>
          Background Color:
          <br />
          <input
            type="color"
            name="backgroundColor"
            value={editFormInputs.backgroundColor}
            onChange={editFormSetter}
          />
        </label>
        <br />
        <br />
        <label>
          Color:
          <br />
          <input
            type="color"
            name="color"
            value={editFormInputs.color}
            onChange={editFormSetter}
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          style={{ display: "table", margin: "auto" }}
          onClick={() => setEditFormActive(false)}
        >
          Submit
        </button>
        <br />
        <button
          style={{ display: "table", margin: "auto" }}
          onClick={() => setEditFormActive(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  const opaqueDiv = <div id="opaqueDiv"></div>;

  useEffect(() => {
    //if any of these two states are active I want the screen to darken
    if (storyFormActive || editFormActive) {
      return setOpaque(true);
    }
    if (!storyFormActive || !editFormActive) {
      return setOpaque(false);
    }
  }, [storyFormActive, editFormActive]);

  //this is the return statement of the page component
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
                  <div
                    key={story.id}
                    className="story"
                    style={{ border: "2px solid red" }}
                  >
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
      <button
        style={{ position: "fixed", top: "90px", right: "30px" }}
        onClick={() => setStoryFormActive(true)}
      >
        Post a cool story bro
      </button>
      <button
        style={{ position: "fixed", top: "120px", right: "30px" }}
        onClick={() => {
          //when clicked the form inputs change
          //have to be like this bc it will try to read user before its loaded if you set this as the initialeditform at the start
          if (user) {
            setEditFormInputs({
              title: user.space.title,
              description: user.space.description ?? "",
              backgroundColor: user.space.backgroundColor,
              color: user.space.color,
            });
          }
          setEditFormActive(true);
        }}
      >
        Edit my Space
      </button>
      {storyFormActive ? storyForm : ""}
      {editFormActive ? editForm : ""}
      {opaque ? opaqueDiv : ""}
    </div>
  );
}
