import {  Menu } from "antd";
import React, { useEffect, useState } from "react";
import GlassPanel from "../portfolio/GlassPanel";
import GlassShine from "../ui/GlassShine";
import GlassReflection from "../ui/GlassReflection";
import styled from "styled-components";
import { Plus } from "lucide-react";
import { createPortfolio } from "../../api/api";


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(40px);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.5)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-top: 0;
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`

const FormInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`

const FormSelect = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  appearance: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
  
  option {
    background: rgba(28, 28, 30, 0.9);
  }
`

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const Button = styled.button`
  background: ${(props) => (props.primary ? "#30D158" : "rgba(255, 255, 255, 0.1)")};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => (props.primary ? "#28BD4D" : "rgba(255, 255, 255, 0.15)")};
  }
`

export default function PortfolioNavbar({
  portfolios,
  setSelectedPortfolio,
  loading,
  refreshPortfolios
}) {
    const [selected, isSelected] = useState("");
    const [portfolioName, setPortfolioName] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

  if (loading) {
    return <div>Loading...</div>;
  }


  async function handleSubmit(e){
    e.preventDefault();

    try{
        await createPortfolio({name: portfolioName, user_id: 2});
        setModalVisible(false)
        setPortfolioName("")
        refreshPortfolios()
    } catch (err) {
        setModalVisible(true)
    }
  }

  function handlePortfolioNameChange(e){
    setPortfolioName(e.target.value)
  }

  return (
    <div>
      <GlassPanel
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <GlassShine />
        <GlassReflection />
        <nav
          style={{
            display: "flex",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 0,
              margin: 0,
            }}
          >
            {portfolios.map((item) => {
              return (
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <button
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
                      selected === item.label
                        ? " bg-white/10 text-white"
                        : " text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <span style={{ color: "white", whiteSpace: "nowrap" }}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <button className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 text-white" onClick={() => setModalVisible(true)}>
          <Plus className="w-5 h-5" />
          <span>Create portfolio</span>
        </button>
      </GlassPanel>

      <Modal visible={modalVisible}>
        <ModalContent>
          <ModalTitle>Create new portfolio</ModalTitle>

          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormInput 
                type="text" 
                value={portfolioName}
                onChange={handlePortfolioNameChange}
             />
          </FormGroup>

          <ModalActions>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button primary onClick={handleSubmit} >
              Add
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </div>
  );
}
