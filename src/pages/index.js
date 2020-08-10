import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby';

// .redirectToCheckout logic will be moved to the cart page

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      id: props.id,
      currency: props.currency,
      price: props.price,
      image: props.image,
      name: props.name
    };
  }

  componentDidMount() {
    this.stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');
  }

  // we want to add a clickable + and - so that users can update quantity
  // The Add To Cart button will add the selected quantity to the cart/localStorage
  // "In Cart" text will appear and buttons will be disabled 

  increment = () => {
    this.setState({
      quantity: this.state.quantity + 1
    });
  };

  decrement = () => {
    if (this.state.quantity === 0) {
      return;
    }

    this.setState({
      quantity: this.state.quantity - 1
    });
  };

  addToCart = () => {
    // if localStorage is empty then add the item and return
    let str = localStorage.getItem('cart');

    if (str === null) {
      localStorage.setItem('cart', JSON.stringify([this.state]));
      console.log('First item: ', localStorage.getItem('cart'));
      return;
    }

    // parse localStorage into an array and push the current item to the cart

    let arr = JSON.parse(str);
    arr.push(this.state);
    localStorage.setItem('cart', JSON.stringify(arr));

    console.log("final check: ", localStorage.getItem('cart'));
  }

  render() {
    // this has to do with formatting the price info we receive from stripe
    const { currency, price, image, name } = this.props;

    const priceFloat = (price / 100).toFixed(2);
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(priceFloat);

    return (
      <div className="m-1 p-4"
      // onSubmit={this.handleSubmit(id)}
      >
        <img className="w-32 h-32 rounded object-cover" alt="product" src={image} />
        <p className="text-center"> {name} - {formattedPrice} </p>


        <button onClick={this.increment} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">+</button>

        {this.state.quantity}

        <button onClick={this.decrement} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">-</button>

        <button onClick={this.addToCart} className="block m-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
      </div>
    )
  }
}

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      {
          allStripeSku {
              edges {
              node {
                  id
                  currency
                  price
                  image
                  attributes {
                  name
                  }
              }
              }
          }
}
`}

    // ({ node: sku }) changes the node alias to sku for ergonomics
    // otherwise, we could proceed with node.id, node.currency instead
    render={data => (
      <Layout>
        <SEO title="Home" />
        <div className="flex flex-row flex-wrap flex-auto justify-center mx-auto my-20">
          {data.allStripeSku.edges.map(({ node: sku }) =>
            <Product
              key={sku.id}
              id={sku.id}
              currency={sku.currency}
              price={sku.price}
              image={sku.image}
              name={sku.attributes.name}
              quantity={0}
            />
          )}
        </div>
      </Layout>
    )}
  />

)

export default IndexPage
