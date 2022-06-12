import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import logo from "./logo.svg";
import BookItem from "./BookItem.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./books.css";

import booksData from "./books.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: booksData,
      cart: this.getBookData().length ? this.getBookData() : [],
    };
  }

  addBookToCart = (book) => {
    const goods = this.state.cart;
    if (!goods.includes(book)) goods.push(book);
    else book.count++;
    this.setState({
      cart: goods,
    });
    this.setBookData(goods);
  };

  deleteBookFromCart = (book) => {
    let goods;
    if (book.count === 1)
      goods = this.state.cart.filter((item) => item.id !== book.id);
    else
      goods = this.state.cart.filter((item) =>
        item.id === book.id ? book.count-- : book.count
      );
    this.setState({
      cart: goods,
    });
    this.setBookData(goods);
  };

  render() {
    return (
      <div>
        <Header className=" jumbotron alert alert-primary" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div className="row">
                {this.state.books.map((book) => {
                  // console.log(book.id);
                  return (
                    <div className="col-4 mb-4" key={book.id}>
                      <BookItem
                        book={book}
                        removeBook={this.removeBook}
                        addBookToCart={this.addBookToCart}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-4">
              <h4>
                Корзина товаров, количество книг: {this.state.cart.length}{" "}
              </h4>
              <ul className="list-group">
                {this.state.cart.map((book) => (
                  <li key={book.id} className="list-group-item">
                    <div className="row">
                      <div className="col-4">{book.name}</div>
                      <div className="col-3">{book.author}</div>
                      <div className="col-2">{book.price}</div>
                      <div className="col-1">{book.count}</div>
                      <div className="col-3">
                        <button
                          onClick={this.deleteBookFromCart.bind(this, book)}
                          type="button"
                          className="btn btn-outline-primary mt-auto mb-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="row">
                <div className="col-12">
                  <Count goods={this.state.cart} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Sum goods={this.state.cart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeBook = (book) => {
    const updateBooks = this.state.books.filter(function (item) {
      return item.id != book.id;
    });
    console.log(updateBooks);
    this.setState({
      books: updateBooks,
    });
  };

  // Получаем данные из LocalStorage
  getBookData = () => {
    return JSON.parse(localStorage.getItem("books"));
  };

  // Записываем данные в LocalStorage
  setBookData = (o) => {
    localStorage.setItem("books", JSON.stringify(o));
    return false;
  };
}
class Sum extends React.Component {
  render() {
    let sum = 0;
    this.props.goods.forEach((book) => {
      console.log(book.price.slice(1));
      sum += +(book.price.slice(1) * book.count);
    });
    return <div> Суммарная стоимость: {sum.toFixed(2)} </div>;
  }
}
class Count extends React.Component {
  render() {
    let count = 0;
    this.props.goods.forEach((book) => {
      count += book.count;
    });
    return <div> Количество книг в корзине: {count} </div>;
  }
}

function Image(props) {
  return <img src={props.src} alt="logo" style={{ width: "150px" }} />;
}

function Header(props) {
  return (
    <div className={props.className}>
      <Image src={logo} />
      <h1>Книжный магазин</h1>
    </div>
  );
}

function Hello() {
  return (
    <div>
      <h1 style={{ color: "red" }}>Hello, world!</h1>;
      <h2>{booksData[0].name}</h2>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
