// import { Title } from "../styled";
// import { Link } from "react-router-dom";
// import { LinkWord } from "../styled";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectAllSpaces } from "../store/spaces/selectors";
import { useEffect } from "react";
import { getAllSpaces } from "../store/spaces/thunks";

export const Homepage = () => {
  const dispatch = useDispatch();
  const allSpaces = useSelector(selectAllSpaces());

  console.log(allSpaces);

  useEffect(() => {
    dispatch(getAllSpaces());
  }, [dispatch]);

  return (
    <Container>
      <h1>Spaces</h1>
      <div id="spacesList">
        {allSpaces.length < 1
          ? "no spaces yet"
          : allSpaces.map((space) => {
              return (
                <div className="space" key={space.id}>
                  <h3>{space.title}</h3>
                  <p>{space.description}</p>
                  <button>visit space</button>
                </div>
              );
            })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
