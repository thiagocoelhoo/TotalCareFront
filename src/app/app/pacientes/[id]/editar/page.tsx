'use client'

import { PacienteType } from "@/app/schemas";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarPaciente() {
    const params = useParams();
    const router = useRouter();
    const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined);
    const pacienteId = params.id;

    useEffect(() => {
        if (pacienteId) {
            api.get(`/pacientes/${pacienteId}`).then(
                (response) => {
                    if (response.status === 200) {
                        setPaciente(response.data);
                    }
                }
            )
        }
    }, []);

    function submitForm(event) {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();

        api.put(`/pacientes/${pacienteId}`, formData).then(
            response => {
                if (response.status === 200) {
                    router.push(`/app/pacientes/${pacienteId}`);
                }
            }
        );
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Editar paciente</h1>
            <div className="bg-white rounded-lg shadow p-8 w-3/5 mx-auto text-black mb-10">
                <form className="mb-4" onSubmit={submitForm}>
                    <div className="flex w-full gap-4">
                        <label className="w-full">
                            Nome 
                            <input
                                type="text"
                                name="nome"
                                className="w-full border border-neutral-400 px-4 py-2 rounded-lg"
                                defaultValue={paciente?.nome}
                            />
                        </label>
                        <label className="w-full">
                            Sobrenome 
                            <input
                                type="text"
                                name="sobrenome"
                                className="w-full border border-neutral-400 px-4 py-2 rounded-lg"
                                defaultValue={paciente?.sobrenome}
                            />
                        </label>
                    </div>
                    <br/>
                    <label>
                        CPF 
                        <input
                            type="text"
                            name="cpf"
                            className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"
                            defaultValue={paciente?.cpf}
                        />
                    </label>
                    <label>
                        Telefone 
                        <input
                            type="text"
                            name="telefone"
                            className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"
                            defaultValue={paciente?.telefone}
                        />
                    </label>
                    <label>
                        Email 
                        <input
                            type="text"
                            name="email"
                            className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"
                            defaultValue={paciente?.email}
                        />
                    </label>

                    <input
                        type="submit"
                        className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6"
                        value="Salvar"
                    />
                </form>
            </div>
        </>
    )
}