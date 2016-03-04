var customers = [];
var customerSocket;

$(document).ready(function() { // document-ready is the jQuery normalized version of window.onload) 
	customerSocket = new WebSocket("ws://localhost:8080/WeasleyWebApp/customers");
	customerSocket.onmessage = function(event) {
		var cust = JSON.parse(event.data);
		console.log("WS got: " + JSON.stringify(cust));
		$(document).trigger("CustomerAddedEvent", cust);
	};
	
	
	$(".draggable").draggable();
	$(".droppable").droppable({
		drop : function(evt, ui) {
			var dragged = ui.draggable[0];
			var id = dragged.id;
			console.log("dropped: " + id);
			var jqDragged = $("#" + dragged.id);
			$(jqDragged).parent.remove(jqDragged);
			$(this).append(jqDragged);
		}
	});

	$("#btnGetCustomers").click(function() {
		$.getJSON("http://www.nextgeneducation.com/weasley/customers.json", function(data) {
			customers = data;
			$(document).trigger("CustomersChangedEvent", customers);
		});
	});

	$("#btnClearLocalData").click(function() {
		window.localStorage.clear();
	});
	
	$("#btnClearLocalCustomers").click(function() {
		window.localStorage.removeItem("customers");
	});

	//$(document).on("CustomersChangedEvent", function(data) {});
	
	$(document).on("CustomersChangedEvent", function(data) {
		$("#numCustomers").html("# Customers: " + customers.length);
	});

	$(document).on("CustomersChangedEvent", function(data) {
		for (var i = 0; i < customers.length; i++) {
			var cust = customers[i];
			$("#tblCustomers").append("<tr>" + 
				"<td>" + cust.customerId + "</td>" +
				"<td>" + cust.firstName + "</td>" +
				"<td>" + cust.lastName + "</td>" +
				"<td>" + cust.phoneNumber + "</td>" +
				"</tr>"
			);
		}
	});

	$(document).on("CustomersChangedEvent", function(data) {
		window.localStorage.setItem("customers", JSON.stringify(customers));
	});
	
	
	$(document).on("CustomersChangedEvent", function(data) {
		console.log("Customers Changed: " + customers.length + " total customers");
	});

	if (window.localStorage) {
		customers = JSON.parse(window.localStorage.getItem("customers"));
		if (customers && customers.length && customers.length > 0) {
			$(document).trigger("CustomersChangedEvent", customers);	
		}
	}


	$(".swipeable").hammer().on("swipe", function(evt) {
		console.log("Swiped!")	
	});
});
