import type { NextPage } from "next";

import Avatar from "components/Avatar";

const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div>hello world</div>
        <Avatar />
      </div>
    </div>
  );
};

export default Home;
