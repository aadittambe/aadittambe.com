import TypeIt from "typeit-react";

export const TypeItLine = () => {
  return (
    <p>
      <span>I am a journalist who tells stories — but with&nbsp;</span>
      <span
        style={{ position: "relative", verticalAlign: "text-bottom" }}
        className="typeit"
      >
        <span
          style={{
            visibility: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          graphics. 📊
        </span>
        <span
          className="typeit"
          style={{
            position: "absolute",
            left: 0,
            whiteSpace: "nowrap",
            top: 0,
          }}
        >
          <TypeIt
            options={{
              loop: true,
              speed: 200,
              waitUntilVisible: true,
              lifeLike: true,
            }}
            getBeforeInit={(instance) => {
              instance
                .pause(1500)
                .type("code. 🖥")
                .pause(2000)
                .delete(7)
                .type("graphics. 📊")
                .pause(2500)
                .delete(11)
                .type("design. 🎨")
                .pause(2700)
                .delete(9)
                .type("data. 📈")
                .pause(2100);

              return instance;
            }}
          />
        </span>
      </span>
    </p>
  );
};

export default TypeItLine;
