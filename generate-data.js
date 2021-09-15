const faker = require('faker');
//Để ghi được file ta sử dụng "fs"
const fs = require("fs");

//set locale is use vietnamese
faker.locale = 'vi'

//Random data

// //Dữ liệu random thương mại
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());
// //dữ liệu random người dùng
// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());


//n : là sô bản dữ liệu json được tạo ( n>0 )
const randomCategoryList = (n) => {
    //Nếu n = 0 thì không tạo dữ liệu
    if(n<=0) return [];
    //Tạo mảng
    const categoryList = []

    //loop and push category
    //Thực hiện n lần tạo dữ liệu
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        //push dữ liệu lên mảng
        categoryList.push(category);
    });
    return categoryList;
};


 const randomProductsList = (categoryList, numberOfProducts) => {
    if(numberOfProducts <= 0) return [];
    const productList = [];
     //random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            //Tạo dữ liệu ngẫu nhiên gán cho product
            const product = {
                //Tạo thêm id categories xem product của categories nào 
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                CreatedAt: Date.now(), 
                thumbnailUrl: faker.image.imageUrl(400,400),
            };
            //push dữ liệu product cho productList
            productList.push(product);
        });
    }
//     //Trả ra dữ liệu 
    return productList;
};
//IIFE
(() => {
    //random data
    //danh mục
    const categoryList = randomCategoryList(5);
    //số sản phẩm tương ứng từng danh mục 
    //Tạo 5 sản phẩm trong từng danh mục : 5x4=20 (sản phẩm)
    const productsList = randomProductsList(categoryList, 5);

    //prepare db object
    const db = {
        categories: categoryList,
        //Gán 20 dữ liệu producList cho product
        products: productsList,
        profile: {
            name: "Po",
        },
    };
    //write db object to db.json
    //Đọc ghi đối tượng vào file db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        //Ghi thành công hiển thị log
        console.log('Generate data successfully =))');
    })
})();