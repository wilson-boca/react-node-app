// components/Navbar/navbarElements.js

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    height: 90px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #4322BE;
    padding: 15px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

export const Button = styled.button`
  padding: 8px;
  margin: 8px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
`;

export const Title = styled.h4`
  color: white
`;