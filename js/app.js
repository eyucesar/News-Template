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
        	$("#articles").html("<ul></ul>");
        	for (var i = 0; i < articles.length; i++) {
        		//append the articles to the articles div
				$("ul").append("<li><h3>" + articles[i].title + "</h3></li>");
				$("ul li").eq(i).attr("backGr", articles[i].urlToImage);
				$("ul li").eq(i).attr("noBackGr", "background: none");
				$("ul li").eq(i).attr("data-state", "noBackGr");
				//calling the change background function
				$("ul li").eq(i).hover(changeBackGr);

			}
			//first article populates the content div on page load
			$("#content").html("<article></article>");
			$("article").append("<h1>" + articles[0].title + "</h1>");
			$("article").append("<img src='" + articles[0].urlToImage + "' alt='article-image'>");
			$("article").append("<i class='fa fa-rss-square' aria-hidden='true'></i><i class='fa fa-twitter-square' aria-hidden='true'></i><i class='fa fa-facebook-square' aria-hidden='true'></i><i class='fa fa-envelope' aria-hidden='true'></i>");
			$("article").append("<h4>By " + articles[0].author + " - " + moment(articles[0].publishedAt).format('ll') + "</h4>");
			$("article").append(articles[0].long_description);
		});
	}

	//calling the display articles list function
	displayArticleList();

	function changeBackGr() {
		var state = $(this).attr("data-state");
		if (state === "noBackGr") {
			$(this).attr("style", "background-image:url('" + $(this).attr("backGr") + "')");
			$(this).attr("data-state", "backGr");
		} else {
			$(this).attr("style", "background-image:url('" + $(this).attr("noBackGr") + "')");
			$(this).attr("data-state", "noBackGr");
		}
	}

});