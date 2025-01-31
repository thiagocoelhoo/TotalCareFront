'use client'

import { MedicoType } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MedicoDetails() {
    const [medico, setMedico] = useState<MedicoType | undefined>();
    const router = useRouter();
    const params = useParams();
    const medicoId = params.id;

    useEffect(() => {
        if (medicoId) {
            api.get(`/medicos/${medicoId}`).then(
                (response) => {
                    setMedico(response.data);
                }
            );
        }
    }, []);

    function exluirMedico() {
        api.delete(`/medicos/${medicoId}`).then(
            (respose) => {
                if (respose.status === 200) {
                    router.push("/app/medicos");
                }
            }
        )
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Detalhes do usuário</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <div className="mb-4">
                    Nome: {medico?.nome}<br/>
                    CRM: {medico?.crm}<br/>
                    Especialiade: {medico?.especialidade}<br/>
                </div>
                <Button className="mr-2" asChild>
                    <a href={`/app/medicos/${medicoId}/editar`}>Editar</a>
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
                            <DialogClose asChild>
                                <Button>Cancelar</Button>
                            </DialogClose>
                            <Button variant={"destructive"} onClick={exluirMedico}>Excluir</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}