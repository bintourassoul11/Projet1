export default function ListeCommentaires({ commentaires }) {
  return (
    <div>
      <h2>Commentaires ({commentaires.length})</h2>
      {commentaires.map((commentaire) => (
        <div className="carte" key={commentaire.id}>
          <strong>{commentaire.name}</strong>
          <p>{commentaire.body}</p>
        </div>
      ))}
    </div>
  );
}