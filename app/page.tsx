// create a Get request to fetch data from the API
// fetch data from the API
async function getData() {
	const url =
		"https://www.vroomdelivery.com/api/v1/products/getProductsWithSecondaryCategories?primary_category=29&company_id=88";
	const res = await fetch(url);

	// const data = await res.json();
	const data = (await res.json()) as ResponseData;

	// filter for only active products (category 204)
	const filteredProducts = data.products.filter((product) => {
		if (product.category_id === 204) {
			// this is pizza
			// filter for anything without "Pizza" in the title
			if (!product.title.includes("Pizza")) {
				return false;
			}

			// filter out anything with "Grinder" in the title
			if (product.title.includes("Grinder")) {
				return false;
			}

			return product;
		}
	});

	return filteredProducts;
}

type Product = {
	id: number;
	active: boolean;
	title: string;
	description: string;
	price: string;
	avatarUrl: string;
	category_id: number;
	// TODO: type the rest of the properties
};
type Category = {
	id: number;
	title: string;
	parent_id: number;
	// TODO: type the rest of the properties
};

type ResponseData = {
	products: Product[];
	sponsored: any; // TODO: type this later
	categories: Category[];
	productsForOrderAgainSection: any; // TODO: type this later
};

export default async function Home() {
	const pizzaData = await getData();

	const pizzaComponent = (product: Product) => {
		return (
			<div
				key={product.id}
				className="flex flex-col items-center justify-center mb-4"
			>
				<img src={product.avatarUrl} alt={product.title} />
				<h2 className="italic">{product.title}</h2>
				<p>${product.price}</p>
			</div>
		);
	};

	const pizzaList = () => {
		return (
			<div className="">
				{pizzaData.map((product) => {
					return pizzaComponent(product);
				})}
			</div>
		);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{/* HEADER */}
			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					🍕 Only Pizza
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
					<p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
						By OBINNA
					</p>
				</div>
			</div>

			{/* LIST */}
			<div className="flex w-full min-h-full  items-center">
				<div className="flex flex-col items-center justify-center w-full ">
					<div className="flex flex-col mb-6 items-center">
						<h1 className="text-5xl font-bold ">🍕 Only Pizza</h1>
						<p className="text-2xl">For pizza lovers only.</p>
					</div>
					<div className=" ">{pizzaList()}</div>
				</div>
			</div>
		</main>
	);
}
