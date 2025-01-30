'use client'

import { ConsultaType, PacienteType } from "@/app/schemas";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";


export default function PacienteDetails() {
    const params = useParams<{ id: string }>(); 
    const router = useRouter();

    const pacienteId = params.id;
    const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined);
    const [consultas, setConsultas] = useState<ConsultaType[]>([]);
    
    useEffect(() => {
        if (pacienteId) {
            api.get(`/pacientes/${pacienteId}`).then(
                response => setPaciente(response.data)
            );

            api.get(`/pacientes/${pacienteId}/consultas`).then(
                response => setConsultas(response.data)
            );
        }
    }, [])

    function deletePaciente() {
        api.delete(`/pacientes/${pacienteId}`).then(
            (response) => {
                if (response.status == 200) {
                    router.push("/app/pacientes")
                }
            }
        )
    }

    return (
        <>
            <h1 className="text-center text-2xl text-white font-semibold mb-6 pt-4">Detalhes de paciente</h1>
            <div className="bg-white p-6 rounded text-black mx-auto w-1/2">
                
                <h2 className="text-xl font-medium mb-2">Dados do paciente</h2>
                <table className="mb-4 w-full border border-neutral-400 border-separate border-spacing-0 rounded-lg">
                    <tbody>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th className="font-medium">Nome</th>
                            <td>{paciente?.nome} {paciente?.sobrenome}</td>
                        </tr>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th className="font-medium">CPF</th>
                            <td>{ paciente?.cpf }</td>
                        </tr>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th className="font-medium">Email</th>
                            <td>{ paciente?.email }</td>
                        </tr>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th className="font-medium">Telefone</th>
                            <td>{ paciente?.telefone }</td>
                        </tr>
                    </tbody>
                </table>
                <Button className="mr-2" asChild><a href={`/app/pacientes/${pacienteId}/editar`} >Editar</a></Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Excluir</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl w-full">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-medium">Confirmar exclusão?</DialogTitle>
                            <DialogDescription className="text-neutral-700">Ao confirmar a exclusão, o paciente terá seus dados apagados.</DialogDescription>
                        </DialogHeader>
                        
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button>Cancelar</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="destructive" onClick={deletePaciente}>Excluir</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <h2 className="text-xl font-medium mb-2 mt-8">Consultas</h2>
                <table className="mb-8 w-full border border-neutral-400 border-separate border-spacing-0 rounded-lg">
                    <thead>
                        <tr  className="bg-neutral-200 even:bg-neutral-50">
                            <th className="font-medium ">Médico</th>
                            <th className="font-medium ">Data</th>
                            <th className="font-medium ">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map(
                            (consulta) => {
                                return (
                                    <tr className="bg-neutral-100 even:bg-neutral-50">
                                        <td className="px-4 py-2">{ consulta.medico.nome }</td>
                                        <td className="px-4 py-2">{ consulta.data }</td>
                                        <td className="px-4 py-2">{ consulta.estado }</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
                <a className="px-4 py-2 rounded-lg border border-green-600 bg-green-500 text-white " href={`/app/consultas/cadastrar?paciente=${ paciente?.id }`}>Cadastrar consulta</a>

            </div>
        </>
    )
}