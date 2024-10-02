// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.26;

contract Products {
    
    struct Product {
        uint productId;
        string productName;
        uint productPrice;
        uint timeAdded;
    }

    Product[] private products;

    uint private nextProductId;

    event ProductAdded(uint productId, string productName, uint productPrice, uint timeAdded);

    function addProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Error: Product name cannot be empty.");
        require(_price > 0, "Error: Product price should be greater than 0.");

        nextProductId++;
        products.push(Product(nextProductId, _name, _price, block.timestamp));

        emit ProductAdded(nextProductId, _name, _price, block.timestamp);
    }

    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    function getPaginatedProducts(uint _offset, uint _limit) public view returns (Product[] memory) {
        
        uint end = _offset + _limit > products.length ? products.length : _offset + _limit;
        
        uint endOffset;

        if(end == products.length){
            endOffset = 0;
        }else{
            endOffset = end - _limit;
        }

        Product[] memory paginatedProducts = new Product[](endOffset);

        for (uint i = _offset; i < end; i++) {
            paginatedProducts[i-_offset] = products[i];
        }

        return paginatedProducts;
    }
}