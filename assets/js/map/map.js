



function launchMap() {
	var conf = {
	  container : $_id("providersMap")
	};

	VMLaunch("ViaMichelin.Api.Map", conf);
}


$(".poiProviders").click(function(){

	alert('Yupiiii ');
  // Holds the product ID of the clicked element
  /*var productId = $(this).attr('class').replace('addproduct ', '');
  addToCart(productId); */



});

