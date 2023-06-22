import React from 'react';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react'

// CONSTANTS
import { COLORS } from '../constants';

const ProductionModal = ({ produce }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const confirmProduce = () => {
        produce();
        setIsOpen(false);
    }

    return (
        <>
            <ProduceButton onClick={() => setIsOpen(true)}>Produce</ProduceButton>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <PanelContainer>
                    <Backdrop onClick={() => setIsOpen(false)}/>
                    <Panel>
                        <Dialog.Title>Production Phase</Dialog.Title>
                        <Description>Are you sure you want to produce? This will auto-update your supply to have the correct amounts based on your production values.</Description>

                        <Actions>
                            <ConfirmButton onClick={confirmProduce}>Produce</ConfirmButton>
                            <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>
                        </Actions>
                    </Panel>
                </PanelContainer>
            </Dialog>
        </>
    )
}

const ProduceButton = styled.button`
    background-color: ${COLORS.mainBlue};
    border: none;
    height: 50px;
    min-width: 150px;
    border-radius: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: .7px;
    margin: 0 8px;
`

const PanelContainer = styled.div`
    position: fixed;
    inset: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Panel = styled(Dialog.Panel)`
    width: 90%;
    max-width: 600px;
    background-color: ${COLORS.cardBK};
    padding: 24px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 2;
`

const Description = styled.p`
    line-height: 1.5;
    opacity: 0.8;
`

const Actions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
`

const Backdrop = styled.div`
    position: fixed;
    inset: 0px;
    background-color: ${COLORS.backdrop};
`

const ActionButton = styled.button`
    border-radius: 8px;
    border: none;
    padding: 16px 24px;
    text-transform: uppercase;
    letter-spacing: .7px;
`

const ConfirmButton = styled(ActionButton)`
    background-color: ${COLORS.mainBlue};
    color: white;
`

const CancelButton = styled(ActionButton)`
    color: ${COLORS.error};
    background-color: transparent;
`

export default ProductionModal;