//indecies of product data 
const itemName = 0;
const itemPrice = 1;
const itemDescription = 2; 
const itemImageLoc = 3;

//dummy marketplace data 
const cuurent_items = new Map([
    ["item 1", ["7 Iron", 75.0, "Taylormade 7 iron in great conditon", "../images/clubs.jpeg"]], 
    ["item 2", ["Snowboard", 250.0, "like new burton snowboard", "../images/snowboard.jpeg"]]
]);

function createFigure(itemData)
{
    console.log("createing figure");
    let item_figure = document.createElement("figure");
    
    //image 
    console.log("creating image");
    let product_anchor = document.createElement("a");
    product_anchor.setAttribute("target", "_blank");
    product_anchor.setAttribute("href",itemData[itemImageLoc] ); // image link -> update to product page in future 

    let product_img = document.createElement("img");
    product_img.setAttribute("src", itemData[itemImageLoc]);
    product_img.setAttribute("alt", itemData[itemName]);

    product_anchor.appendChild(product_img);


    //product info 

    console.log("creating title");
    //title (includes name and price)
    let product_title = document.createElement("div");
    product_title.classList.add("title")
    //name 
    let product_name = document.createElement("p");
    product_name.classList.add("name");
    product_name.textContent = itemData[itemName];
    //price 
    const product_price = document.createElement("p");
    product_price.classList.add("price");
    const formated_price = itemData[itemPrice].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    product_price.textContent = formated_price;

    console.log("updating title");
    product_title.appendChild(product_name);
    product_title.appendChild(product_price);


    //description 
    let product_description = document.createElement("div");
    product_description.classList.add("description");
    product_description.textContent = itemData[itemDescription];

    //add compontes to figure 
    item_figure.appendChild(product_anchor);
    item_figure.appendChild(product_title);
    item_figure.appendChild(product_description);
    console.log("created figure");
    console.log(item_figure);

    return item_figure;

};

function createGallery()
{
    let product_gallery = document.querySelector(".gallery");
    // cuurent_items.forEach((key, value) => {
    //     console.log("loooping");
    //     console.log(value[0]);
    //     let cur_product = createFigure(value);
    //     product_gallery.appendChild(cur_product)
    // });
    cuurent_items.forEach((values, keys) => {
        console.log(values, keys);
        let cur_product = createFigure(values);
        console.log(cur_product);
        product_gallery.appendChild(cur_product)
    });

};

createGallery();