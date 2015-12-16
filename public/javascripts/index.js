console.log('asd');



function test() {
	var d = {};
	d.title = "title";
	d.message = "message";

	$.ajax({
		type: 'POST',
		data: JSON.stringify(d),
	    contentType: 'application/json',
	    url: 'http://localhost:3000/apriori',						
	    success: function(data) {
	        console.log('success: ', data);
	        //console.log(JSON.stringify(data));
	    }
	});
}