import React from "react";
import styled from "styled-components";
import * as colors from "theme/colors"

export const Container = styled.div`
  height: 30px;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-left: 10px;
`;

export const Line = styled.div`
  ${({ theme }) => `
    width: 100%;
    height: 4px;
    background-color: ${colors.Black};
    border-radius: 20px;
    transition: all .3s ease;
  `}
`;

export const TopLine = styled(({ isOpen, ...rest }) => <Line {...rest} />)`
  ${({ isOpen }) => `
    transform: ${isOpen ? `rotate(45deg) translateY(19px)` : `rotate(0deg)`};
  `}
`;

export const DownLine = styled(({ isOpen, ...rest }) => <Line {...rest} />)`
  ${({ isOpen }) => `
    transform: ${isOpen ? `rotate(-45deg) translateY(-18px)` : `rotate(0deg)`};
  `}
`;

export const MiddleLine = styled(({ isOpen, ...rest }) => <Line {...rest} />)`
  ${({ isOpen }) => `
    display: ${isOpen ? `none` : `block`};
  `}
`;
