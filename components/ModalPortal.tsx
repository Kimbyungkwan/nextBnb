import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

interface IProps {
  children: React.ReactNode;
  closePortal: () => void;
}

const ModalPortal: React.FC<IProps> = ({ children, closePortal }) => {
  const ref = useRef<Element | null>();
  const [moundted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector("#root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && moundted) {
    return createPortal(
      <Container>
        <div className="modal-background" onClick={closePortal} />
        {children}
      </Container>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;