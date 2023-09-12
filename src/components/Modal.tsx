import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface ModalProps {
    title: string;
    body: React.ReactNode[];
    isOpen: boolean;
    onClose: () => void;
}

type GameOverModalProps = Omit<ModalProps, "title" | "body">;

function GenericModal(props: ModalProps) {
    return (
        <Modal
            size={"sm"}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
                        <ModalBody>
                            {[...props.body]}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export function GameOverLostModal(props: GameOverModalProps) {
    return (
        <GenericModal
            title="Game Over"
            body={[
                <p key="0">You lost!</p>
            ]}
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    )
}

export function GameOverWonModal(props: GameOverModalProps) {
    return (
        <GenericModal
            title="Game Over"
            body={[
                <p key="0">You won!</p>
            ]}
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    )
}
