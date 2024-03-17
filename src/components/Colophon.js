import React from "react";

const Colophon = (props) => {
  const { data } = props;

  const colophon = data.colophon;
  return (
    <main className="colophon">
      <div>
        <h1>Colophon</h1>
        {colophon.map((p, i) => {
          return <p key={i}>{p}</p>;
        })}
      </div>
    </main>
  );
};

export default Colophon;
