'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { PacienteType, MedicoType } from "@/app/schemas";
import api from "@/lib/api";

function BuscarPaciente({selecionarPaciente}: { selecionarPaciente: (id: string) => void}) {
    const [q, setQ] = useState("")
    const [pacientes, setPacientes] = useState<PacienteType[]>([]);

    useEffect(() => {
        api.get('/pacientes').then(
            response => setPacientes(response.data)
        );
    }, []);

    return (
        <>
            <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Buscar paciente" className="px-4 py-2 rounded border border-slate-400 w-full" onChange={
                    (e) => {
                        setQ(e.target.value);
                    }
                }/>
            </div>
            <table className="border border-slate-400 w-full border-separate border-spacing-0 rounded">
                <thead>
                    <tr className="bg-white text-left">
                        <th className="px-4 py-2 border-b border-slate-400">Nome</th>
                        <th className="px-4 py-2 border-b border-slate-400">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(
                        (paciente) => {
                            if (!(paciente.nome.toLowerCase().includes(q) || paciente.cpf.includes(q)))
                                return null;

                            return (
                                <tr className="bg-white hover:bg-zinc-100 cursor-pointer active:bg-blue-200" onClick={() => selecionarPaciente(paciente.id.toString())}>
                                    <td className="px-4 py-2">{paciente.nome}</td>
                                    <td className="px-4 py-2">{paciente.cpf}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}

export default function CadastroConsulta() {
    const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined);
    const [medico, setMedico] = useState<MedicoType | undefined>(undefined);
    
    const router = useRouter();
    const params = useSearchParams();
    const pacienteId = params.get("paciente");

    useEffect(() => {
        if (pacienteId) {
            api.get(`/pacientes/${pacienteId}`).then(
                response => setPaciente(response.data)
            );
        }
    })

    function selecionarPaciente(id: string) {    
        router.push(`/app/consultas/cadastrar?paciente=${id}`)
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de consulta</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto text-black mb-10">                
                <form className="mb-4">
                    <fieldset>
                        <div className="mb-4 flex justify-between">
                            <span>Paciente: {paciente?.nome}</span>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="px-3 py-2 rounded-lg font-medium bg-white border border-black hover:bg-gray-100 text-sm">Buscar paciente</button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl w-full">
                                    <DialogHeader>
                                        <DialogTitle>Buscar paciente</DialogTitle>
                                    </DialogHeader>
                                    <BuscarPaciente selecionarPaciente={(id: string) => {
                                        selecionarPaciente(id); 
                                    }}/>
                                    <DialogFooter>
                                        <div className="w-full flex justify-between">

                                            <span>
                                                Não encontrou o paciente? <a className="text-indigo-800 underline" href="/app/pacientes/cadastrar">Cadastre aqui</a>
                                            </span>
                                            <DialogClose asChild>
                                                <button className="px-4 py-2 bg-indigo-500 rounded-lg border border-indigo-600 text-white text-sm font-semibold hover:bg-blue-400">submit</button>
                                            </DialogClose>
                                        </div>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="mb-4 flex justify-between">
                            <span>Medico: {medico?.nome}</span>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="px-3 py-2 rounded-lg font-medium bg-white border border-black hover:bg-gray-100 text-sm">Buscar paciente</button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl w-full">
                                    <DialogHeader>
                                        <DialogTitle>Buscar médico</DialogTitle>
                                    </DialogHeader>
                                    <BuscarPaciente selecionarPaciente={(id: string) => {
                                        selecionarPaciente(id); 
                                    }}/>
                                    <DialogFooter>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <label>
                            Data
                            <input className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4" type="date" />
                            <input className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4" type="time" />
                        </label>
                    </fieldset>
                    <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                </form>
            </div>
        </>
    )
}