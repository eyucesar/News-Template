$(document).ready(function() {

	function displayArticleList() {

		//make the ajax call
        $.ajax({
          url: "http://s3-us-west-2.amazonaws.com/saatva-hiring/news.json",
          method: "GET"
        })
        //after data comes back from the request, dynamically create the list items with a for loop
        .done(function(response) {
        	var articles = response.articles;
        	for (var i = 0; i < articles.length; i++) {
        		//append the article titles to the articles div as list items
				$("#articles-list ul").append("<li><h3>" + articles[i].title + "</h3></li>");
				//set attributes of the list items with the object properties
				$("#articles-list ul li").eq(i).attr({ backgr: articles[i].urlToImage,
					nobackgr: "background: none",
					datastate: "nobackgr",
					title: articles[i].title,
					description: articles[i].long_description,
					author: articles[i].author, 
					date: moment(articles[i].publishedAt).format('ll')
				});

				//display the first article's content on page load
				$("article h1").eq(i).html(articles[0].title);
				$("article img").eq(i).attr({src: articles[0].urlToImage, alt: "article-image"});
				$("article h4").eq(i).html("By " + articles[0].author + " - " + moment(articles[0].publishedAt).format('ll'));
				$("article .content").eq(i).html(articles[0].long_description);
				//call the change background and display article functions
				$("#articles-list ul li").eq(i).hover(changeBackgr);
				$("#articles-list ul li").eq(i).on("click", displayArticle);
			}		
		});
	}

	//calling the display articles list function
	displayArticleList();

	function changeBackgr() {
		//toggle the data state with conditionals
		var state = $(this).attr("datastate");
		if (state === "nobackgr") {
			$(this).attr("style", "background-image:url('" + $(this).attr("backgr") + "')");
			$(this).attr("datastate", "backgr");
		} else {
			$(this).attr("style", "background-image:url('" + $(this).attr("nobackgr") + "')");
			$(this).attr("datastate", "nobackgr");
		}
	}

	function displayArticle() {
		//set the content of the tags using the list items' attributes
		$("article h1").html($(this).attr("title"));
		$("article img").attr("src", $(this).attr("backgr"));
		$("article h4").html($(this).attr("author") + " - " + $(this).attr("date"));
		$("article .content").html($(this).attr("description"));
	}

});