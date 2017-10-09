$(document).ready(function() {

	function displayArticleList() {

	// make the ajax call using cors anywhere as proxy, otherwise the request is rejected due to cross origin
        $.ajax({
          url: "https://cors-anywhere.herokuapp.com/https://s3-us-west-2.amazonaws.com/saatva-hiring/news.json",
          method: "GET"
        })
        // after data comes back from the request, dynamically create the list items with a for loop
        .done(function(response) {
        	var articles = response.articles;
        	for (var i = 0; i < articles.length; i++) {
        		// append the article titles to the articles div as list items
				$("#articles-list ul").append("<li><h3>" + articles[i].title + "</h3></li>");
				// set attributes of the list items with the object properties
				$("#articles-list ul li").eq(i).attr({ backgr: articles[i].urlToImage,
					nobackgr: "background: none",
					datastate: "nobackgr",
					title: articles[i].title,
					description: articles[i].long_description,
					author: articles[i].author, 
					date: moment(articles[i].publishedAt).format('ll')
				});

				// display the article content in article element inside content div
				$("article h1").eq(i).html(articles[i].title);
				$("article img").eq(i).attr({src: articles[i].urlToImage, alt: "article-image"});
				$("article h4").eq(i).html("By " + articles[i].author + " - " + moment(articles[i].publishedAt).format('ll'));
				$("article .content").eq(i).html(articles[i].long_description);
				// call the change background and view article functions
				$("#articles-list ul li").eq(i).hover(changeBackgr);
				$("#articles-list ul li").eq(i).on("click", viewArticle);
			}		
		});

	}

	// call the display article list function
	displayArticleList();

	// function that will change the background on hover
	function changeBackgr() {
		//toggle the data state with conditionals and set background accordingly
		var state = $(this).attr("datastate");
		if (state === "nobackgr") {
			$(this).attr("style", "background-image:url('" + $(this).attr("backgr") + "')");
			$(this).attr("datastate", "backgr");
		} else {
			$(this).attr("style", "background-image:url('" + $(this).attr("nobackgr") + "')");
			$(this).attr("datastate", "nobackgr");
		}
	}

	// function that will populate the clicked article inside article element
	function viewArticle() {
		//set the content of the elements using the list items' attributes
		$("article h1").html($(this).attr("title"));
		$("article img").attr("src", $(this).attr("backgr"));
		$("article h4").html($(this).attr("author") + " - " + $(this).attr("date"));
		$("article .content").html($(this).attr("description"));
	}

	// change navbar background on scroll
	$(document).scroll(function() {
	 	var $nav = $(".navbar");
	 	$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	});

});
