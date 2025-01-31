'use client'

import { ConsultaType } from "@/app/schemas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function DetalhesConsulta() {
    const router = useRouter();
    const params = useParams();
    const consultaId = params.id;
    const [consulta, setConsulta] = useState<ConsultaType | undefined>(undefined);

    useEffect(() => {
        api.get(`/consultas/${consultaId}`).then(
            (response) => {
                if (response.status === 200)
                    setConsulta(response.data);
            }
        )
    }, [])

    function excluirConsulta() {
        api.delete(`/consultas/${consultaId}`).then(
            (response) => {
                if (response.status === 200) {
                    router.push("/app/consultas")
                }
            }
        )
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Detalhes da consulta</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <div className="mb-4">
                    Paciente: {consulta?.paciente.nome} {consulta?.paciente.sobrenome}<br/>
                    Médico: {consulta?.medico.nome}/{consulta?.medico.crm} ({consulta?.medico.especialidade})<br/>
                    Data: {(new Date(Date.parse(consulta?.data))).toLocaleDateString()}<br/>
                    Horário: {(new Date(Date.parse(consulta?.data))).toLocaleTimeString()}<br/>
                    Urgência: {consulta?.urgencia}<br/>
                    
                </div>
                <div className="flex justify-between">
                <Button className="mr-2 bg-green-600 hover:bg-green-500" asChild>
                    <a href={`/app/consultas/${consultaId}/atendimento`}>Atender</a>
                </Button>

                <div>
                    <Button className="mr-2 bg-slate-600 hover:bg-slate-500" asChild>
                        <a href={`/app/consultas/${consultaId}/editar`}>Editar</a>
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={"destructive"}>Excluir</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmar exclusão?</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <Button asChild>
                                    <DialogClose>
                                        Cancelar
                                    </DialogClose>
                                </Button>
                                <Button variant={"destructive"} onClick={excluirConsulta}>Excluir</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                </div>
            </div>
        </>
    )
}