var currency = '€';
//cart value
 var CartDataValue = function() {
    function getCartData(){
      return JSON.parse(localStorage.getItem('cart'));
    }
    function setCartData(o){
      localStorage.setItem('cart', JSON.stringify(o));
      return false;
    }
    var cartData = getCartData();
    //console.log(cartData)
    var sum = [];
    var countProduct = [];
    if(cartData !== null) {
      for(var items in cartData){
        var cartValue = cartData[items][3]*1;
        var cartPrice = cartData[items][1].split(currency)[1]*1*cartValue;
         sum.push(cartPrice);
         countProduct.push(cartValue);
       }
        var sumResult = sum.reduce(function(a, b) { return a + b; }, 0);
        var countProductResult = countProduct.reduce(function(a, b) { return a + b; }, 0);
        //console.log(sumResult);
        //console.log(countProductResult);
        document.querySelector('#sumPrice').innerHTML = currency + '' + sumResult.toFixed(2);
        document.querySelector('#sumProduct').innerHTML = '(' + countProductResult + ')';
      }
      else {
        document.querySelector('#sumPrice').innerHTML = '';
        document.querySelector('#sumProduct').innerHTML = '(0)';
      }
      //console.log(sum)
  }
//end cart value
//search
document.getElementById("search").onclick = function(event) {
	event.preventDefault();
	this.classList.toggle('open');
	document.getElementById("searchBlock").classList.toggle('open');
	openSearch();
	valueSearch();
}

function openSearch() {
    document.getElementById("search__container").classList.toggle("show");
}
function valueSearch() {
    var inputSearch = document.getElementById("search__input");
	console.log(inputSearch.value);
	if (!inputSearch.value == "") {
	    goToPage ();

	}
}

function goToPage() {
	document.location.href = './catalog.html';
}
//end search

//slider
var SliderFunction = function() {
	var controls = document.querySelectorAll('.buttons__controls');
		for(var i=0; i<controls.length; i++){
			controls[i].style.display = 'inline-block';
		}
	var sliderWrapper = document.querySelector('#slides');
	var slides = document.querySelectorAll('#slides .slider__item');
	var wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
	var slideWidth = parseFloat(getComputedStyle(slides[0]).width);
	var transform = 0;
    var step = slideWidth / wrapperWidth * 100;
	var positionLeftSlide = 0;
	slidesArray = [];
	 slides.forEach(function (item, index) {
          slidesArray.push({ item: item, position: index, transform: 0 });
        });

    var position = {
        getMin: 0,
        getMax: slidesArray.length - 1,
    }
    var next = document.getElementById('next');
	var previous = document.getElementById('previous');

	 var transformItem = function (direction) {
          if (direction === 'prev') {
            if ((positionLeftSlide + wrapperWidth / slideWidth - 1) >= position.getMax) {
              return;
            }
            if (!next.classList.contains('slider__control_show')) {
              next.classList.add('slider__control_show');
            }
            if (previous.classList.contains('slider__control_show') && (positionLeftSlide + wrapperWidth / slideWidth) >= position.getMax) {
              previous.classList.remove('slider__control_show');
            }
            positionLeftSlide++;
            transform -= step;
          }
          if (direction === 'next') {
            if (positionLeftSlide <= position.getMin) {
              return;
            }
            if (!previous.classList.contains('slider__control_show')) {
              previous.classList.add('slider__control_show');
            }
            if (next.classList.contains('slider__control_show') && positionLeftSlide - 1 <= position.getMin) {
              next.classList.remove('slider__control_show');
            }
            positionLeftSlide--;
            transform += step;
          }
          sliderWrapper.style.transform = 'translateX(' + transform + '%)';
        }

        var controlClick = function (e) {
          var direction = this.classList.contains('buttons__controls-prev') ? 'next' : 'prev';
          e.preventDefault();
          transformItem(direction);
        };

        var setUpListeners = function () {
          controls.forEach(function (item) {
           item.addEventListener('click', controlClick);
          });
        }
        setUpListeners();

        return {
          right: function () {
            transformItem('next');
          },
          left: function () {
            transformItem('right');
          }
        }

      }
//end slider

//slider-preview
var SliderThumbsFunction = function() {
	var sliderStage = document.getElementById('sliderStage');
	var thumbs= document.getElementById('thumbs');
	var imgStage = document.getElementById('imgStage');
	var activeThumb = thumbs.getElementsByClassName('highlight')[0];
	var selectedThumbs;

	var SliderValue = function(id) { 
		id.onclick = function(event) {
			event.preventDefault();
		  var target = event.target;
		  var input = target.closest('a');
		  if (!input) return; 
		  if (!id.contains(input)) return;
		  var bigPath = input.getAttribute("href");
		  var bigAlt = input.getAttribute("title");
		  imgStage.setAttribute("src", bigPath);
		  imgStage.setAttribute("alt", bigAlt);
		  activeThumb.classList.remove('highlight');
		  highlightThumbs(input, id);
		} 
	}
	function highlightThumbs(node, id) {
		if(id == thumbs) {
		  if (selectedThumbs) {
		    selectedThumbs.classList.remove('highlight');
		  }
		  selectedThumbs = node;
		  selectedThumbs.classList.add('highlight');
		}
	}
	SliderValue(thumbs);
}
//end slider-preview
//basket
var BasketFunction = function() {
	//popup
	var popup = document.getElementById('popup');
	var popupHeading = document.getElementById('popupHeading');
	var popupClose = document.getElementById('popupClose');
	popupClose.onclick = function(event) {
		event.preventDefault();
		closePopup();
	}
	function closePopup() {
	    popup.classList.remove('popup-fixed');
	}
	function openPopup() {
		popup.classList.add('popup-fixed');
		if (popup.classList.contains('popup-fixed')) {
			setTimeout(()=>closePopup(), 3000);
		}
	}

	//select size
	var sizeContainer = document.getElementById('size');
	var selectedSize;
	var CheckValue = function(id) { 
		id.onclick = function(event) {
		  var target = event.target;
		  var input = target.closest('input');
		  if (!input) return; 
		  if (!id.contains(input)) return;

		  highlight(input, id);
		} 
	}
	CheckValue(sizeContainer);
	function highlight(node, id) {
		 if(id == sizeContainer) {
		  if (selectedSize) {
		    selectedSize.classList.remove('highlight');
		  }
		  selectedSize = node;
		  selectedSize.classList.add('highlight');
		}
	}
	//end select size
	var productDetails = document.getElementById('detailsInfo');
	function makeCounter() {
	  var currentCount = 1;
	  return function() {
	    return currentCount++
	  };

	};
	var addToBag = document.getElementById('addToBag');
	function getCartData(){
		  return JSON.parse(localStorage.getItem('cart'));
		}
		function setCartData(o){
		  localStorage.setItem('cart', JSON.stringify(o));
		  return false;
		}
	var clicker = function(e) {
		if(selectedSize==null) {
			//alert('select size');
			openPopup();
			popupHeading.innerText = "Select size";
			
		}
		else {
			this.disabled = true; 
			var value = this.counter();
			var product = detailsInfo.querySelector('.details-info__heading').innerHTML;
			var dataTitle = detailsInfo.querySelector('.details-info__heading').getAttribute("data-heading");
			var dataSize = selectedSize.getAttribute("data-size");
			var priceValue = detailsInfo.querySelector('#price').innerHTML;
			var productSize = selectedSize.getAttribute('value');
			openPopup();
			popupHeading.innerText = ' Вы добавили в корзину ' + product;
			//alert(' Вы добавили в корзину ' + product);
			var addInfo = product +  ', ' + currency + ' ' + priceValue + ' ' + productSize;
			//localStorage.setItem(addInfo, value);
			var counter = document.querySelector('#sumProduct');
			var sumCurrent = document.querySelector('#sumPrice').innerHTML;
			//console.log(sumCurrent);
			//var sum = document.querySelector('#sumPrice').innerHTML = priceValue*1 + sumCurrent*1;
			//var counter = document.querySelector('#sumProduct').innerHTML = value;
			var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
		    itemId = dataTitle + '' + dataSize, // ID товара
		    itemTitle = product,  
		    itemSize = 'Size: ' + productSize, 
		    itemPrice = currency + '' + priceValue;
		    itemQuantity = 1;
			if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
				cartData[itemId][3] += 1;
				} else { // если товара в корзине еще нет, то добавляем в объект
				cartData[itemId] = [itemTitle, itemPrice, itemSize, 1];
			};
			if(!setCartData(cartData)){ // Обновляем данные в LocalStorage
				this.disabled = false; // разблокируем кнопку после обновления LS
			}
			addToBag.classList.add('catalog__button-added');
			addToBag.innerHTML = "Product Added";
			CartDataValue();
		
		}
		
	};
	for (var i = 0; i < 1; i++) {
		clicks=0;
	  	addToBag.counter = makeCounter();
	  	addToBag.onclick = function(e) {
	  		e.preventDefault();

	    clicker.apply(this);
	    clicks++;
	    
	  };

	  
	}
}
var bagCount = document.getElementById('sumProduct');
var bagPrice = document.getElementById('sumPrice');

//end basket

//cart 
var CartFunction = function() {
cartCont = document.getElementById('cart_content'); 
function getCartData(){
      return JSON.parse(localStorage.getItem('cart'));
    }
    function setCartData(o){
      localStorage.setItem('cart', JSON.stringify(o));
      return false;
    }
var cartData = getCartData(),
      totalItems = '';
      //console.log(cartData);
//cart value

//end cart value
 if( window.innerWidth >= 768 ){
      //выполнять
 } else {
      //не выполнять
 }

 if(Object.keys(cartData).length !== 0){
  	 if( window.innerWidth >= 768 ){
	    totalItems = '<table class="shopping" id="cart-list"><tr class="shopping__container"><th>PRODUCT</th><th>DESCRIPTION</th><th>AMOUNT</th><th>SIZE</th><th>QTY</th><th></th></tr>';
	    for(var items in cartData){
	      //var size = Object.keys(cartData).length;
	      totalItems += '<tr class="shopping__container" id="' + items + '"><td class="shoping__img"><a href="./details.html" class="product__link"><div class="product__img-inner"><img class="product__img" src="./img/thumb.png" width="100" height="100"></div></a></td>';
	      for(var i = 0; i < cartData[items].length; i++){
	         result = '<td class="shopping__item shopping__item-desk shopping__item-' + [i] + ' ">' + cartData[items][i] + '</td>';
	         totalItems += result;
	      }
	      totalItems += '<td class="shopping__item"><a href="#" id="del-' + items + '" class="btn-del" data-id="' + items + '">X</a></td></tr>';
	    }
	    totalItems += '</table>';
	    cartCont.innerHTML = totalItems;
	   }else {
		   	totalItems = '<div class="shopping" id="cart-list">';
		    for(var items in cartData){
		      totalItems += '<div class="shopping__container shopping__container-mob flex" id="' + items + '"><div class="shoping__img"><a href="./details.html" class="product__link"><div class="product__img-inner"><img class="product__img" src="./img/thumb.png" width="100" height="100"></div></a></div><ul class="shopping__list">';
		      for(var i = 0; i < cartData[items].length; i++){
		         result = '<li class="shopping__item shopping__item-' + [i] + ' ">' + cartData[items][i] + '</li>';
		         totalItems += result;
		      }
		      totalItems += '<li class="shopping__item"><a href="#" id="del-' + items + '" class="btn-del" data-id="' + items + '">X</a></li></ul></div>';
		    }
		    totalItems += '</div>';
		    cartCont.innerHTML = totalItems;
		 }

	} else {
    cartCont.innerHTML = 'Your shopping bag is empty!';
  }

 
	document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;

 //del cart
   /*var delCart = document.getElementById('btn_del');
 	delCart.onclick = function(event) {
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Your shopping bag is empty. Use <a href="./catalog.html"><strong>Catalog</strong></a> to add new items';
    CartDataValue();
    document.querySelector('#sumPrice').innerHTML = '';
    document.querySelector('#sumProduct').innerHTML = '(0)';
    document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;
  }*/
  //buy 
   var buyCart = document.getElementById('btn_buy');
  	buyCart.onclick = function(event) {
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Thank you for your purchase';
    CartDataValue();
    goToPageThanks();
    document.querySelector('#sumPrice').innerHTML = '';
    document.querySelector('#sumProduct').innerHTML = '(0)';
    document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;
  }

  function goToPageThanks() {
	document.location.href = './thanks.html';
}


  //del items
  var container = document.getElementById('cart-list');

    container.onclick = function(event) {
      event.preventDefault();
      if (!event.target.classList.contains('btn-del')) return;
      var itemId = event.target.getAttribute("data-id");
      var parentBlock = document.getElementById(itemId);
      var quantity = parentBlock.querySelector('.shopping__item-3').innerHTML;
      //console.log(quantity)
      var parentContainer = parentBlock.parentNode;
      if(quantity==1) {
        parentBlock.remove();
        var cartData = getCartData(); 
        delete cartData[itemId]; 
        setCartData(cartData);
      }
      else {
        var cartData = getCartData();
        cartData[itemId][3] = cartData[itemId][3]*1-1;
        setCartData(cartData);
        parentBlock.querySelector('.shopping__item-3').innerHTML = cartData[itemId][3]*1;
        parentBlock.querySelector('.shopping__item-3').setAttribute("data-id", cartData[itemId][3]);
      }
      if (parentContainer.childNodes.length < 1) {
           cartCont.innerHTML = 'Your shopping bag is empty. Use <a href="./catalog.html" class="btn-return"><strong>Catalog</strong></a> to add new items';
      }
      CartDataValue(); 
      document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;   
    } 
}
//end cart

//catalog

		function catalog(name, img, price){
			this.name = name;
			this.img = img;
			this.price = price;
		}

		var catalog =  [
			{name: 'Double-Layered Top',
			img: 'prod',
			price: 55},
			{name: 'Double-Layered Top',
			img: 'prod2',
			price: 34.25},
			{name: 'Double-Layered Top',
			img: 'prod3',
			price: 140.50},
			{name: 'Double-Layered Top',
			img: 'prod4',
			price: 12.75}
			
		 ]
var CatalogFunction = function() {
		 catalogList = document.getElementById('catalog');
		 //console.log(catalog);

		 function add(about, el, className, key) {
			var about = document.createElement(el);
			about.className = className;              
			catalogList.appendChild(productItem).appendChild(productLink).appendChild(about).innerHTML = key;
		}
		var CreateCatalogListFunction = function() {

			function add(about, el, className, key) {
				var about = document.createElement(el);
				about.className = className;              
				catalogList.appendChild(productItem).appendChild(productLink).appendChild(about).innerHTML = key;
			}
			for (var i = 0; i < catalog.length; i++) {
				 //product item
				var productItem = document.createElement("li");
				productItem.className='product__item'; 
				var productLink = document.createElement("a");

				var productDivImg = document.createElement("div");
				productDivImg.className='product__img-inner'; 
				//img
				var productImg = document.createElement("div");
				productImg.className='product__img';  
				productImg.setAttribute("style", "background-image: url(./img/" + catalog[i].img + ".png)");              
				catalogList.appendChild(productItem).appendChild(productLink).appendChild(productDivImg).appendChild(productImg);
				//name
				add('productName', 'h4', 'product__name', catalog[i].name);
				//price
				add('productPrice', 'p', 'product__price', currency + '' +catalog[i].price);
			}
		}
		CreateCatalogListFunction();
	}
		//end catalog

/*var a = 10;
function foo1() {
	console.log(a);
	a = 5;
}
foo1();

var a = 10;
function foo2() {
	console.log(a);
	var a = 5;
}
foo2();
*/

/*let a = 10;
function foo3() {
	console.log(a);
	 a = 5;
}
foo3();*/

/*let a = 10;
function foo4() {
	console.log(a);
	let a = 5;
}
foo4();*/

/*const a = 10;
function foo5() {
	console.log(a);
	const a = 5;
}
foo5();*/

/*const a = 10;
function foo6() {
	console.log(a);
	a = 5;
}
foo6();*/

var arr = [1, -1, 2, -2, 3];

arr.filter(function(number) {
  return number > 0;
});

alert(arr);