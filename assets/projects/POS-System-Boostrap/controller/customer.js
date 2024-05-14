import customerModel from "../model/customerModel.js";
import {customer} from "../db/db.js";

let selectedCustomerId;
let selectedItemId;
let itemName;
let itemPrice;
let itemQty;
let orderQty;
var value;

$('.errorMessageId').hide();

function loadTable(){
    $('#customerTable').empty();

    customer.map((item, index) => {
        let record = `
            <tr>
                <td class="customer-id-value">${item.id}</td>
                <td class="customer-name-value">${item.name}</td>
                <td class="customer-address-value">${item.address}</td>
                <td class="customer-salary-value">${item.salary}</td>
            </tr>`;
        $("#customerTable").append(record);
    });
}


    $("#addCustomer").on('click',function(){
        var inputValueId = $("#cusID").val();
        var inputValueFname = $("#cusName").val();
        var inputValueAddress = $("#cusAddress").val();
        var inputValueSalary = $("#cusSalary").val();

        var cusObj = new customerModel(inputValueId, inputValueFname, inputValueAddress, inputValueSalary);

        customer.push(cusObj);

        loadTable();
        loadAllCustomerId();
        // Clear input fields
        $("#cusID").val("");
        $("#cusName").val("");
        $("#cusAddress").val("");
        $("#cusSalary").val("");
    });

$("#cusTable").on('click','tr',function() {
    let index=$(this).index();
    value=index;

    let id=$(this).find(".customer-id-value").text();
    let name=$(this).find(".customer-name-value").text();
    let address=$(this).find(".customer-address-value").text();
    let salary=$(this).find(".customer-salary-value").text();

    $("#cusID").val(id);
    $("#cusName").val(name);
    $("#cusAddress").val(address);
    $("#cusSalary").val(salary);
});

$("#cusTable").on('dblclick','tr',function() {
    let alertConfrimDelete = confirm('Do you really want to delete this customer');
    if (alertConfrimDelete==true) {
        let index = $(this).index();
        value = index;
        $('#deleteCustomer').click();
    }
});

$("#deleteCustomer").on('click', () => {
    let splice = customer.splice(value, 1);
    loadTable();
    clearField();
});

function clearField(){
    $("#cusID").val('');
    $("#cusName").val('');
    $("#cusAddress").val('');
    $("#cusSalary").val('');
}
$("#updateCustomer").on('click', () => {
    var customerID = $('#cusID').val();
    var customerName = $('#cusName').val();
    var customerAddress = $('#cusAddress').val();
    var customerSalary = $('#cusSalary').val();

    let customerUpdateObj = customer[value];
    customerUpdateObj.id=customerID;
    customerUpdateObj.name=customerName;
    customerUpdateObj.address=customerAddress;
    customerUpdateObj.salary=customerSalary;

    loadTable();
    clearField();
});

function loadAllCustomerId() {
    $('#orderFormCstId').empty();
    for (let customerArElement of customer) {
        $('#orderFormCstId').append(`<option>${customerArElement.id}</option>`);
    }
}
$('#orderFormCstId').on('change', function(){
    selectedCustomerId = $('#orderFormCstId option:selected').text();
    for (let customerArElement of customer) {
        if (customerArElement.id==selectedCustomerId){

            $('#orderFormCusName').val(customerArElement.name);
            $('#orderFormCusSalary').val(customerArElement.salary);
            $('#orderFormCusAddress').val(customerArElement.address);
            $('#orderFormItemId').focus();
        }
    }
});

$('#cusID').on('keyup', function () {
    var cusid = $(this).val();
    var cusidPattern = /^C\d{3}$/;
    var errorMessage = $('.errorMessageId');

    if (!cusidPattern.test(cusid)) {
        errorMessage.show();
        $(this).css({ 'border': '2px solid red' });
    } else {
        errorMessage.hide();
        $(this).css({ 'border': '2px solid green' });
    }
});

// Validate Customer Name
$('#cusName').on('keyup', function () {
    var cusName = $(this).val();
    var cuanamePattern =  /^\s*\S.{3,18}\S\s*$/
    var errorMessage = $('.errorMessageName');

    if (!cuanamePattern.test(cusName)) {
        errorMessage.show();
        $(this).css({ 'border': '2px solid red' });
    } else {
        errorMessage.hide();
        $(this).css({ 'border': '2px solid green' });
    }
});

// Validate Customer Address
$('#cusAddress').on('keyup', function () {
    var cusAddress = $(this).val();
    var cusAddressPattern = /^.{7,}$/;
    var errorMessage = $('.errorMessageAddress');

    if (!cusAddressPattern.test(cusAddress)) {
        errorMessage.show();
        $(this).css({ 'border': '2px solid red' });
    } else {
        errorMessage.hide();
        $(this).css({ 'border': '2px solid green' });
    }
});


$('#cusSalary').on('keyup', function () {
    var cusSalary = $(this).val();
    var salaryPattern = /^\d+(\.\d{1,2})?$/;
    var errorMessage = $('.errorMessageSalary');

    if (!salaryPattern.test(cusSalary)) {
        errorMessage.show();
        $(this).css({ 'border': '2px solid red' });
    } else {
        errorMessage.hide();
        $(this).css({ 'border': '2px solid green' });
    }
});