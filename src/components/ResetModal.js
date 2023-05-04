import React from 'react';
import styled from 'styled-components';
import { Dialog } from '@headlessui/react'

// CONSTANTS
import { COLORS } from '../constants';

// CONTEXT
import { StoreContext } from '../providers/store-provider';
import { LogContext } from '../providers/log-provider';

// ICONS
import { RefreshCw } from 'react-feather';

const ResetModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { resetStore } = React.useContext(StoreContext);
    const { resetLog } = React.useContext(LogContext);

    const confirmReset = () => {
        resetStore();
        resetLog();
        setIsOpen(false);
    }

    return (
        <>
            <ResetButton onClick={() => setIsOpen(true)}>
                <RefreshCw />
            </ResetButton>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <PanelContainer>
                    <Backdrop onClick={() => setIsOpen(false)}/>
                    <Panel>
                        <Dialog.Title>Reset Player Mat</Dialog.Title>
                        <Description>Are you sure you want to reset your player mat? This will reset your supply, production, and Terraform Rating values.</Description>

                        <Actions>
                            <ConfirmButton onClick={confirmReset}>Reset</ConfirmButton>
                            <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>
                        </Actions>
                    </Panel>
                </PanelContainer>
            </Dialog>
        </>
    )
}

const ResetButton = styled.button`
    background-color: transparent;
    border: none;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
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
    background-color: ${COLORS.error};
    color: white;
`

const CancelButton = styled(ActionButton)`
    color: ${COLORS.mainBlue};
    background-color: transparent;
`

export default ResetModal;