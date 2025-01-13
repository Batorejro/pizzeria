import { select, templates, classNames } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
initAccordion() {
    /* find the clickable trigger (the element that should react to clicking) */
    const clickedMenuProduct = this.element.querySelector(select.menuProduct.clickable);

    /* add click event listener with handler related to active class toggle */
    clickedMenuProduct.addEventListener('click', (e) => {
        e.preventDefault();
        /* toggle active class on element of thisProduct */
        this.element.classList.toggle('active');
        /* find all active products */
        const allActiveProducts = document.querySelectorAll(select.all.menuProductsActive);
        /* for each active product
        if the active product isn't the element of thisProduct
        remove class active for the active product*/
        allActiveProducts.forEach(product => {
            if (product !== this.element) {
                product.classList.remove('active');
            }
        });
    });
}
initAccordion(){
    const thisProduct = this;

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
            }
        }

        /* toggle active class on thisProduct.element */
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
    });

}