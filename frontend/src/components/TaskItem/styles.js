import styled from "styled-components";

export const Tr = styled.tr`
  font-size: 15px
`;

export const Td = styled.td`
  padding-top: 14px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  text-size: 10px;
  width: ${(props) => (props.width ? props.width : "auto")};
`;
