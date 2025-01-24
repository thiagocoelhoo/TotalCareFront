export function Sidebar() {
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
        <div className="fixed w-60 h-screen pt-28 bg-neutral-100 border-r border-neutral-200 p-4 text-black z-20">
            <ul>
                {pages.map(page => {
                    return (
                        <li
                            className="mb-3 border border-transparent rounded-lg text-center text-xl font-medium text-neutral-600 hover:bg-white hover:text-blue-700"
                            key={page.name}
                        >
                            <a className="px-4 py-2 block" href={page.href}>{page.name}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
