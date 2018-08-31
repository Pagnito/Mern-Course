import React from "react";

function renderMatrixPattern() {
  const matrix = new Array(100).fill("1");
  const matrixLines = [
    "asdoasou9798ON*^*INBIKJhkKjgI*^*&IGKHJH",
    "as,djbakjshdkoo*I^(K)",
    "dskhfklhLKJH&i8*^*&%Jhg$@",
    "sdfh3928y86*^&*&TUO*()(*&(*&%))",
    "ASDASDASDJKJHi86yikhjkj325I^*&^%#%*&,knklasd",
    "lkjasldjasdkjlkj*^*YOIjlj;lj(*^&(*^*&))",
    "asfaf&^%&*(*U()HKJHl9*&^())",
    "KJHLKJ(*798yhi;j;l9o9878768)",
    "asdi698h98ho79O*^*OGKU&%787sdfsdfsdsf",
    "*^*KJH**^*&^*&",
    ",jhn,n&^*&6",
    "kjhkljhklhKJGHl>I&9(O&*)",
    "mbjhgg&%&IHkjHmhjhg"
  ];
  const biggerMatrix = new Array(200).fill("1");
  let spacer = 0;
  if (window.outerWidth > 1200) {
    return biggerMatrix.map((item, ind) => {
      let pickOne = Math.floor(Math.random() * (12 - 0 + 1)) + 0;
      let fontSize = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      let nextLine = matrixLines[pickOne];
      spacer += 12;
      return (
        <div
          key={ind}
          style={{ fontSize: fontSize, left: spacer }}
          className="matrixPattern"
        >
          {nextLine}
        </div>
      );
    });
  } else {
    return matrix.map((item, ind) => {
      let pickOne = Math.floor(Math.random() * (12 - 0 + 1)) + 0;
      let fontSize = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      let nextLine = matrixLines[pickOne];
      spacer += 12;
      return (
        <div
          key={ind}
          style={{ fontSize: fontSize, left: spacer }}
          className="matrixPattern"
        >
          {nextLine}
        </div>
      );
    });
  }
}
export default renderMatrixPattern;
