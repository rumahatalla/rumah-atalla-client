export default function KasirSection(product) {
  return (
    <>
      <div className="group relative bg-section drop-shadow-sm group hover:drop-shadow-md transition-all rounded-2xl">
        <div className=" w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="my-2 mx-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium ">{product.price}</p>
        </div>
      </div>
    </>
  );
}
