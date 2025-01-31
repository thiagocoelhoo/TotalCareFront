'use client'

import { UsuarioType } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import api from "@/lib/api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsuarioDetails() {
    const [usuario, setUsuario] = useState<UsuarioType | undefined>();
    const router = useRouter();
    const params = useParams();
    const usuarioId = params.id;

    useEffect(() => {
        if (usuarioId) {
            api.get(`/usuarios/${usuarioId}`).then(
                (response) => {
                    setUsuario(response.data);
                }
            );
        }
    }, []);

    function excluirUsuario() {
        api.delete(`/usuarios/${usuarioId}`).then(
            (respose) => {
                if (respose.status === 200) {
                    router.push("/app/usuarios");
                }
            }
        )
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Detalhes do usuário</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <div className="mb-4">
                    Nome: {usuario?.nome}<br/>
                    Email: {usuario?.email}<br/>
                    Status: {usuario?.ativo ? 'Ativo' : 'Inativo'}<br/>
                    Data cadastro: {usuario?.dataCadastro?.toString()}<br/>
                    Tipo: {usuario?.tipoUsuario}<br/>
                </div>
                <Button className="mr-2" asChild>
                    <a href={`/app/usuarios/${usuarioId}/editar`}>Editar</a>
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
                            <Button variant={"destructive"} onClick={excluirUsuario}>Excluir</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}