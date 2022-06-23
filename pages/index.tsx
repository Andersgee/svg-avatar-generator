import type { NextPage } from "next";
import Kek from "../public/15.svg";

const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div>hello world</div>
        <Kek />
      </div>
    </div>
  );
};

export default Home;
