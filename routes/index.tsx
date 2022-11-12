import { Handlers, PageProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"
import { Fragment } from 'preact'
import Navigation from "../components/Navigation.tsx"
import { IProduct } from "../utils/types.ts"
import ProductCard from "../islands/ProductCard.tsx"

export const handler: Handlers<IProduct[] | null> = {
  async GET(_, ctx) {
    const res = await fetch("https://fakestoreapi.com/products")
    const products = (await res.json()) as IProduct[]
    if (!products) {
      return ctx.render(null)
    }
    return ctx.render(products)
  }
}

export default function Home({ data: products }: PageProps<IProduct[] | null>) {
  if (!products) return <p>No products</p>
  return (
    <Fragment>
      <Head>
        <title>Fresh App</title>
      </Head>
      <Navigation />
      <div class="p-4 mx-auto max-w-screen-md mt-[50px]">
        <h1>Hello Fresh!</h1>
        <div>
          {products.map((prod) => <ProductCard key={prod.id} product={prod} />)}
        </div>
      </div>
    </Fragment>
  )
}
