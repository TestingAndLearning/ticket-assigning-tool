/** INSTRUCTIONS **/
//In Chrome, go to chrome://extensions and drag the project folder into there. Refresh page, click icon so that it is green to activate. Click on bar near Save button to run function at the bottom.

//Example page where this addon will activate: {sflink}.com/5000h00000vGucG/a?retURL=%2F5000h00000vGucG
//Remember to click on Addons so that it is green to activate.
//WHEN PAGE LOADS, ANYTHING HERE IS EXECUTED
/* ***** */



/* ***** */
//These will be used to pass into sheets. They are null right now, I will fix later.
var ticketNumber = "testnumber";
var ticketAssignee;
var ticketSubject;
var ticketCustomerCode;
var ticketURL;

if (document.body.contains(document.getElementsByClassName("detailList")[0]))
{
	//Executes script below when the area around Save button is clocked.
	document.getElementsByClassName("pbTitle")[1].addEventListener("click", function(){
	//Listener for clicking on actual Save button. Commented out for now because we dont want to Save while testing.
	//document.getElementsByName("save")[0].addEventListener("click", function(){

		//Gets the Username, url, and other babsic info that can be found on this page.
		var selectNewOwnerTable = document.getElementsByClassName("detailList")[0];
		var currentTicketNumber = selectNewOwnerTable.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerText;
		var currentUsername = document.getElementsByName("newOwn")[0].value;
		var currentTicketURL = window.location.href.split("/a?")[0];

		this.ticketNumber = currentTicketNumber;
		this.ticketAssignee = currentUsername;
		this.ticketURL = currentTicketURL;

		/** ***************************************************************************** **/
		/** START: Crawl account's salesforce page for information such as customer code. **/
		/** ***************************************************************************** **/

		var getHTML = function ( url, callback ) {
			// Feature detection
			if ( !window.XMLHttpRequest ) return;
			// Create new request
			var xhr = new XMLHttpRequest();
			// Setup callback
			xhr.onload = function() {
				if ( callback && typeof( callback ) === 'function' ) {
					callback( this.responseXML );
				}
			}
			//Get the HTML document for the customer page.
			xhr.open( 'GET', url );
			xhr.responseType = 'document';
			xhr.send();
		};

		getHTML( currentTicketURL, function (response) {
			var supportTicketDetail = response.documentElement.getElementsByClassName("detailList")[0]
			var currentTicketSubject = supportTicketDetail.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("div")[0].innerText;
			var currentCustomerCode = supportTicketDetail.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].getElementsByTagName("div")[0].innerText;
			//console.log("Subject: " + ticketSubject);
			//console.log("Customer Code: " + customerCode);
			//this.ticketSubject = currentTicketSubject;
			//this.ticketCustomerCode = currentCustomerCode;
		});
		//console.log("Ticket Number: " + ticketNumber);
		//console.log("Ticket Assignee: " + userName);

		console.log(this.ticketNumber);

		/** *************************************************************************** **/
		/** END: Crawl account's salesforce page for information such as customer code. **/
		/** *************************************************************************** **/

		/** ******************************************************** **/
		/** START: This is where it should append to google sheets.  **/
		/** ******************************************************** **/

		//For Taran below.

		/** ****************************************************** **/
		/** END: This is where it should append to google sheets.  **/
		/** ****************************************************** **/
	});
}
