import { useRef, useState } from "react";

export default function Player() {

  const player = useRef();
  // const [playerName,setPlayerName] = useState('');
  const [updatedName, setUpdatedName] = useState();

  // function handleChange(event){
  //   setPlayerName(player => event.target.value);
  // }

  function handleClick(){
     setUpdatedName(d => player.current.value);
     player.current.value = null;
  }

  return (
    <section id="player">
      <h2>Welcome {updatedName ?? 'unknown entity'}</h2>
      <p>
        <input ref={player} type="text" />{/*value={playerName} onChange={handleChange}/>*/}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
