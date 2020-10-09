import React, { useContext } from "react"
import Layout from "../components/layout"
import Product from "../components/gallery/product"
import SEO from "../components/seo"
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-row flex-wrap flex-auto justify-center mx-auto my-20">
        {cart.map(item =>
          <Product
            key={item.id}
            id={item.id}
            currency={item.currency}
            price={item.price}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            dispatch={dispatch}
          />
        )}
      </div>
    </Layout>
  )
}

export default ProductPage;
