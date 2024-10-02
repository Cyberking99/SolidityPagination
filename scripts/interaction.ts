import { ethers } from "hardhat";

async function main() {
    
    const Products = await ethers.getContractFactory("Products");
    const products = await Products.deploy();
    const address = await products.getAddress();

    console.log("Products contract deployed to:", address);
    
    const product1 = await products.addProduct("Product 1", 100);
    await product1.wait();
    console.log("Product 1 added");

    const product2 = await products.addProduct("Product 2", 200);
    await product2.wait();
    console.log("Product 2 added");

    const product3 = await products.addProduct("Product 3", 300);
    await product3.wait();
    console.log("Product 3 added");

    const product4 = await products.addProduct("Product 4", 600);
    await product4.wait();
    console.log("Product 4 added");

    const product5 = await products.addProduct("Product 5", 400);
    await product5.wait();
    console.log("Product 5 added");

    const product6 = await products.addProduct("Product 6", 800);
    await product6.wait();
    console.log("Product 6 added");
    
    const allProducts = await products.getAllProducts();
    console.log("All Products:", allProducts);
    
    const offset = 70;
    const limit = 4;
    const paginatedProducts = await products.getPaginatedProducts(offset, limit);
    console.log("Paginated Products:", paginatedProducts);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
