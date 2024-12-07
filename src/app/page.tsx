"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify"; // Importação do react-toastify
import "react-toastify/dist/ReactToastify.css"; // Estilos padrão do react-toastify

// Função para enviar dados ao Webhook
const sendToWebhook = async (name: string, email: string) => {
  try {
    const response = await fetch("https://n8n.eduudev.tech/webhook/eduudev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado para botão de envio

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples dos campos
    if (!name.trim() || !email.trim()) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      setLoading(true); // Ativa o estado de carregamento
      await sendToWebhook(name, email);
      toast.success("Dados enviados com sucesso!");
      setName(""); // Limpa o campo nome
      setEmail(""); // Limpa o campo email
    } catch (error: any) {
      toast.error(`Erro ao enviar os dados: ${error.message}`);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {/* Componente necessário para exibir as notificações */}
      <ToastContainer position="top-right" autoClose={5000} />

      <Card>
        <CardHeader>
          <ThumbsUp />
          <CardTitle>Inscreva-se</CardTitle>
          <CardDescription>
            <p>Receba informações sobre novos cursos e workshops.</p>
            <p>Além de descontos especiais!</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center">
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="name">
                  <p className="text-gray-600">Primeiro nome</p>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">
                  <p className="text-gray-600">E-mail</p>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex justify-end h-full mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}