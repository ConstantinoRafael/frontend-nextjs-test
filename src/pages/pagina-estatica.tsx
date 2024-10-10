/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { useEffect, useState } from "react";

import styles from "@/styles/lista.module.css";
import { ICity } from "@/types/city.d";

interface ListaProps {
  list: Array<ICity>;
}

export default function Lista({ list }: ListaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {list?.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:8080";
    const response = await fetch(`${apiUrl}/api/cities/10`);
    const data = await response.json();
    if (response.status !== 200) throw new Error("Erro ao obter os dados");

    return {
      props: {
        list: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        list: [
          {
            id: new Date().getTime().toString(),
            name: "São Paulo",
          },
        ],
      },
      revalidate: 60,
    };
  }
}
