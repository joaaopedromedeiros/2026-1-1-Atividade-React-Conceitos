"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

// 🔹 Função que representa um card (recebe props)
function ProdutoCard(props) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 bg-white hover:cursor-pointer">
      <img
        src={props.thumbnail}
        alt={props.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {props.title}
      </h3>

      <p className="text-green-600 font-bold text-md mt-2">
        R$ {props.price}
      </p>
    </div>
  );
}

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(function () {
    getProdutosTodos().then(function (resultado) {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  // filtro por título
  function filtrarProdutos() {
    return produtos.filter(function (produto) {
      return produto.title.toLowerCase().includes(busca.toLowerCase());
    });
  }

  // 🔹 função que faz o map e passa props
  function listarProdutos() {
    return filtrarProdutos().map(function (produto) {
      return (
        <ProdutoCard
          key={produto.id}
          title={produto.title}
          price={produto.price}
          thumbnail={produto.thumbnail}
        />
      );
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <header>
        <h1>Pesquisa de produtos</h1>

        <input
          type="text"
          placeholder="Digite o nome do produto..."
          value={busca}
          onChange={function (e) {
            setBusca(e.target.value);
          }}
          className="w-full max-w-md mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>

      <main style={{ marginTop: "20px" }}>
        <h2>Resultados</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
       {filtrarProdutos().map((produto) => (
          <ProdutoCard
            key={produto.id}
            title={produto.title}
            price={produto.price}
            thumbnail={produto.thumbnail}
          />
        ))}
        </div>
      </main>
    </div>
  );
}