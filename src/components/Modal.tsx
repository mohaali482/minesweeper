import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface ModalProps {
    title: string;
    body: React.ReactNode[];
    isOpen: boolean;
    color: "danger" | "success" | "primary" | "default";
    onClose: () => void;
}

type GameOverModalProps = Omit<ModalProps, "title" | "body" | "color">;

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
                            <Button color={props.color} variant="light" onPress={onClose}>
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
            color="danger"
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
            color="success"
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    )
}
