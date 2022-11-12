import { useState } from "preact/hooks";
import { IProduct } from "../utils/types.ts";

interface ProductCardProps {
    product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
    const [details, setDetails] = useState(false)

    const toggle = () => setDetails((prev) => !prev)

    return (
        <div class="flex flex-col justify-center items-center px-4 py-2 border rounded">
            <img src={product.image} alt={product.title} class="w-1/6" />
            <h2 class="text-lg font-bold">{product.title}</h2>
            <p class="font-bold">{product.price}$</p>
            <a href={`/product/${product.id}`}>Open</a>
            <button class="px-4 py-2 text-white bg-blue-400 border rounded" onClick={toggle}>Toggle Description</button>
            {details && <p>{product.description}</p>}
        </div>
    )
}
