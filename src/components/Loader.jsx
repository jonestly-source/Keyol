import { keyframes, styled } from "styled-components";
import { Component } from "react";

const Container = styled.div`
  position: ${props => props.pos};
  display: flex;
  flex-direction: column;
  inset: 0;
  min-height: 100%;
  max-height: 100vh;
  max-height: 100dvh;
  width: 100%;
  outline-color: red;
  justify-content: center;
  align-items: center;
  z-index: 20;
  overflow: hidden;
  background: var(--background);
  flex-grow: 1;
`

const loadAnim = keyframes`
  from {
    scale: 0;
    opacity: 1;
  }
  to {
    scale: 2;
    opacity: 0;
  }
`
const Ring = styled.div`
  width : ${props => props.size}px;
  height: ${props => props.size}px;
  display: inline-block;
  position: relative;
  @media (max-width: 460px){
    margin-top: -100px;
  }
  &::after , &::before {
    content: '';
    width : ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 50%;
    border:2px solid;
    position: absolute;
    left:0;
    top: 0;
    animation: ${loadAnim} 2s linear infinite;
  }
  &::after {
    animation-delay: 1s;
  }
`

export default class Loader extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "unset"
  }

  render() {
    return (
      <Container pos={this.props.pos ?? `absolute`}>
        <Ring size={+25} />
      </Container>
    )
  }
}

