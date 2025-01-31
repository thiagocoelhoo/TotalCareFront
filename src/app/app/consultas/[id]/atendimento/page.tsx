'use client'

import { useEffect, useState } from "react"
import { ConsultaType } from "@/app/schemas";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Consulta({ params }: {params: {id: string}}) {
    const [consulta, setConsulta] = useState<ConsultaType | undefined>(undefined);

    useEffect(() => {
        api.get(`/consultas/${params.id}`).then(
            response => setConsulta(response.data)
        );
    }, [])

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Atendimento</h1>
            <div className="mx-auto bg-white p-4 w-3/5 rounded-lg min-h-20 shadow text-black">
                <h2 className="text-lg font-medium mb-2">Informações do paciente</h2>
                <form onSubmit={onSubmit}>
                    <span>Nome: { consulta?.paciente?.nome } { consulta?.paciente?.sobrenome }</span>
                    <br/>
                    <span>CPF: { consulta?.paciente?.cpf }</span>
                    <br/>
                    <hr className="my-4"/>
                    <h2 className="text-lg font-medium mb-2">Receita</h2>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>
                            Anamnese
                            <textarea name="anamnese" className="w-full min-h-52 border border-neutral-400 rounded-lg"/>
                        </label>
                        <label>
                            Receita
                            <textarea name="receita" className="w-full min-h-52 border border-neutral-400 rounded-lg"/>
                        </label>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button>Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    )
}