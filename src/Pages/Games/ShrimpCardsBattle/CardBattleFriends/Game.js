import React, { useEffect } from 'react';

const Game = ({ id }) => {
  useEffect(() => {
    // fetch the game with this ID

    // check its status and serve it up
  }, [id]);

  // return (
  //   <CardBattle deck={deck} />
  // );

  return <div>No card battle vs. friends just yet... But soon!!!</div>;
}

export default Game;
