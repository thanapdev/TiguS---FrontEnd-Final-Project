//main dish item
var product = [{
        id:1,
        img:('/img/hero3.png') ,
        name:"Kaw Mun Kai",
        price:40,
        descrpition:"Normal Kaw Mun Kai that is Hainanese rice with boiled chicken",
        type:"mainDish"
    } , {
        id:2,
        img:('/img/hero2.jpeg') ,
        name:"Kaw Mun Kai-Tod",
        price:45,
        descrpition:"Normal Kaw Mun Kai that is Hainanese rice with fried chicken",
        type:"mainDish" 
    } , {
        id:3,
        img:('/img/hero4.jpg') ,
        name:"Kaw Mun Kai-Tome-Tod",
        price:50,
        descrpition:"Normal Kaw Mun Kai that is Hainanese rice with boiled chicken and fried chicken",
        type:"mainDish"
    } , {
        id:4,
        img:('/img/hero5.jpg') ,
        name:"fried chicken (Kai-Tod)",
        price:55,
        descrpition:"fried chicken",
        type:"mainDish" 
    } , {
        id:5,
        img:('/img/hero6.jpg') ,
        name:"boiled chicken (Kai-Tome)",
        price:55,
        descrpition:"boiled chicken",
        type:"mainDish"
    },

    //side dish item
    {
        id:6,
        img:('/img/hero7.jpg') ,
        name:"Tub (liver)",
        price:40,
        descrpition:"boiled liver",
        type:"sideDish"
    } , {
        id:7,
        img:('/img/hero8.jpg') ,
        name:"Tome-Jeud (Soup)",
        price:45,
        descrpition:"boiled liver",
        type:"sideDish"
    } , {
        id:8,
        img:('/img/hero9.jpg') ,
        name:"Rice",
        price:30,
        descrpition:"Rice",
        type:"sideDish"
    } , {
        id:9,
        img:('/img/hero10.jpg') ,
        name:"Spicy Dipping Sauce",
        price:20,
        descrpition:"Spicy Dipping Sauce",
        type:"sideDish"
    } , {
        id:10,
        img:('/img/hero11.jpg') ,
        name:"Dipping Sauce",
        price:55,
        descrpition:"Normal Dipping Sauce",
        type:"sideDish"
    } , 
    
    // beverage item
    {
        id:11,
        img:('/img/hero12.jpeg') ,
        name:"Water",
        price:20,
        descrpition:"Normal Warter",
        type:"beverage"
    } , {
        id:12,
        img:('/img/hero13.png') ,
        name:"CoCaCola (Coke)",
        price:25,
        descrpition:"Can of Coke",
        type:"beverage"
    } , {
        id:13,
        img:('/img/hero14.jpg') ,
        name:"Schweppes",
        price:25,
        descrpition:"Can of Schweppes",
        type:"beverage"
    } , {
        id:14,
        img:('/img/hero15.jpg') ,
        name:"Orange Juice",
        price:35,
        descrpition:"fresh orange juice",
        type:"beverage"
    } , {
        id:15,
        img:('/img/hero16.jpg') ,
        name:"Apple Juice",
        price:35,
        descrpition:"fresh apple juice",
        type:"beverage"
    } , {
        id:16,
        img:('/img/hero17.jpg') ,
        name:"Kiwi Juice",
        price:35,
        descrpition:"fresh kiwi juice",
        type:"beverage"
    } , {
        id:17,
        img:('/img/hero18.png') ,
        name:"Water melon Juice",
        price:35,
        descrpition:"fresh water melon juice",
        type:"beverage"
    }]

    // show main dish item
    $(document).ready(() =>{
        var html = '';
        for (let i = 0; i < product.length; i++) {
            html += `<div class="col mb-3 product-items ${product[i].type} " >
                                <div class="card shadow-sm">
                                    <img src="${product[i].img}" height="220px"/>
                                    <div class="card-body">
                                        <p class="card-text text-dark text-center">${product[i].name} : ${product[i].price} THB </p>
                                        <p class="card-text text-dark">${product[i].descrpition}</p>
                                        <div class="d-flex justify-content-between ">
                                            <div class="btn-group">
                                                <button onclick="addtocart(${i})" class="btn btn-outline-success ">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            $("#productlist").html(html);
        }
    })

    function searchproduct(param) {
        console.log(param)
        $(".product-items").css('display', 'none')
        if(param == 'all') {
            $(".product-items").css('display', 'block')
        }
        else {
            $("."+param).css('display', 'block')
        }
    }

    var productindex = 0;
    var cart = [];
    function addtocart(index) {
        var pass = true;
    
        for (let i = 0; i < cart.length; i++) {
            if( index == cart[i].index ) {
                console.log('found same product')
                cart[i].count++;
                pass = false;
            }
        }
    
        if(pass) {
            var obj = {
                index: index,
                id: product[index].id,
                name: product[index].name,
                price: product[index].price,
                img: product[index].img,
                count: 1
            };
            // console.log(obj)
            cart.push(obj)
        }
        console.log(cart)
    
        Swal.fire({
            icon: 'success',
            title: 'Add ' + product[index].name + ' to cart !'
        })
        $("#cartcount").css('display','flex').text(cart.length)
    }
    
    function opencart() {
        $('#cartModal').modal('show');
        rendercart();
    }
    
    
    function rendercart() {
        if(cart.length > 0) {
            var htmlcart = '';
            for (let i = 0; i < cart.length; i++) {
                htmlcart += `<div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 mb-2">
                                <div class="col-4 text-center">
                                <img src="${cart[i].img}" style="width: 100px; height: 100px; border-radius: 1.5vw;" alt="">
                            </div>
                            <div class="col-4 text-center">
                                <p class="">${cart[i].name}</p>
                                <p class="">${cart[i].price}</p>
                            </div>
                            <div class="col-4 text-center">
                                <div class="input-group">
                                    <input type="number" id="quantity" name="quantity"  class="form-control input-number" value="${cart[i].count}" min="1">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger delete-btn">Delete</button>
                                    </span>
                                    </div>
                                </div>
                            </div>`;
            }
            $("#mycart").html(htmlcart)
        }
        else {
            $("#mycart").html(`<p>Your cart is currently empty.</p>`)
        }
    }

    $(document).on('click', '.delete-btn', function() {
        const index = $(this).closest('.row').index(); // get the index of the row
        cart.splice(index, 1); // remove the item from the cart array
        rendercart(); // re-render the cart
    });
    
    
    function deinitems(action, index) {
        if(action == '-') {
            if(cart[index].count > 0) {
                cart[index].count--;
                $("#countitems"+index).text(cart[index].count)
    
                if(cart[index].count <= 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Are you sure to delete?',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Delete',
                        cancelButtonText: 'Cancel'
                    }).then((res) => {
                      if(res.isConfirmed) {
                         cart.splice(index, 1) 
                         console.log(cart)
                         rendercart();
                         $("#cartcount").css('display','flex').text(cart.length)
                         
                         if(cart.length <= 0) {
                            $("#cartcount").css('display','none')
                         }
                      }  
                      else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                        rendercart();
                      }
                    })
                }
                rendercart();
            }
            
        }
        else if(action == '+') {
            cart[index].count++;
            $("#countitems"+index).text(cart[index].count)
            rendercart();
        }
    }