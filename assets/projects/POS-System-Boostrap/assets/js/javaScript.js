$('#customerForm').css('display','none');
$('#itemForm').css('display','none');
$('#orderForm').css('display','none');

$('#btnDash').click(function (){
    $('#homediv').css('display','block');
    $('#customerForm').css('display','none');
    $('#itemForm').css('display','none');
    $('#orderForm').css('display','none');
});

$('#btnCustomer').click(function (){
    $('#homediv').css('display','none');
    $('#customerForm').css('display','block');
    $('#itemForm').css('display','none');
    $('#orderForm').css('display','none');
});

$('#btnItem').click(function (){
    $('#homediv').css('display','none');
    $('#customerForm').css('display','none');
    $('#itemForm').css('display','block');
    $('#orderForm').css('display','none');
});

$('#btnOrder').click(function (){
    $('#homediv').css('display','none');
    $('#customerForm').css('display','none');
    $('#itemForm').css('display','none');
    $('#orderForm').css('display','block');
});

$(document).on('keydown', function(event) {
    if (event.keyCode == 9) {
        event.preventDefault();
    }
});

// $('#cusID').on('onkeyup',function (){
//     var cusid = $('#cusID').val();
//     var cusidPattern = /^C\d{3}$/;
//     var errorMessage = $('.errorMessageId');
//
//     if (!cusidPattern.test(cusid)) {
//         errorMessage.show();
//         $('#cusID').css({'border': '2px solid red'});
//     } else {
//         errorMessage.hide();
//         $('#cusID').css({'border': '2px solid green'});
//     }
// });

$('#cusName').on('onkeyup',function (){
    var cusName = $('#cusName').val();
    var cusNamePattern = /^\s*\S.{3,18}\S\s*$/;
    var errorMessageName=$('.errorMessageName');

    if (!cusNamePattern.test(cusName)) {
        errorMessageName.show();
        $('#cusName').css({'border': '2px solid red'});
    } else {
        errorMessageName.hide();
        $('#cusName').css({'border': '2px solid green'});
    }
});


$('#cusAddress').on('onclick',function (){
    var cusAddress = $('#cusAddress').val();
    var cusAddressPattern = /^.{7,}$/;
    var errorMessageAddress = $('.errorMessageAddress');

    if (!cusAddressPattern.test(cusAddress)) {
        errorMessageAddress.show();
        $('#cusAddress').css('border', '2px solid red');
    } else {
        errorMessageAddress.hide();
        $('#cusAddress').css('border', '2px solid green');
    }
});

$('#cusSalary').on('onclick' , function (){
    var cusSalary = $('#cusSalary').val();
    var cusSalaryPattern = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageSalary = $('.errorMessageSalary');

    if (!cusSalaryPattern.test(cusSalary)) {
        errorMessageSalary.show();
        $('#cusSalary').css('border', '2px solid red');
    } else {
        errorMessageSalary.hide();
        $('#cusSalary').css('border', '2px solid green');
    }
});

$('#itemId').on('onclick' , function (){
    var itemId = $('#itemId').val();
    var itemIdPattern = /^I\d{3}$/;
    var errorMessageItemId = $('.errorMessageItemId');

    if (!itemIdPattern.test(itemId)) {
        errorMessageItemId.show();
        $('#itemId').css('border', '2px solid red');
    } else {
        errorMessageItemId.hide();
        $('#itemId').css('border', '2px solid green');
    }
});

$('#ItemName').on('onclick' , function (){
    var itemName = $('#ItemName').val();
    var ItemNamePattern = /^\s*\S.{3,18}\S\s*$/;
    var errorMessageItemName = $('.errorMessageItemName');

    if (!ItemNamePattern.test(itemName)) {
        errorMessageItemName.show();
        $('#ItemName').css('border', '2px solid red');
    } else {
        errorMessageItemName.hide();
        $('#ItemName').css('border', '2px solid green');
    }
});

$('#itemQty').on('onclick' , function (){
    var itemQty = $('#itemQty').val();
    var itemQtyPattern = /^\d+$/;
    var errorMessageItemQty = $('.errorMessageItemQty');

    if (!itemQtyPattern.test(itemQty)) {
        errorMessageItemQty.show();
        $('#itemQty').css('border', '2px solid red');
    } else {
        errorMessageItemQty.hide();
        $('#itemQty').css('border', '2px solid green');
    }
});

$('#unitPrice').on('onclick' , function (){
    var itemPrice = $('#unitPrice').val();
    var ItemPricePattern  = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageItemPrice = $('.errorMessageItemPrice');

    if (!ItemPricePattern.test(itemPrice)) {
        errorMessageItemPrice.show();
        $('#unitPrice').css('border', '2px solid red');
    } else {
        errorMessageItemPrice.hide();
        $('#unitPrice').css('border', '2px solid green');
    }
});