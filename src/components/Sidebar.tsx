export function Sidebar() {
    const pages = [
        {
            "name": "Página inicial",
            "href": "#home",
        },
        {
            "name": "Consultas",
            "href": "#home",
        },
        {
            "name": "Pacientes",
            "href": "#home",
        },
        {
            "name": "Configurações",
            "href": "#home",
        }
    ];
    return (
        <div className="fixed w-60 h-screen pt-28 bg-neutral-100 border-r border-neutral-200 p-4 text-black z-20">
            <ul>
                {pages.map(page => {
                    return (
                        <li
                            className="px-4 py-2 mb-3 border border-transparent rounded-lg text-center text-xl font-medium text-neutral-600 hover:bg-white hover:text-blue-700"
                            key={page.name}
                        >
                            {page.name}
                        </li>);
                })}
            </ul>
        </div>
    );
}
