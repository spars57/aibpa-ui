import { useState } from "react";
import { Mensage } from "../../config/mensage";

interface ChatProps {
  mensagens: Mensage[];
  onEnviar: (texto: string) => void;
}

export default function Chat({ mensagens, onEnviar }: ChatProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onEnviar(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mensagens.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-lg ${
              msg.autor === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.texto}
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Escreve a tua mensagem..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}