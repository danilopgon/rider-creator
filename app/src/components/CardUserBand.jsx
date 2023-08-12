export const CardUserBand = ({ member, handler }) => {

  const listColors = ['bg-green-500','bg-orange-600', 'bg-blue-700', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-green-500', 'bg-orange-600', 'bg-blue-700', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500']
  const randomColor = listColors[Math.floor(Math.random() * listColors.length)]
  const firstLetter = member?.username?.[0].toUpperCase()
  console.log(firstLetter)
  console.log(member?.img)
  console.log(member)
  return (
    <article
      className={`flex items-center p-1 rounded bg-slate-50 h-14 animate-jump-in`}
      key={member?.id}
      id={member?.id}
    >
      <div className={`flex items-center justify-center rounded w-10 h-10 ${member?.img != null? '': randomColor}`}>
        {member?.img != null && member?.img ? (
          <img
          className={`w-full h-full border rounded`}
          src={member?.img||''}
          alt={member?.username||member?.name}
        />
        
        ) : (
          <p className="text-3xl text-white">{firstLetter}</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="ms-4">{member?.username||member?.name}</h3>
      </div>
      <div className="ms-auto">
        <button type="button" onClick={handler} className="btn btn-error">
          Eliminar
        </button>
      </div>
    </article>
  );
};
