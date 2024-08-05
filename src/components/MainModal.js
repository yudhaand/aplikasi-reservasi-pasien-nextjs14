import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function MainModal({
  size,
  onOpen,
  onClose,
  title = "string",
  content,
  onTrue,
  textTrue = "string",
  textFalse = "string",
  showFooter,
}) {
  // const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];

  return (
    <>
      <Modal isOpen={onOpen} onClose={onClose} size={size} scrollBehavior="inside" isKeyboardDismissDisabled>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              {showFooter ? (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onTrue}>
                    {textTrue}
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    {textFalse}
                  </Button>
                </ModalFooter>
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// How to use
{
  /* <MainModal
  size="md"
  onOpen={openModal}
  onClose={() => setOpenModal(false)}
  onTrue={() => console.log("delete")}
  title={"Konfirmasi Hapus Pasien"}
  content={"Yakin ingin menghapus pasien ini?"}
  showFooter={true}
  textTrue="Hapus"
  textFalse="Batal"
/>; */
}
