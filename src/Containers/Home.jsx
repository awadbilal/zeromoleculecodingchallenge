import React from 'react';
import Empty from '../Components/Home/Empty';
import Main from '../Components/Home/Main';

function Home({ movies }) {
  return (
    <div>
      {
        movies ? <Main movies={movies} /> : <Empty />
      }
    </div>
  );
}

export default Home;
