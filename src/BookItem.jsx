const BookItem = props => {
    console.log("props:");
    console.log(props);
    return (
      <div>
        <p>{props.book.name}</p>
        <button onClick={props.removeBook.bind(null, props.book)}>Delete</button>
        <button onClick={props.addBookToCart.bind(null, props.book)} className="btn btn-outline-success mt-auto mb-2" >Buy</button>

      </div>
    );
  };
  export default BookItem;
  