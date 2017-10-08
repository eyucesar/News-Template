$(document).ready(function() {

	function displayArticleList() {

		//making the ajax call
        $.ajax({
          url: "http://s3-us-west-2.amazonaws.com/saatva-hiring/news.json",
          method: "GET"
        })
        //after data comes back from the request, dynamically create the list items with a for loop
        .done(function(response) {
        	var articles = response.articles;
        	console.log(articles);
        	$("#articles").html("<ul></ul>");
        	for (var i = 0; i < articles.length; i++) {
        		//append the articles to the articles div
				$("ul").append("<li><h3>" + articles[i].title + "</h3></li>");
				$("ul li").eq(i).attr("backGr", articles[i].urlToImage);
				$("ul li").eq(i).attr("noBackGr", "background: none");
				$("ul li").eq(i).attr("data-state", "noBackGr");
				$("ul li").eq(i).on("mouseover", changeBackGr);
			}
		
		});
	}

	//calling the display articles list function
	displayArticleList();

	function changeBackGr() {
		var state = $(this).attr("data-state");
		if (state === "noBackGr") {
			$(this).attr("style", "background-image:url('" + $(this).attr("backGr") + "')").siblings().attr("style", "background: none");;
			$(this).attr("data-state", "backGr");
		} else {
			$(this).attr("style", "background-image:url('" + $(this).attr("noBackGr") + "')").siblings().attr("style", "background: none");;;
			$(this).attr("data-state", "noBackGr");
		}
	}

});