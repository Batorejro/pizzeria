/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    'use strict';

    const select = {
        templateOf: {
            menuProduct: '#template-menu-product',
            cartProduct: '#template-cart-product',
        },
        containerOf: {
            menu: '#product-list',
            cart: '#cart',
        },
        all: {
            menuProducts: '#product-list > .product',
            menuProductsActive: '#product-list > .product.active',
            formInputs: 'input, select',
        },
        menuProduct: {
            clickable: '.product__header',
            form: '.product__order',
            priceElem: '.product__total-price .price',
            imageWrapper: '.product__images',
            amountWidget: '.widget-amount',
            cartButton: '[href="#add-to-cart"]',
        },
        widgets: {
            amount: {
                input: 'input.amount',
                linkDecrease: 'a[href="#less"]',
                linkIncrease: 'a[href="#more"]',
            },
        },

        cart: {
            productList: '.cart__order-summary',
            toggleTrigger: '.cart__summary',
            totalNumber: `.cart__total-number`,
            totalPrice: '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
            subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
            deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
            form: '.cart__order',
            formSubmit: '.cart__order [type="submit"]',
            phone: '[name="phone"]',
            address: '[name="address"]',
        },
        cartProduct: {
            amountWidget: '.widget-amount',
            price: '.cart__product-price',
            edit: '[href="#edit"]',
            remove: '[href="#remove"]',
        },

    };

    const classNames = {
        menuProduct: {
            wrapperActive: 'active',
            imageVisible: 'active',
        },

        cart: {
            wrapperActive: 'active',
        },

    };

    const settings = {
        amountWidget: {
            defaultValue: 1,
            defaultMin: 1,
            defaultMax: 9,
        },

        cart: {
            defaultDeliveryFee: 20,
        },
        //dodano z modułu
        db: {
            url: '//localhost:3131',
            products: 'products',
            orders: 'orders',
        },

    };

    const templates = {
        menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),

        cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),

    };

    //////// product klassa

    class Product {
        constructor(id, data) {
            const thisProduct = this;

            thisProduct.id = id;
            thisProduct.data = data;

            thisProduct.renderInMenu();
            thisProduct.getElements();
            thisProduct.initAccordion();
            thisProduct.initOrderForm();
            thisProduct.initAmountWidget();
            thisProduct.processOrder();
        }
        renderInMenu() {
            const thisProduct = this;
            // generate HTML based on template
            const generatedHTML = templates.menuProduct(thisProduct.data);
            // create element using utils.createElementFromHTML
            thisProduct.element = utils.createDOMFromHTML(generatedHTML);
            // find menu container
            const menuContainer = document.querySelector(select.containerOf.menu);
            // add element to menu
            menuContainer.appendChild(thisProduct.element);
        }

        getElements() {
            const thisProduct = this;

            thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
            thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
            thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
            thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
            thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
            thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);// nie musi być
            thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
        }
        //////////////////// akordeon
        initAccordion() {
            const thisProduct = this;

            /* find the clickable trigger (the element that should react to clicking) */
            const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
            // console.log(clickableTrigger);

            /* START: add event listener to clickable trigger on event click */
            clickableTrigger.addEventListener('click', function (event) {
                /* prevent default action for event */
                event.preventDefault();

                // /* find active product (product that has active class) */
                const activeProducts = document.querySelectorAll(select.all.menuProductsActive);
                // console.log(activeProducts);

                // /* if there is active product and it's not thisProduct.element, remove class active from it */
                for (let activeProduct of activeProducts) {
                    if (activeProduct != thisProduct.element) {
                        activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
                        activeProduct.classList.remove('active');
                    }
                }

                /* toggle active class on thisProduct.element */
                thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
            });
        }

        initOrderForm() {
            const thisProduct = this;
            //FRAGGMENT KODU ODPOWIEDZIALNY ZA DODANIE LISTENERÓW DO FORMULARZA, BUTTONA I ELEMENTÓW KONTROLEK.
            thisProduct.form.addEventListener('submit', function (event) {
                event.preventDefault();

                thisProduct.processOrder();
            });
            for (let input of thisProduct.formInputs) {
                input.addEventListener('change', function () {
                    thisProduct.processOrder();
                });
            }

            thisProduct.cartButton.addEventListener('click', function (event) {
                event.preventDefault();
                thisProduct.processOrder();
                thisProduct.addToCart();
            });
        }


        //////// process order
        processOrder() {
            const thisProduct = this;

            // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}
            const formData = utils.serializeFormToObject(thisProduct.form);
            // console.log('formData', formData);

            // set price to default price
            let price = thisProduct.data.price;

            // for every category (param)...
            for (let paramId in thisProduct.data.params) {
                // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
                const param = thisProduct.data.params[paramId];

                // for every option in this category
                for (let optionId in param.options) {
                    // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
                    const option = param.options[optionId];
                    // console.log('yes!',optionId, option);
                    const optionSelected = formData[paramId] && formData[paramId].includes(optionId);
                    const imageSelected = '.' + paramId + '-' + optionId;
                    const optionImage = thisProduct.element.querySelector(select.menuProduct.imageWrapper).querySelector(imageSelected);
                    // check if the option is not default
                    if (optionSelected) {
                        if (option.default !== true) {
                            // add option price to price variable
                            price = price + option.price;
                        } else {
                            // check if the option is default
                            if (option.default == true) {
                                // reduce price variable
                                price = price + option.price;
                            }
                        }
                        // update calculated price in the HTML
                        thisProduct.priceSingle = price;
                        // const totalPrice = price * thisProduct.amountWidget.value;
                        thisProduct.priceElem.innerHTML = price;
                    }

                    if (optionImage) {
                        if (optionSelected) {
                            optionImage.classList.add(classNames.menuProduct.imageVisible)
                        } else {
                            optionImage.classList.remove(classNames.menuProduct.imageVisible);
                        }
                    }
                }
            }
        }
        initAmountWidget() {
            const thisProduct = this;

            thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
            thisProduct.amountWidgetElem.addEventListener('updated', () => {
                thisProduct.processOrder();
            });
        }

        ///////////// add cart
        addToCart() {
            const thisProduct = this;

            thisProduct.name = thisProduct.data.name;
            thisProduct.amount = thisProduct.amountWidget.value;
            app.cart.add(thisProduct.prepareCartProduct());


        }

        //////////////////tutaj miałem błąd - było repare a nie prepare
        prepareCartProduct() {
            const thisProduct = this;

            const productSummary = {
                id: thisProduct.id,
                name: thisProduct.data.name,
                amount: thisProduct.amountWidget.value,
                priceSingle: thisProduct.priceSingle,
                price: thisProduct.priceSingle * thisProduct.amountWidget.value,
                params: thisProduct.prepareCartProductParams(),
            };
            return productSummary;
        }


        prepareCartProductParams() {
            const thisProduct = this;

            const formData = utils.serializeFormToObject(thisProduct.form);
            const params = {};

            // for every category
            for (let paramId in thisProduct.data.params) {
                const param = thisProduct.data.params[paramId];

                // create category param in params const eg. params = { ingredients: { name: 'Ingredients', options: {}}}
                params[paramId] = {
                    label: param.label,
                    options: {}
                }

                // for every option in this category
                for (let optionId in param.options) {
                    const option = param.options[optionId];
                    const optionSelected = formData[paramId] && formData[paramId].includes(optionId);

                    if (optionSelected) {
                        params[paramId].options[optionId] = option.label;
                    }
                }
            }

            return params;
        }
    }

    ////////////  widget klassa

    class AmountWidget {
        constructor(element) {
            const thisWidget = this;

            thisWidget.getElements(element);
            thisWidget.setValue(settings.amountWidget.defaultValue);
            thisWidget.initActions();
        }
        getElements(element) {
            const thisWidget = this;

            thisWidget.element = element;
            thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
            thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
            thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
        }

        setValue(value) {
            const thisWidget = this;

            thisWidget.value = settings.amountWidget.defaultValue;

            const newValue = parseInt(value);

            if (thisWidget.value !== newValue && !isNaN(newValue) && settings.amountWidget.defaultMax >= newValue && newValue >= settings.amountWidget.defaultMin) {
                thisWidget.value = newValue;
            } else if (newValue > settings.amountWidget.defaultMax) {
                thisWidget.value = settings.amountWidget.defaultMax;
            } else if (newValue < settings.amountWidget.defaultMin) {
                thisWidget.value = settings.amountWidget.defaultMin;
            }

            thisWidget.input.value = thisWidget.value;
            thisWidget.announce();
        }

        initActions() {
            const thisWidget = this;

            thisWidget.input.addEventListener('change', () => {
                thisWidget.setValue(thisWidget.input.value);
            });
            thisWidget.linkDecrease.addEventListener('click', (event) => {
                event.preventDefault();
                thisWidget.setValue(thisWidget.value - 1);
            });
            thisWidget.linkIncrease.addEventListener('click', (event) => {
                event.preventDefault();
                thisWidget.setValue(thisWidget.value + 1);
            });
        }

        announce() {
            const thisWidget = this;

            const event = new CustomEvent('updated', {
                bubbles: true
            });

            thisWidget.element.dispatchEvent(event);
        }
    }

    ///////////////// cart klassa

    class Cart {
        constructor(element) {
            const thisCart = this;

            thisCart.products = []; ///produkty dodane do koszyka
            thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
            thisCart.getElements(element);
            thisCart.initActions(element);
        }

        getElements(element) {
            const thisCart = this;

            thisCart.dom = {};

            thisCart.dom.wrapper = element;
            thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
            thisCart.dom.productList = document.querySelector(select.cart.productList);
            thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
            thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
            thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
            thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
            thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];//???

            for (let key of thisCart.renderTotalsKeys) {
                thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
            }
            // W metodzie Cart.getElements dodaj właściwość thisCart.dom.form i przypisz jej element znaleziony we wrapperze koszyka za pomocą selektora zapisanego w select.cart.form
            thisCart.dom.form = element.querySelector(select.cart.form);
            console.log(thisCart.dom.form);
            // Zacznij od dodania do metody Cart.getElements właściwości dla inputów na numer telefonu i adres.
            thisCart.dom.phone = element.querySelector(select.cart.phone);
            console.log(thisCart.dom.phone);

            thisCart.dom.address = element.querySelector(select.cart.address);
            console.log(thisCart.dom.address);

        }



        initActions() {
            const thisCart = this;

            thisCart.dom.toggleTrigger.addEventListener('click', () => {
                thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
            });

            thisCart.dom.productList.addEventListener('updated', () => {
                thisCart.update();
            });

            thisCart.dom.productList.addEventListener('remove', (event) => {
                thisCart.remove(event.detail.cartProduct);
            });
            //w metodzie Cart.initActions dodaj event listener dla tego formularza. Nasłuchujemy eventu 'submit' i dodajemy event.preventDefault(), aby wysłanie formularza nie przeładowało strony.
            thisCart.dom.form.addEventListener('submit', function (event) {
                event.preventDefault();
                thisCart.sendOrder();
            });
        }
        sendOrder() {
            const thisCart = this;
            const url = settings.db.url + '/' + settings.db.orders;

            //Następnie w obiekcie payload zapisz ich wartości. Dodaj też wartości zliczane w update, czyli totalNumber, subtotalPrice i totalPrice. Aby dane były kompletne, dodaj też deliveryFee, mimo że jest niezmienne.
            // Obiekt payload musi też zawierać tablicę products, która na razie będzie pusta. 
            const payload = {
                phone: thisCart.dom.phone.value,
                address: thisCart.dom.address.value,
                totalNumber: thisCart.totalNumber,
                subtotalPrice: thisCart.subtotalPrice,
                totalPrice: thisCart.totalPrice,
                deliveryFee: thisCart.deliveryFee,
                products: [],
            };

            //Pod obiektem payload dodaj pętlę iterującą po wszystkich thisCart.products,
            for (let product of thisCart.products) {
                payload.products.push(product.getData());
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),

            };

            fetch(url, options)
                .then(function (response) {
                    return response.json();
                }).then(function (parsedResponse) {
                    console.log('parsedResponse', parsedResponse);
                });
        }

        add(menuProduct) {
            const thisCart = this;

            const generatedHTML = templates.cartProduct(menuProduct);

            const generatedDOM = utils.createDOMFromHTML(generatedHTML);

            thisCart.dom.productList.appendChild(generatedDOM);

            thisCart.products.push(new CartProduct(menuProduct, generatedDOM));

            thisCart.update();
        }
        /*
    update() {
        const thisCart = this;

        const deliveryFee = settings.cart.defaultDeliveryFee;

        let totalNumber = 0;
        let subtotalPrice = 0;

        for (let product of thisCart.products) {

            totalNumber += product.amount;
            // console.log('totalNumber: ',totalNumber);

            subtotalPrice += product.price;
            // console.log('subtotalPrice: ',subtotalPrice);
        }

        thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
        thisCart.dom.totalNumber.innerHTML = totalNumber;

        thisCart.totalPrice = 0;

        if (subtotalPrice !== 0) {

            for (let totalPrice of thisCart.dom.totalPrice) {
                totalPrice.innerHTML = subtotalPrice + deliveryFee;
            }
            thisCart.dom.deliveryFee.innerHTML = deliveryFee;

        } else if (subtotalPrice == 0) {

            for (let totalPrice of thisCart.dom.totalPrice) {
                totalPrice.innerHTML = 0;
            }
            thisCart.dom.deliveryFee.innerHTML = 0;
        }

        console.log('thisCart.totalPrice: ', thisCart.dom.totalPrice);
    }

    remove(thisCartProduct) {
        const thisCart = this;

        thisCartProduct.dom.wrapper.remove();

        const indexOfThisCartProduct = thisCart.products.indexOf(thisCartProduct);

        thisCart.products.splice(indexOfThisCartProduct, 1);

        thisCart.update();

        console.log('thisCart.products:', thisCart.products);
    }

} 
    */
        update() {
            const thisCart = this;
            thisCart.totalNumber = 0;
            thisCart.subtotalPrice = 0;

            // pętla for...of, iterującej po thisCart.products. 
            for (let product of thisCart.products) {
                thisCart.subtotalPrice += product.price;
                thisCart.totalNumber += product.amount;
            }
            // p zakończeniu pętli zapisz kolejną właściwość koszyka – thisCart.totalPrice – iiiii
            thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;


            for (let key of thisCart.renderTotalsKeys) {
                for (let elem of thisCart.dom[key]) {
                    elem.innerHTML = thisCart[key];
                }
            }

        }

        remove(cartProduct) {
            const thisCart = this;

            //zadeklarować stałą index, której wartością będzie indeks cartProduct w tablicy thisCart.products,
            const index = thisCart.products.indexOf(cartProduct);

            // użyć metody splice do usunięcia elementu o tym indeksie z tablicy thisCart.products,
            thisCart.products.splice(index);

            // usunąć z DOM element cartProduct.dom.wrapper,
            cartProduct.dom.wrapper.remove();

            //wywołać metodę update w celu przeliczenia sum po usunięciu produktu.
            thisCart.update();

        }


    }


    /////////////////  cart product klassa

    class CartProduct {
        constructor(menuProduct, element) {
            const thisCartProduct = this;

            thisCartProduct.id = menuProduct.id;
            thisCartProduct.name = menuProduct.name;
            thisCartProduct.amount = menuProduct.amount;
            thisCartProduct.priceSingle = menuProduct.priceSingle;
            thisCartProduct.price = menuProduct.price;



            thisCartProduct.getElements(element);
            thisCartProduct.initAmountWidget();
            thisCartProduct.initActions();

            // console.log(thisCartProduct);
        }

        getElements(element) {
            const thisCartProduct = this;

            thisCartProduct.dom = {};

            thisCartProduct.dom.wrapper = element;
            thisCartProduct.dom.amountWidget = element.querySelector(select.cartProduct.amountWidget);
            thisCartProduct.dom.price = element.querySelector(select.cartProduct.price);
            thisCartProduct.dom.edit = element.querySelector(select.cartProduct.edit);
            thisCartProduct.dom.remove = element.querySelector(select.cartProduct.remove);

        }

        initAmountWidget() {
            const thisCartProduct = this;

            thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);

            thisCartProduct.dom.amountWidget.addEventListener('updated', () => {
                thisCartProduct.amount = thisCartProduct.amountWidget.value;
                thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amountWidget.value;
                thisCartProduct.dom.price.innerHTML = thisCartProduct.price;

            });
        }

        remove() {
            const thisCartProduct = this;

            const event = new CustomEvent('remove', {
                bubbles: true,
                detail: {
                    cartProduct: thisCartProduct,
                },
            });

            thisCartProduct.dom.wrapper.dispatchEvent(event);
        }

        initActions() {
            const thisCartProduct = this;

            thisCartProduct.dom.edit.addEventListener('click', (event) => {
                event.preventDefault();
            });

            thisCartProduct.dom.remove.addEventListener('click', (event) => {
                event.preventDefault();

                thisCartProduct.remove();
            });
        }
        //metoda get data
        getData() {
            const thisCartProduct = this;

            const orderedProductData = {
                id: thisCartProduct.id,
                amount: thisCartProduct.amount,
                price: thisCartProduct.price,
                priceSingle: thisCartProduct.priceSingle,
                params: thisCartProduct.params
            };

            return orderedProductData;

        }
    }

    ///////////////////. aplikacja

    const app = {
        initMenu() {
            const thisApp = this;
            // console.log('thisApp.data:',thisApp.data);
            for (let productData in thisApp.data.products) {
                new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
            }
        },

        initData: function () {
            const thisApp = this;
            thisApp.data = {};
            const url = settings.db.url + '/' + settings.db.products;

            fetch(url)
                //funkcja, która uruchomi się wtedy, gdy request się zakończy, a serwer zwróci odpowiedź.
                .then(function (rawResponse) {
                    return rawResponse.json();
                })
                //po otrzymaniu skonwertowanej odpowiedzi parsedResponse, wyświetlamy ją w konsoli.
                .then(function (parsedResponse) {
                    console.log('parsedResponse', parsedResponse);

                    /* save parsedResponse as thisApp.data.products */
                    thisApp.data.products = parsedResponse;

                    /*execute initMenu method */
                    thisApp.initMenu();

                });

            console.log('thisApp.data', JSON.stringify(thisApp.data));
        },


        initCart: function () {
            const thisApp = this;

            const cartElem = document.querySelector(select.containerOf.cart);
            thisApp.cart = new Cart(cartElem);

        },

        init: function () {
            const thisApp = this;

            console.log('*** App starting ***');
            console.log('thisApp:', thisApp);
            console.log('classNames:', classNames);
            console.log('settings:', settings);
            console.log('templates:', templates);

            thisApp.initData();
            thisApp.initMenu();
            thisApp.initCart();
        },
    };
    app.init();
}