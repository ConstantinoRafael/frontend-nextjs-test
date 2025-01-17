/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from "react";
import Head from "next/head";

import styles from "@/styles/modal.module.css";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleClose() {
    setModalIsOpen(false);
  }

  function handleConfirm() {
    alert("Ação confirmada!");
    setModalIsOpen(false);
  }

  function renderModalContent() {
    return (
      <div className={styles["modal-confirm"]}>
        <p>Tem certeza que deseja confirmar esta ação?</p>
      </div>
    );
  }

  return (
    <>
      <main className={styles.container}>
        <button type="button" onClick={() => setModalIsOpen(true)}>
          Abrir modal de confirmação
        </button>
      </main>

      {/* Renderizar modal de confirmação */}

      <Modal
        title="Confirmação"
        isOpen={modalIsOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        footer={{ confirmText: "Confirmar", cancelText: "Cancelar" }}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
