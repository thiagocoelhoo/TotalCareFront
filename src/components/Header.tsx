'use client'

import api from "@/lib/api";
import logo from "../app/images/logo.png"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

    const pages = [
        {
            "name": "Consultas",
            "href": "/app/consultas",
        },
        {
            "name": "Pacientes",
            "href": "/app/pacientes",
        },
        {
            "name": "Médicos",
            "href": "/app/medicos",
        },
        {
            "name": "Usuários",
            "href": "/app/usuarios",
        },
    ];

    function logout() {
        api.get('/auth/logout').then(
            (response) => {
                if (response.status === 200) {
                    router.push("/")
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div className="fixed bg-white w-full h-16 shadow flex items-center z-30">
            <img src={logo.src} className="h-14 ml-1 bg-blue-500 rounded-lg"/>
            <ul className="flex">
                {pages.map(page => {
                    return (
                        <li
                            className="text-black text-center font-medium hover:text-blue-700"
                            key={page.name}
                        >
                            <a className="px-4 py-2 block" href={page.href}>{page.name}</a>
                        </li>
                    );
                })}
            </ul>
            <Button className="ml-auto mr-8" variant={"ghost"} onClick={logout}>Sair</Button>
        </div>
    );
}
