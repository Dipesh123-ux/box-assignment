import React, { useEffect, useState } from "react";

const App = () => {
  const [color, setColor] = useState({});
  const [stack, setStack] = useState([]);
  const [isDeselecting, setIsDeselecting] = useState(false);

  let interval;

  const input = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

  useEffect(() => {
    if (stack.length === 7) {
      setIsDeselecting(true);
      interval = setInterval(() => {
        let lastEle = stack[stack.length - 1];
        setColor((prev) => ({ ...prev, [lastEle]: false }));
        stack.pop();
        if (stack.length === 0) {
          setIsDeselecting(false)
          clearInterval(interval);
        }
        setStack(stack);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [stack, isDeselecting]);

  const handleClick = (idx) => {
    if (isDeselecting) return;
    setColor({ ...color, [idx]: color[idx] ? !color[idx] : true });
    setStack((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((item) => item !== idx);
      } else {
        return [...prev, idx];
      }
    });
  };

  const RenderBox = ({ idx, showBorder = true }) => {
    return (
      <div
        key={idx}
        onClick={() => handleClick(idx)}
        style={{
          height: "100px",
          width: "100px",
          backgroundColor: showBorder ? (color[idx] ? "#0bcc59" : "") : "",
          border: showBorder ? "1px solid black" : "",
          cursor: isDeselecting ? "not-allowed" : "pointer",
        }}
      ></div>
    );
  };

  return (
    <div>
      {input.map((item, i) => {
        return (
          <div style={{ display: "flex" }}>
            {item.map((subItem, j) => {
              if (subItem === 1) {
                return <RenderBox idx={`${i}-${j}`} showBorder={true} />;
              } else {
                return <RenderBox idx={`${i}-${j}`} showBorder={false} />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
