import React from "react";
import Empty from "../Components/Home/Empty";
import Main from "../Components/Home/Main";

function Home({ movies }) {
  return (
    <div>
      {movies ? (
        <Main movies={movies} />
      ) : (
        <Empty
          title="Your movie list is empty"
          click="Add a new movie"
          handler="/create-movie"
        />
      )}
    </div>
  );
}

export default Home;
