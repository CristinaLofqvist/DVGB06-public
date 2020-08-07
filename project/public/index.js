const basketEl = document.getElementById("basket"); /* Shopingcart in DOM*/
const smallBasketEl = document.getElementById("small-basket"); /*small cart with only quantity and sum*/
const checkoutEl = document.getElementById("checkout"); /*checkout*/
const checkoutInlineEl = document.getElementsByClassName("checkout-inline");
const checkoutButtonEl = document.getElementsByClassName("checkout-button"); /*checkout*/
const itemsInBasketEl = document.getElementsByClassName("items-in-basket"); /*quantity of items in basket*/
const totalSumEl = document.getElementsByClassName("total-sum"); /*total sum*/
const notifyEl = document.getElementById("notify"); /*message when item added to basket*/

window.addEventListener("load", showBasket, false);         /*show basket*/
window.addEventListener("load", showSmallBasket, false);    /*show small basket*/
window.addEventListener("load", showCheckout, false);       /* go to checkout*/

/*Show shoping cart*/
function showBasket() {
    /*scan shoping cart*/
    var basketItems = JSON.parse(localStorage.getItem("basket"));
    if (basketItems == null) { basketItems = []; }
    /*show inline element*/
    if (basketItems.length > 0) {
        if (document.getElementsByClassName("checkout-inline")) {
            for (var i = 0; i < checkoutInlineEl.length; i++) {
                checkoutInlineEl[i].style.display = "inline";
            }
        }
    }
    var sum = 0;
    var num0fItems = 0;
    /*Print of total sum*/
    if (basketItems.length > 0) {
        /*Loop through items*/
        for (var i = 0; i < basketItems.length; i++) {
            /*count the cost and add sum*/
            var itemCost = parseInt(basketItems[i].artCost);

            /*Multiple items of samt type - add cost * quantity*/
            if (basketItems[i].nums > 1) {
                var count = parseInt(basketItems[i].nums);
                for (var j = 0; j < count; j++) {
                    sum += itemCost;
                    num0fItems++;
                }
            } else {
                /*hide show cart button*/
                if (document.getElementsByClassName("checkout-button")) {
                    for (var i = 0; i < checkoutButtonEl.length; i++) {
                        checkoutButtonEl[i].style.display = "none";
                    }
                }
            }
            /*show quantity*/
            if (document.getElementsByClassName("items-in-basket")) {
                for (var i = 0; i < itemsInBasketEl.length; i++) {
                    itemsInBasketEl[i].inerHTML = numOfItems;
                }
            }
            /*Show total sum*/
            if (document.getElementsByClassName("total-sum")) {
                for (var i = 0; i < totalSumEl.length; i++) {
                    totalSumEl[i].innerHTML = sum + ":-";
                }
            }
            if (document.getElementById("basket")) {

                /*reset*/
                basketEl.innerHTML = "";
                if (basketItems.length > 0) {
                    var sum = 0;
                    var numOfItems = 0;
                    /* loop through items*/
                    for (var i = 0; i < basketItems.length; i++) {
                        /* count cost and add to sum*/
                        var itemCost = parseInt(basketItems[i].artCost);
                        /*multiple items of the same type- add cost * quantity*/
                        if (basketItems[i].nums > 1) {
                            var count = parseInt(basketItems[i].nums);
                            for (var j = 0; j < count; j++) {
                                sum += itemCost;
                                numOfItems++;
                            }
                        } else {
                            sum += itemCost;
                            numOfItems++;
                        }
                        /*create new element*/
                        var newItem = document.createElement("li");

                        /*item name*/
                        var newItemName = document.createElement("span");
                        newItemName.className = "item-text";
                        var newItemNameText = document.createTextNode(basketItems[i].artName + ", ");
                        newItemName.appendChild(newItemNameText);
                        newItem.appendChild(newItemName);

                        /*quantity*/
                        var newItemCount = document.createElement("span");
                        newItemCount.className = "item-count";
                        var newItemCountText = document.createTextNode(basketItems[i].nums + " st ");
                        newItemCount.appendChild(newItemCountText);
                        newItem.appendChild(newItemCountText);
                        newItem.appendChild(newItemCount);

                        /*item price*/
                        var newItemCost = document.createElement("span");
                        newItemCost.className = "item-cost";
                        var newItemCostText = document.createElement("span");
                        var newItemCostText = document.createTextNode(itemCost + ":-");
                        newItemCost.appendChild(newItemCostText);
                        newItem.appendChild(newItemCost);

                        /*Add to DOM*/
                        basketEl.appendChild(newItem);

                        /*show checkout -button*/
                        if (document.getElementsByClassName("checkout-button")) {
                            for (var i = 0; i < checkoutButtonEl.lenth; i++) {
                                checkoutButtonEl[i].style.display = "block";
                            }
                        } else {
                            /*Empty in list*/
                            createElementbasket.innerHTML = "<li>Varukorgen är tom</li>";

                            /*Hide show checkout button*/
                            if (document.getElementsByClassName("checkout-button")) {
                                for (var i = 0; i < checkoutButtonEl.length; i++) {
                                    checkoutButtonEl[i].style.display = "none";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/*Smal basket*/
function showSmallBasket() {
    if (document.getElementById("small-basket")) {
        var basketItems = JSON.parse(localStorage.getItem("basket"));
        if (basketItems == null) { basketItems = []; }
        if (basketItems.length > 0) {
            /*cout total sum*/
            var sum = 0;
            var numOfItems = 0;
            /*Loop through items*/
            for (var i = 0; i < basketItems.length; i++) {
                /*count cost and add sum*/
                var itemCost = parseInt(basketItems[i].artCost);
                /*Several items of the same type add cost * quantity*/
                if (basketItems[i].nums > 1) {
                    var count = parseInt(basketItems[i].nums);
                    for (var j = 0; j < count; j++) {
                        sum += itemCost;
                        numOfItems++;
                    }
                } else {
                    sum += itemCost;
                    numOfItems++;
                }
            }
            smallBasketEl.innerHTML = numOfItems + "st, " + sum + ":-";

            /*show quantity*/
            if (document.getElementsByClassName("items-in-basket")) {
                for (var i = 0; i < itemsInBasketEl.length; i++) {
                    itemsInBasketEl[i].innerHTML = numOfItems;
                }
            }
        } else {
            smallBasketEl.innerHTML = "";
        }
    }
}

/*show checkout*/
function showCheckout() {
    if (document.getElementById("checkout")) {
        var basketItems = JSON.parse(localStorage.getItem("basket"));
        if (basketItems == null) { basketItems = []; }

        /*reset*/
        checkoutEl.innerHTML = "";
        if (basketItems.length > 0) {
            /*count total sum*/
            var sum = 0;
            /*loop through items*/
            for (var i = 0; i < basketItems.length; i++) {
                /*count total cost and ad sum*/
                var itemCost = parseInt(basketItems[i].artCost);
                var itemSumCost = 0;

                /*Several items of the same type-add cost * quantity */
                if (basketItems[i].nums > 1) {
                    var count = parseInt(basketItems[i].nums);
                    for (var j = 0; j < count; j++) {
                        sum += itemCost;
                        itemSumCost += itemCost;
                    }
                } else {
                    sum += itemCost;
                    itemSumCost = itemCost;
                }
                var artId = basketItems[i].artId;
                var artName = basketItems[i].artname;
                var numItems = basketitems[i].nums;
                var artImage = basketItems[i].artImage;

                /*create new element*/
                checkoutEl.innerHTML += "<tr>" +
                    "<td><img src='" + artImage + "' alt='Produktbild för " + artName + "' />" +
                    "<td>" + artId + "</td>" +
                    "<td>" + artName + "</td>" +
                    "<td>" + numItems + " st.</td>" +
                    "<td>" + itemSumCost + ":-</td>" +
                    "</tr>";
            }

            /* ad sum last*/
            checkoutEl.innerHTML += "<tr>" +
                "<td colspan='5' class='checkout-sum'>Summa: " + sum + ":-</td>";
        } else {
            /*empty list*/
            checkoutEl.innerHTML = "<tr><td colspan='5'>Varukorgen är tom</td></tr>";
        }
    }
}

/*to checkout*/
function checkoutBasket() {
    var basketItems = JSON.parse(localStorage.getItem("basket"));
    if (basketitems != null) {
        var itemCount = 0;
        var totalSum = 0;
        for (var i = 0; i < basketItems.length; i++) {
            var count = parseInt(basketItems[i].nums);
            for (var j = 0; j < count; j++) {
                totalSum += parseInt(basketItems[i].artCost);
                itemCount++;
            }
        }
        if (itemCount == 1) {
            alert("Din order är mottagen! En vara - totalsumma: " + totalSum + ":-");
        } else {
            alert("Din order är mottagen! " + itemCount + " stycken varor - totalumma; " + totalSum + ":-");
        }
        /*empty shopingcart*/
        emptyBasket(false);
    } else {
        alert("Det finns inga varor i din varukorg");
    }

}
/*Add to basket*/
function addToBasket(el, id, name, cost, image, notify = false) {
    /*start at one item*/
    var numOfItems = 1;
    /*Puts class on cal to class*/
    el.classList.add("clicked");
    /*Scan the list*/
    var currentBasket = JSON.parse(localStorage.getItem("basket"));
    if (currentBasket == null) { currentBasket = []; }
    /*Check if item already exists*/
    for (var i = 0; i < currentBasket.length; i++) {
        if (id == currentBasket[i].artId) {
            numOfItems = currentBasket[i].nums + 1;
            currentBasket.splice(i, 1);
        }
    }
    /*Add*/
    currentBasket.push({ artId: id, artName: name, artCost: cost, artImage: image, nums: numOfItems });
    /*Convert to JSON*/
    var jsonStr = JSON.stringify(currentBasket);
    /*Store*/
    localStorage.setItem("basket", jsonStr);

    /*convey user about notify = true*/
    if (notify == true) {
        var timer = null;
        if (document.getElementById("notify")) {
            var notifyText = "<p>Varan <b>" + name + "</b> lagd i varukorgen</p>";
            /*add class to show*/
            notifyEL.classList.add("visible");
            notifyEl.innerHTML = notyfyText;
            /*create a timer*/
            windowclearTimeout(timer);
            timer = window.setTimeout(function () {
                /*put class to show*/
                notifyEl.classList.remove("visible");
            }, 3000);
        }
    }
    /*Update DOM*/
    showBasket();
    showSmallBasket();
    showCheckout();
}



/*empty shopingcart*/
function emptyBasket(conf) {
    if (conf == true) {
        if (confirm("Är du säker att du vill radera alla varor?")) {
            localStorage.removeitem("basket");
            showBasket();
            showSmallBasket();
            showCheckout();
        } else {
            return;
        }
    } else {
        localStorage.removeItem("basket");
        showBasket();
        showSmallBasket();
        showCheckout();
    }
}