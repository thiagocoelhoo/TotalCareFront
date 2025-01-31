'use client'

import { MedicoType } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditarMedico() {
    const router = useRouter();

    const [medico, setMedico] = useState<MedicoType | undefined>(undefined);
    const params = useParams();
    const medicoId = params.id;
    
    useEffect(() => {
        if (medicoId) {
            api.get(`/medicos/${medicoId}`).then(
                (response) => {
                    if (response.status === 200) {
                        setMedico(response.data);
                    }
                }
            )
        }
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const payload = {
            nome: formData.get("name")?.toString(),
            crm: formData.get("crm")?.toString(),
            especialidade: formData.get("especialidade")?.toString()
        }

        api.put(`/medicos/${medicoId}`, payload).then(
            (response) => {
                if (response.status === 200) {
                    router.push("/app/medicos");
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Editar usuário</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
                    <label>
                        Nome
                        <input
                            type="text"
                            name="name"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={medico?.nome}
                            required
                        />
                    </label>
                    <label>
                        CRM
                        <input
                            type="text"
                            name="crm"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={medico?.crm}
                            required
                        />
                    </label>
                    <label>
                        Especialidade
                        <input
                            type="text"
                            name="especialidade"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={medico?.especialidade}
                            required
                        />
                    </label>
                    <Button type="submit">Salvar</Button>
                </form>             
            </div>
        </>
    )