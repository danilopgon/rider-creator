export const CardUserBand = ({ member, handler }) => {
    return(
        <article className="flex items-center p-1 rounded bg-slate-50 h-14" key={member.id} id={member.id}>
            <div className="flex items-center justify-center w-10 h-10">
                <img className="w-full h-full border rounded-full" src={""} alt={member.name} />
            </div>
            <div className="flex flex-col items-center">
                <h3 className="ms-4">{member.name}</h3>
                <p className="ms-4">instrument</p>
            </div>
            <div className="ms-auto">
                <button onClick={handler} className="btn btn-error">Eliminar</button>
            </div>
        </article>
    )
}