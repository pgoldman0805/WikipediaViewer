/*global $, alert */
(function () {
    "use strict";
    $(function () {

        var $random = $("#random"),
            $search = $("#search-container"),
            $input = $("#input"),
            $searchIcon = $("#search-icon"),
            $inputX = $("#input-x"),
            $inputText = $("#input-text"),
            $results = $("#results"),
            $searchText = $("#search-text");

        // TOGGLE BETWEEN ICON & INPUT FIELD
        $searchIcon.on("click", function () {
            $searchIcon.addClass("hidden");
            $input.removeClass("hidden");
            $inputText.focus();
            $searchText.text("Press Enter to search");
        });
        $inputX.on("click", function () {
            $inputText.val("");
            $input.addClass("hidden");
            $searchIcon.removeClass("hidden");
            $searchText.text("Click icon to search");
            $searchText.removeClass("hidden");
            $random.animate({
                marginTop: '20%'
            }, "slow");


            $(".results-tab").remove();
        });

        // Wait for user to hit 'Enter'
        $inputText.keypress(function (e) {
            var code = e.which;
            if (code === 13) { // 'Enter' keycode

                // check if empty text input
                if ($inputText.val().length > 0) {
                    // Move #random and $searchIcon to top of page
                    $random.animate({
                        marginTop: '20'
                    }, "slow");

                    // Remove existing results
                    $(".results-tab").remove();

                    // Hide search-text
                    $searchText.addClass("hidden");



                    // When user hits 'Enter'...
                    // Capture the text in the input field 
                    // Add that to query as part of URL
                    // GET JSON from Wikipedia API
                    var txt = $inputText.val();
                    txt = encodeURIComponent(txt.trim()); // replace spaces with %20

                    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + txt + '&format=json&callback=?';

                    $.getJSON(url, function (data) {

                        // CAPTURE TITLES
                        var titles = [],
                            descs = [],
                            links = [];

                        $.each(data[1], function (key, value) {
                            titles.push(value);
                        });

                        // CAPTURE DESCRIPTIONS
                        $.each(data[2], function (key, value) {
                            descs.push(value);
                        });

                        // CAPTURE LINKS
                        $.each(data[3], function (key, value) {
                            links.push(value);
                        });

                        // Create HTML --> JSON returns 10 values
                        for (var i = 0; i < titles.length; i++) {
                            $results.append('<div class="results-tab"><a href="' + links[i] + '" target="blank"><h2>' + titles[i] + '</h2><h6>' + descs[i] + '</h6></a></div>');
                        }

                    }); // END OF getJSON
                }


            } // END OF 'ENTER' KEY "IF" STATEMENT
        }); // END OF KEYPRESS
    });
}());