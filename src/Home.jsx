import { useState } from "react";
import Rduser from "./Rduser";

const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>+ Create RD</button>

      <Rduser
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={(data) => console.log(data)}
      />
    </div>
  );
};

export default Home;