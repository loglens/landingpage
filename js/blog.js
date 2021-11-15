$(function () {

    var blog_Ref = [
        {
            "title":"Revenue Velocity : A single pane of glass helps",
            "img":"assets/images/BlogRevenue2.png"
        },
        {
            "title":"Subscription selling is about real-time visibility and velocity",
            "img":"assets/images/BlogSub2.jpg"
        }
    ]
    
    function blog_img_mapping(title){
        console.log(title)
        for(var i=0;i<blog_Ref.length;i++){
            if(blog_Ref[i]["title"] === title){
                return blog_Ref[i]["img"]
            }
        }
    }
    
    
        var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var $content2 = $('#recentblogs')
        var data = {
            rss: 'https://medium.com/feed/@sabesan96'
        };
        $.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Loglens', data, function (response) {
            if (response.status == 'ok') {
                $("#logo").append(`<img src="${response.feed["image"]}" class="rounded mx-auto d-block">`)
                var display = '';
                var display2 = ''
                $.each(response.items, function (k, item) {
                    // console.log(response.items,"response.items")
                    // display += `<div class="card mb-3 mx-auto mr-5 " style="width: 20rem;">`;
                    // var src = item["thumbnail"]; // use thumbnail url
                    // display += `<img src="${src}" class="card-img-top" alt="Cover image">`;
                    // display += `<div class="card-body">`;
                    // display += `<h5 class="card-title"><a href="${item.link}">${item.title}</a></h5>`;
                    // var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                    // yourString = yourString.replace('h4', 'p');
                    // yourString = yourString.replace('h3', 'p');
                    // var maxLength = 120; // maximum number of characters to extract
                    // //trim the string to the maximum length
                    // var trimmedString = yourString.substr(0, maxLength);
                    // //re-trim if we are in the middle of a word
                    // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    // display += `<p class="card-text">${trimmedString}...</p>`;
                    
                    // display += `<br><a href="${item.link}" target="_blank" class="readmore" >Read More</a>`;
                    // display += '</div></div>';
                //    var date_Readable= convertDate(response.items.pubDate)
                var date_Readable= moment(item.pubDate).format('ll');
                    console.log(response.items,"response.items")
                    console.log(date_Readable,"date_Readable")
                    date_array = date_Readable.split(",")
                    console.log(date_array,"date_array")
                    // display += ` <div class="row">`;
                    display += ` <div class="col-6" style="padding-bottom: 3%;">`;
                    display += `<div class="blog_main_inner">`;
                    display += `<div class="blog_main_item">`;
                    display += `<div class="blog_img">`;
                    // var src = item["thumbnail"];
                    var src = blog_img_mapping(item.title)
                    if(src == undefined){
                        src = "assets/images/BlogRevenue2.jpg"
                    }
                    console.log(item.title.length)
                    console.log("src",src)
                    display += `<img src="${src}" class="img-fluid" alt="" style=" opacity: 0.6;">`;
                    // display += ` <div class="blog_date">`;
                    // display +=`  <h5>${date_Readable}</h5>`;
                   
                    // display += `</div>`; // blog date
                    display += `</div>`; // blog image ending tag
                    display += `<div class="blog_text flexible">`;
                    display += `<a href="${item.link}" style="text-decoration: none;" target="_blank"><h4>${item.title}</h4></a>`;
                    var yourString = item.description.replace(/<img[^>]*>/g,"");
                    yourString = yourString.replace('h4', 'p');
                    yourString = yourString.replace('h3', 'p');
                    var maxLength = 250;
                    var trimmedString = yourString.substr(0, maxLength);
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    if(item.title.length <60){
                        display += `<br>`
                    }
                    // display += `<p >${trimmedString}...</p>`
                    display += `<a class="more_btn" href="${item.link}" target="_blank" style="text-decoration: none;">View more</a>`
                    display += `</div>`; // for blog text
                    display += `</div>`; // for blog main item
                    display += `</div>`; // for blog main inner
                    display += `</div>`; // for col-6
                    // display += `</div>`; //for row
    
    //for recent blogs 
    
    display2 += `<div class="single-post-list d-flex flex-row align-items-center" >`;
    display2 += `<div class="thumb" style="padding-right: 3%;">`;
    display2 += `<img src="${src}" class="img-fluid" alt="">`;
    display2 += `</div>`; //for thumb
    display2 += `<div class="details">`;
    var maxLength2 = 10;
    var trimmedString2 = item.title.substr(0,maxLength2)
    display2 += `<p class="sidebar-heading">${trimmedString2}...</p>`;
    display2 += `</div>`; // for details
    display2 += `</div>`;// for single-post-list
    
    
    
    
    
                    return k < 10;
                });
    
                
                resolve($content.html(display));
                resolve($content2.html(display2));
            }
        });
        });
    
    mediumPromise.then(function()
        {
            //Pagination
            pageSize = 4;
    
            var pageCount = $(".card").length / pageSize;
    
            for (var i = 0; i < pageCount; i++) {
                $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
            }
            $("#pagin li:nth-child(1)").addClass("active");
            showPage = function (page) {
                $(".card").hide();
                $(".card").each(function (n) {
                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $(this).show();
                });
            }
    
            showPage(1);
    
            $("#pagin li").click(function () {
                $("#pagin li").removeClass("active");
                $(this).addClass("active");
                showPage(parseInt($(this).text()))
                return false;
            });
        });
    });