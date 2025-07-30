import ReactMarkdown from 'react-markdown';

export default function Recipe(props) {
  return (
    <>
      {props.recipe && (
        <div className="recipe-section">
          <h2 id="recommend">Our Chef Recommends:</h2>
          <div className="recipe-wrapper">
            <ReactMarkdown className="recipe-container">{props.recipe}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}
