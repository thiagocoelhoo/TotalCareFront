import logo from "../app/images/logo.png"

export function Header() {
    const pages = [
        {
            "name": "Consultas",
            "href": "/app/consultas",
        },
        {
            "name": "Pacientes",
            "href": "/app/pacientes",
        },
    ];
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
            <a href="/" className="text-black ml-auto mr-8 hover:text-blue-700 font-medium p-4">Sair</a>
        </div>
    );
}
