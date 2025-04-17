function Treino() {
  const treino = {
    id: 1,
    text: "Segunda-feira",
    descripition: "Peito",
    nExercicio: 5,
    data: "2022-10-10",
    reminder: false,
  };

  return (
    <div>
      <h1>{treino.text}</h1>
      <p>{treino.descripition}</p>
      <p>Number of Exercises: {treino.nExercicio}</p>
      <p>Date: {treino.data}</p>
      <p>Reminder: {treino.reminder ? "Yes" : "No"}</p>
    </div>
  );
}
