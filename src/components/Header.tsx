export function Header() {
    return (
        <div className="fixed bg-white w-full h-16 shadow flex items-center border-b border-neutral-300 z-30">
            <input
                type="text"
                name="search"
                placeholder="Buscar"
                className="border border-neutral-300 rounded-lg px-4 py-2 min-w-80 m-auto" />
        </div>
    );
}
