'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { PacienteType, MedicoType } from "@/app/schemas";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import BuscarPaciente from "../components/BuscarPaciente";
import BuscarMedico from "../components/BuscarMedico";

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
    }, [])

    function selecionarPaciente(paciente: PacienteType) {    
        setPaciente(paciente);
        router.push(`?paciente=${paciente.id}`);
    }

    function selecionarMedico(medico: MedicoType) {
        setMedico(medico);
    }

    function onSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const payload = {
            idPaciente: paciente?.id,
            idMedico: medico?.id,
            data: formData.get("data"),
            urgencia: formData.get("urgencia")
        };

        api.post("/consultas", payload).then(
            (response) => {
                console.log(response)
            }
        )
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de consulta</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto text-black mb-10">                
                <form className="mb-4" onSubmit={onSubmit}>
                    <div className="mb-4 flex justify-between border border-neutral-400 rounded-xl p-2">
                        <span>Paciente: {paciente?.nome} {paciente?.sobrenome}</span>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-3 py-2 rounded-lg font-medium bg-white border border-black hover:bg-gray-100 text-sm">Buscar paciente</button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl w-full">
                                <DialogHeader>
                                    <DialogTitle>Buscar paciente</DialogTitle>
                                </DialogHeader>
                                <BuscarPaciente selecionarPaciente={selecionarPaciente}/>
                                <DialogFooter>
                                    <div className="w-full flex justify-between">
                                        <span>
                                            Não encontrou o paciente? <a className="text-indigo-800 underline" href="/app/pacientes/cadastrar">Cadastre aqui</a>
                                        </span>
                                        <Button className="bg-indigo-500" asChild>
                                            <DialogClose>
                                                Continuar
                                            </DialogClose>
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="mb-4 flex justify-between border border-neutral-400 rounded-xl p-2">
                        <span>Medico: {medico?.nome}</span>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-3 py-2 rounded-lg font-medium bg-white border border-black hover:bg-gray-100 text-sm">Buscar médico</button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl w-full">
                                <DialogHeader>
                                    <DialogTitle>Buscar médico</DialogTitle>
                                </DialogHeader>
                                <BuscarMedico selecionarMedico={selecionarMedico}/>
                                <DialogFooter>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <label>
                        Urgência
                        <select name="urgencia" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4">
                            <option value="NAO_URGENTE">Não urgente</option>
                            <option value="POUCO_URGENTE">Pouco urgente</option>
                            <option value="URGENTE">Urgente</option>
                            <option value="MUITO_URGENTE">Muito urgente</option>
                            <option value="EMERGENTE">Emergência</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Data <br/>                    
                        <input name="data" className="border border-neutral-300 px-4 py-2 rounded-lg mb-4" type="datetime-local" />
                    </label>
                    
                    <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                </form>
            </div>
        </>
    )
}