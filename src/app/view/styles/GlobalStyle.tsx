import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};
*{
    margin: 0px;
    padding: 0px;
    box-sizing:border-box;
}

body{
  font-family: NanumSquare_acR;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

@font-face {
  font-family: NanumSquare_acEB;
  src:url("src/app/view/styles/fonts/NanumSquare_acEB.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
}

@font-face {
  font-family: NanumSquare_acR;
  src: url("src/app/view/styles/fonts/NanumSquare_acR.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
}

@font-face {
  font-family: NanumSquare_acB;
  src: url("src/app/view/styles/fonts/NanumSquare_acB.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
}

ol,
ul,
li {
  list-style: none;
}

input:focus,
button:focus,
select:focus {
  outline: none;
}

button{
  cursor : pointer;
}
`;
export default GlobalStyle;
