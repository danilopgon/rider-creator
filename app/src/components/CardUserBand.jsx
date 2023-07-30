export const CardUserBand = ({ member }) => {
    return(
        <article className="flex rounded bg-slate-50 p-1 items-center h-14" key={member.id}>
            <div className="w-10 h-10 flex items-center justify-center">
                <img className="rounded-full border h-full w-full" src={""} alt={member.name} />
            </div>
            <div className="flex flex-col items-center">
                <h3 className="ms-4">{member.name}</h3>
                <p className="ms-4">instrument</p>
            </div>
            <div className="ms-auto">
                <button className="btn btn-error">Eliminar</button>
            </div>
        </article>
    )
}