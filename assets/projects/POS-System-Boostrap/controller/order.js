import orderDetailsModel from "/model/orderDetailsModel.js";
import {customer} from "/db/db.js";
import {items} from "/db/db.js";
import {order} from "/db/db.js";
import {orderDetails} from "/db/db.js";
import orderModel from "/model/orderModel.js";

let selectedCustomerId;
let selectedItemId;
let itemName;
let itemPrice;
let itemQty;
let orderQty;

var allTotal=0;

$('#orderId').val(generateOrderId());

function loadCart() {

    $(".tbody> tr" ).detach();

    for (var tc of order){
        var row="<tr><td>"+tc.itemcode+"</td><td>"+tc.itemname+"</td><td>"+tc.itemprice+"</td><td>"+tc.qty+"</td><td>"+tc.total+"</td></tr>";
        $('#orderFormTableBody').append(row);
    }
}
$("#btnPurchase").on('click', () => {

    let alertConfrim = confirm('Do you really want to Purchase this item');
    if (alertConfrim==true) {

        var orderId = $('#orderId').val();
        var orderDate = $('#date').val();
        var cusIdOption = $('#orderFormCstId').val();
        var itemIdOption = $('#orderFormItemName').val();
        var orderQty = $('#orderQty').val();
        var total = $('#total').val();
        var txtCash = $('#txtCash').val();
        var txtDiscount = $('#txtDiscount').val();

        let orderDetailObj=new orderDetailsModel(
            orderId,orderDate,cusIdOption,itemIdOption,orderQty,total,txtCash,txtDiscount
        );

        orderDetails.push(orderDetailObj);

        $('#orderId').val(generateOrderId());
        $('#date').val('');
        $('#orderFormCstId').val('');
        $('#orderFormItemName').val('');
        $('#orderQty').val('');
        $('#total').val('');
        $('#txtCash').val('');
        $('#txtDiscount').val('');


        order.splice(0, order.length);
        loadCart();

        startProgress();
        $(".tbody").clear();
    }

    console.log(customer);

});
function startProgress() {
    var progressBar = document.getElementById('progressBarOrder');
    var width = 0;
    var interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(function() {
                // After 15 seconds, reset the progress bar if needed
                progressBar.style.width = '0%';
            }, 1500);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 5);
}

function generateCurrentDate(){
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
}

function loadAllCustomerId() {
    $('#orderFormCstId').empty();
    for (let customerArElement of customer) {
        $('#cusIdOption').append(`<option>${customerArElement.id}</option>`);
    }
}

function loadAllItemsId() {
    $('#orderFormItemId').empty();
    for (let itemArElement of items) {
        $('#itemIdOption').append(`<option>${itemArElement.id}</option>`);
    }
}

loadAllItemsId();
loadAllCustomerId();
generateCurrentDate();

$('#orderFormCstId').on('change', function(){
    selectedCustomerId = $('#cusIdOption option:selected').text();
    for (let customerArElement of customer) {
        if (customerArElement.id==selectedCustomerId){
            $('#orderFormItemName').val(customerArElement.name);
            $('#orderFormCusSalary').val(customerArElement.salary);
            $('#orderFormCusAddress').val(customerArElement.address);
            $('#orderFormItemId').focus();
        }
    }
});

$(document).on('change', '#orderFormItemId', function() {
    selectedItemId = $('#orderFormItemId option:selected').text();
    for (let itemArElement of items) {
        if (itemArElement.id == selectedItemId) {
            itemName = itemArElement.name;
            itemPrice = itemArElement.price;
            itemQty = itemArElement.qty;

            $('#orderFormItemName').val(itemName);
            $('#orderFormPrice').val(itemPrice);
            $('#orderFormQty').val(itemQty);
            $('#orderQty').focus();
        }
    }
});



function calTotal(itemPrice, orderQty) {
    let price=parseInt(itemPrice);
    let qty=parseFloat(orderQty);
    let total=price*qty;

    return total;
}

$(".btnAddItem").on('click', () => {
    orderQty = $('#orderQty').val();
    var itemPrice=$('#orderFormPrice').val();
    var CalTotal=calTotal(itemPrice,orderQty);
    var itemCode=$('#orderFormItemId').val();
    var itemName=$('#orderFormItemName').val();

    allTotal+=CalTotal;
    order.pop();
    let orderObj = new orderModel(itemCode,itemName,itemPrice,orderQty,CalTotal);
    order.push(orderObj);

    loadCart();

    calTotalAllItem();
    updateQty();
    // loadAllItemsId();
});

// function updateQty(){
//     var orderFormQtyOnHand=$('#orderFormQty').val();
//     var updateQty=orderFormQtyOnHand-orderQty;
//
//     let selectedItemIndex = items.findIndex(item => item.id === selectedItemId);
//     if (selectedItemIndex !== -1) {
//         items[selectedItemIndex].qty = updateQty;
//         $('#orderFormQty').val(updateQty);
//     }
// }
function calTotalAllItem(){
    var totalAllItems = 0;
    order.forEach(item => {
        totalAllItems += item.total;
    });

    $('#total').val(totalAllItems);
    $('#subTotal').val(totalAllItems);
}

function generateOrderId() {
    let lastId = 'O001';

    if (order.length > 0) {
        let lastElement = order[order.length - 1];

        if (lastElement && lastElement.orderId) {
            let lastIdParts = lastElement.orderId.split('-');
            let lastNumber = parseInt(lastIdParts[1]);

            lastId = `O00-${String(lastNumber + 1).padStart(3, '0')}`;
        }
    }

    return lastId;
}

$("#orderQty").on('keyup', () => {
    var orderFormQtyOnHand=parseInt($('#orderFormQty').val());
    var orderQty =parseInt($('#orderQty').val());
    var itemQtyPattern = /^\d+$/;
    var errorMessageQty = $('.errorOrderQty');
    var errorQty = $('.errorQty');


    if (!itemQtyPattern.test(orderQty)) {
        errorQty.show();
        $('#orderQty').css('border', '2px solid red');
    } else {
        errorQty.hide();
        $('#orderQty').css('border', '2px solid green');
    }

    if (orderQty>orderFormQtyOnHand){
        $('#orderQtyValue').text(orderFormQtyOnHand);
        errorMessageQty.show();
    }else {
        errorMessageQty.hide();
    }
});

function updateQty() {
    var orderFormQtyOnHand = $('#orderFormQty').val();
    var orderQty = $('#orderQty').val();
    var updateQty = orderFormQtyOnHand - orderQty;



    let selectedItemIndex = items.findIndex(item => item.id === selectedItemId);

    console.log(selectedItemIndex)

    if (selectedItemIndex !== -1) {
        items[selectedItemIndex].qty = updateQty;
        $('#orderFormQty').val('cdd');
        console.log("Quantity updated successfully");
    } else {
        console.log("Selected item not found");
    }
}



// $('#txtCash').on('keyup', function () {
//     var cash = $(this).val();
//     var cashPattern = /^\d+(\.\d{1,2})?$/;
//     var errorMessage = $('.errorMessageCash');
//
//     if (!cashPattern.test(cash)) {
//         errorMessage.show();
//         $(this).css({ 'border': '2px solid red' });
//     } else {
//         errorMessage.hide();
//         $(this).css({ 'border': '2px solid green' });
//     }
// });

$('#txtCash').on('keyup',() => {
    let cashVal =parseInt( $('#txtCash').val());
    let subTotal =parseInt( $('#subTotal').val());
    var cashError=$('#cashError');

    $('#txtBalance').val(subTotal-cashVal);

    if (cashVal<subTotal){
        cashError.show();
    }else {
        cashError.hide();
    }

});

$('#txtDiscount').on('input', () => {
    calculatePaymentDetails();
});

function clearData(){
    $("#itemId").val('');
    $("#ItemName").val('');
    $("#itemQty").val('');
    $("#unitPrice").val('');
    $("#total").val('');
}
function calculatePaymentDetails() {
    const totalElement = document.getElementById('total');
    const subTotalElement = document.getElementById('subTotal');
    const cashElement = document.getElementById('txtCash');
    const discountElement = document.getElementById('txtDiscount');
    const balanceElement = document.getElementById('txtBalance');
    const cashErrorElement = document.getElementById('cashError');

    let total = parseFloat(totalElement.value) || 0;
    let cash = parseFloat(cashElement.value) || 0;
    let discountPercent = parseFloat(discountElement.value) || 0;

    let discount = (total * discountPercent) / 100;
    let subTotal = total - discount;
    subTotalElement.value = subTotal.toFixed(2);

    let balance = cash - subTotal;
    balanceElement.value = balance.toFixed(2);

    if (balance < 0) {
        cashErrorElement.style.display = 'block';
    } else {
        cashErrorElement.style.display = 'none';
    }
}