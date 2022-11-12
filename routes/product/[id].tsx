import { Handlers, PageProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"
import { Fragment } from 'preact'
import Navigation from "../../components/Navigation.tsx"
import { IProduct } from "../../utils/types.ts"

export const handler: Handlers<IProduct | null> = {
    async GET(_, ctx) {
        const res = await fetch(`https://fakestoreapi.com/products/${ctx.params.id}`)
        const product = (await res.json()) as IProduct
        if (!product) {
            return ctx.render(null)
        }
        return ctx.render(product)
    }
}

export default function Home({ data: product }: PageProps<IProduct | null>) {
    if (!product) return <p>Product not found</p>
    return (
        <Fragment>
            <Navigation />
            <div class="p-4 mx-auto max-w-screen-md mt-[50px]">
                <div>
                    <h1 class="text-2xl font-bold">{product.title}</h1>
                    <img src={product.image} class="w-1/3" />
                </div>
            </div>
        </Fragment>
    )
}
