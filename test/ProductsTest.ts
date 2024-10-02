import { expect } from "chai";
import { ethers } from "hardhat";

describe("Products Contract", function () {
    let Products: any;
    let products: any;

    beforeEach(async function () {
        Products = await ethers.getContractFactory("Products");
        products = await Products.deploy();
        await products.deployed;
    });

    it("should add a product", async function () {
        const productName = "Product 1";
        const productPrice = 100;
    
        const tx = await products.addProduct(productName, productPrice);
        const receipt = await tx.wait();
        
        const block = await ethers.provider.getBlock(receipt.blockNumber);
        const timestamp = block?.timestamp;

        await expect(tx)
            .to.emit(products, "ProductAdded")
            .withArgs(1, productName, productPrice, timestamp);
    
        const allProducts = await products.getAllProducts();
        expect(allProducts.length).to.equal(1);
        expect(allProducts[0].productId).to.equal(1);
        expect(allProducts[0].productName).to.equal(productName);
        expect(allProducts[0].productPrice).to.equal(productPrice);
    });
    

    it("should get all products", async function () {
        await products.addProduct("Product 1", 100);
        await products.addProduct("Product 2", 200);

        const allProducts = await products.getAllProducts();
        expect(allProducts.length).to.equal(2);
    });

    it("should get paginated products", async function () {
        await products.addProduct("Product 1", 100);
        await products.addProduct("Product 2", 200);
        await products.addProduct("Product 3", 300);
        await products.addProduct("Product 4", 100);
        await products.addProduct("Product 5", 200);
        await products.addProduct("Product 6", 300);

        const paginatedProducts = await products.getPaginatedProducts(1, 3);
        expect(paginatedProducts.length).to.equal(3);
        expect(paginatedProducts[0].productName).to.equal("Product 2");
        expect(paginatedProducts[1].productName).to.equal("Product 3");
        expect(paginatedProducts[2].productName).to.equal("Product 4");
    });

    it("should revert if trying to add a product with empty name", async function () {
        await expect(products.addProduct("", 100)).to.be.revertedWith("Error: Product name cannot be empty.");
    });

    it("should revert if trying to add a product with zero price", async function () {
        await expect(products.addProduct("Product 1", 0)).to.be.revertedWith("Error: Product price should be greater than 0.");
    });
});
