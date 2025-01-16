/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: "#template-menu-product",
      cartProduct: '#template-cart-product', // CODE ADDED
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select'
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
        input: 'input.amount', // CODE CHANGED
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
    // CODE ADDED START
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
  // CODE ADDED END
  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },// CODE ADDED START

    cart: {
      wrapperActive: 'active',
    },// CODE ADDED END

  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 10,
    }, // CODE CHANGED

    // CODE ADDED START
    cart: {
      defaultDeliveryFee: 20,
    },
    // CODE ADDED END
  };


  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
    cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),//dodano karty
  };
  ////////////////////////////////////////////////////////////////
  class Product {
    constructor(id, data) {
      const thisProduct = this;

      thisProduct.id = id;
      thisProduct.data = data;

      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.initAmountWidget();//widget
      thisProduct.processOrder();

      console.log('new Product:', thisProduct);
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
      thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);//widget
    }

    initAccordion() {
      const thisProduct = this;

      /* find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      console.log(clickableTrigger);

      /* START: add event listener to clickable trigger on event click */
      thisProduct.accordionTrigger.addEventListener('click', function (event) {
        /* prevent default action for event */
        event.preventDefault();

        /* find active product (product that has active class) */
        const activeProducts = document.querySelectorAll(select.all.menuProductsActive);

        /* if there is active product and it's not thisProduct.element, remove class active from it */
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
      console.log('initOrderForm');

      //dodanie listenerów do formularza, buttona i kontrolek formularzation;)

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
    ///////// Widget

    ////////// Karty produktów




    ////////////////////////////////PROCESS ORDER
    processOrder() {
      const thisProduct = this;
      console.log('processOrder');

      // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}

      const formData = utils.serializeFormToObject(thisProduct.form);

      // console.log('formData', formData);

      thisProduct.params = {};
      // set price to default price
      let price = thisProduct.data.price;

      // pętla dla kategorii
      for (let paramId in thisProduct.data.params) {
        // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }

        const param = thisProduct.data.params[paramId];

        // petla opcji kategorii
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
      thisProduct.amountWidgetElem.addEventListener('updated', function () {
        thisProduct.processOrder();
      });
    }
    ////////// Karty produktów
    addToCart() {
      const thisProduct = this;

      thisProduct.name = thisProduct.data.name;
      thisProduct.amount = thisProduct.amountWidget.value;

      app.cart.add(thisProduct);
    }
  }


  /////////////////////////////////////////// WIDGET CLASSA
  class AmountWidget {
    constructor(element) {
      const thisWidget = this;

      thisWidget.getElements(element);
      thisWidget.input.value = settings.amountWidget.defaultValue;
      // console.log(thisWidget.value);

      thisWidget.setValue(thisWidget.input.value);
      thisWidget.initActions();

      // console.log('AmountWidget:', thisWidget);
      // console.log('constructor arguments:', element);
    }
    getElements(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
      thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
      thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
    }

    /////// SET VALUE WIDGETOWE
    setValue(value) { // ustawianie nowej wartości widgetu
      const thisWidget = this;

      const newValue = parseInt(value);

      ////////// TO DO VALIDATION SET


      if (newValue != thisWidget.value && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
        // console.log(newValue);
        // console.log(thisWidget.value);
        thisWidget.value = newValue;
        thisWidget.announce();
      }

      thisWidget.input.value = thisWidget.value;
    }
    ////////////////////////////////INIT WIDGETOWY
    initActions() {
      const thisWidget = this;

      thisWidget.input.addEventListener('change', function () {
        thisWidget.setValue(thisWidget.input.value);
      });

      thisWidget.linkDecrease.addEventListener('click', function (event) {
        event.preventDefault();
        const valueDecreased = thisWidget.value - 1;
        thisWidget.setValue(valueDecreased);
      });

      thisWidget.linkIncrease.addEventListener('click', function (event) {
        event.preventDefault();
        const valueIncreased = thisWidget.value + 1;
        thisWidget.setValue(valueIncreased);
      });
    }
    //////////////////////////ANNOUNCE WIDGETOWE
    announce() {
      const thisWidget = this;

      const event = new CustomEvent('updated', {
        bubbles: true
      });

      thisWidget.element.dispatchEvent(event);
    }

  }


  /* pokazywanie i ukrywanie koszyka; dodawanie/usuwanie produktów; podliczanie ceny zamówienia */
  class Cart {
    constructor(element) {
      const thisCart = this;

      thisCart.products = []; //  przechowuje produkty dodane do koszyka

      thisCart.deliveryFee = settings.cart.defaultDeliveryFee;

      thisCart.getElements(element);
      thisCart.initActions(element);

      console.log('new Cart', thisCart);
    }

    getElements(element) {
      const thisCart = this;

      thisCart.dom = {}; // przechowujemy tutaj wszystkie elementy DOM, wyszukane w komponencie koszyka. Ułatwi nam to ich nazewnictwo, ponieważ zamiast np. thisCart.amountElem będziemy mieli thisCart.dom.amount

      thisCart.dom.wrapper = element;
      thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
      //thisCart.dom.toggleTrigger.classList.toggle(classNames.cart.wrapperActive);

      // 9.3 - 4.Pamiętamy o zdefiniowaniu thisCart.dom.productList w metodzie getElements.
      thisCart.dom.productList = element.querySelector(select.cart.productList);

      //W metodzie getElements dodaj ten kod:
      thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];

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

    initActions(element) {
      const thisCart = this;

      thisCart.dom.toggleTrigger.addEventListener('click', function () {
        element.classList.toggle(classNames.cart.wrapperActive);
      });
      // Dzięki temu możemy teraz w metodzie Cart.initActions dodać taki kod:
      thisCart.dom.productList.addEventListener('updated', function () {
        thisCart.update();
      });

      thisCart.dom.productList.addEventListener('remove', function () {
        thisCart.remove(event.detail.cartProduct);
      });
      //Następnie w metodzie Cart.initActions dodaj event listener dla tego formularza. Nasłuchujemy eventu 'submit' i dodajemy event.preventDefault(), aby wysłanie formularza nie przeładowało strony.
      thisCart.dom.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisCart.sendOrder();
      });
    }
  }



  const app = {
    initMenu: function () {
      const thisApp = this;
      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
        console.log('thisApp.data:', thisApp.data);
      }

    },

    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },
    initCart() {
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
  ////////////////////////////////////////////////////////////////////////////////////////////////
  app.init();

}
