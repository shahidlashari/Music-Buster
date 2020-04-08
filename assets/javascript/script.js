$(document).ready(function() {

    // Artist Name Input onclick function to display the Album & Song Name Inputs
    $("#search-artist").on("click", function(event) {
        event.preventDefault();
        $("#album-control").show();
        $("#song-control").show();
    })

    // ... Button to show or hide the Album & Song Name Inputs
    $("#toggle-search").on("click", function(event) {
        event.preventDefault();

        if ($("#album-control").is(":visible") && $("#song-control").is(":visible")) {
            $("#album-control").hide();
            $("#song-control").hide();
        }    
        else {
            $("#album-control").show();
            $("#song-control").show();
        }
    })

    function currentTrendingAlbums() {
        const queryURL = `https://theaudiodb.com/api/v1/json/5d656564694f534d656564/trending.php?country=us&type=itunes&format=albums`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then (function(response) {
            console.log(response);
            for (let j = 0; j < response.trending.length; j++) {
                const $div = $("<div>")
                $div.addClass("div-trending-album-artist");

                const currentAlbum = response.trending[j];
                const trendingAlbumThumbnail = currentAlbum.strAlbumThumb;
                const trendingAlbum = currentAlbum.strAlbum;
                const trendingArtistName = currentAlbum.strArtist;

                const $trendingImgAlbumThumbnail = $("<img>").attr("src", trendingAlbumThumbnail).attr("id", "trending-album-image-thumbnail").width(100).height(100);   
                const $ptrendingAlbumName = $("<p>").text(`Album Name: ${trendingAlbum}`);
                const $ptrendingAlbumArtist = $("<p>").text(`Artist Name: ${trendingArtistName}`);

                $("#trending-album-thumbnail").append($trendingImgAlbumThumbnail);
                $div.append($ptrendingAlbumArtist, $ptrendingAlbumName)
                $("#trending-album-name").append($div); 
            }
        });
    }

    function currentTrendingSongs() {
        const queryURL = `https://theaudiodb.com/api/v1/json/5d656564694f534d656564/trending.php?country=us&type=itunes&format=singles`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then (function(response){
            console.log(response);
            for (let i = 0; i < response.trending.length; i++) {
                const $div = $("<div>")
                $div.addClass("div-trending-song-album-artist");

                const currentSong = response.trending[i];
                const trendingSongThumbnail = currentSong.strTrackThumb;
                const trendingTrack = currentSong.strTrack;
                const trendingTrackAlbum = currentSong.strAlbum;
                const trendingTrackArtist = currentSong.strArtist;

                const $trendingImgTrackThumbnail = $("<img>").attr("src", trendingSongThumbnail).attr("id", "trending-song-image-thumbnail").width(100).height(100);   
                const $ptrendingTrackName = $("<p>").text(`Track Name: ${trendingTrack}`);
                const $ptrendingTrackALbum = $("<p>").text(`Track Album: ${trendingTrackAlbum}`);
                const $ptrendingTrackArtist = $("<p>").text(`Artist Name: ${trendingTrackArtist}`);

                $("#trending-track-thumbnail").append($trendingImgTrackThumbnail);
                $div.append($ptrendingTrackName, $ptrendingTrackALbum, $ptrendingTrackArtist)
                $("#trending-track-name").append($div); 
            }
        });  
    }

    // Submit Button onclick function
    $("#submit-button").on("click", function(event) {

        event.preventDefault();

        if ($("#search-artist").val().trim() === "" && $("#search-album").val().trim() === "" && $("#search-song").val().trim() === "") {
            console.log("Hello");
            $("#error-text").show();
            return false;
        } 
        else if ($("#search-artist").val().trim() === "" && $("#search-album").val().trim() === "") {
            console.log("Hello");
            $("#error-text").show();
            return false;
        }
        else if ($("#search-artist").val().trim() === "" && $("#search-song").val().trim() === "") {
            console.log("Hello");
            $("#error-text").show();
            return false;
        }
        else if ($("#search-album").val().trim() === "" && $("#search-song").val().trim() === "") {
            $("#display-trending-album-container").hide();
            $("#error-text").hide();
            displayArtist();
        }
        else if ($("#search-album").val().trim() === "") {
            $("#display-trending-album-container").hide();
            $("#error-text").hide();
            displayArtist();
            displayTrack();
        }
        else if ($("#search-song").val().trim() === "") {
            $("#display-trending-album-container").hide();
            $("#error-text").hide();
            displayArtist();
            displayAlbum();
        }
        else if ($("#search-artist").val().trim() === "") {
            console.log("Hello");
            $("#error-text").show();
            return false;
        }
        else {
            $("#display-trending-album-container").hide();
            $("#error-text").hide();
            displayArtist();
            displayAlbum();
            displayTrack();
        }

        // Artist Search Parameter
        function displayArtist() {
            const artistName = $("#search-artist").val().trim();
            const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/search.php?s=${artistName}`;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then (function(response) {
                console.log(response);
                
                // Artist - Thumbnail Column
                $("#artist-thumbnail").empty();

                const $imgThumbnail = $("<img>").attr("src", response.artists[0].strArtistThumb);  

                $("#artist-thumbnail").append($imgThumbnail); 
                 
                // Artist - Biography Column
                $("#artist-biography").empty();

                const $pBiography = $("<p>").text(`${response.artists[0].strBiographyEN.slice(0, 200)}...`); 
                const $readMoreModal = $(`<button class="button" id="readMoreBtn">Read More</button>
                                            <div class="modal readMoreModal">
                                                <div class="modal-background"></div>
                                                <div class="modal-card">
                                                    <header class="modal-card-head">
                                                        <p class="modal-card-title">Full Biography</p>
                                                        <button class="delete deleteReadMore" aria-label="close"></button>
                                                    </header>
                                                    <section class="modal-card-body">
                                                        ${response.artists[0].strBiographyEN}
                                                    </section>
                                                </div>
                                            </div>`)
                                            
                $("#artist-biography").append($pBiography, $readMoreModal);

                $("#readMoreBtn").click(function() {
                    $(".readMoreModal").addClass("is-active");  
                    $("html").addClass("is-clipped");
                  });
                  
                  $(".delete").click(function() {
                    $(".readMoreModal").removeClass("is-active");  
                    $("html").removeClass("is-clipped");
                  });

                // Artist - Social Media and Style/Genre/Mood Column
                $("#artist-social-media").empty();
                $("#artist-style-genre-mood").empty();

                const $imgWebsiteIcon = $(`<i id="website-icon" class="fas fa-globe"></i>`);
                const $aWebsiteTag = $("<a>").attr("id", "a-website-icon").attr("href", `https://${response.artists[0].strWebsite}`).attr("target", "_blank");
                const $imgFacebookIcon = $("<img>").attr("id", "facebook-icon").addClass("fab fa-facebook-f").attr("href", `https://${response.artists[0].strFacebook}`).attr("target", "_blank");
                const $aFacebookTag = $("<a>").attr("id", "a-facebook-icon").attr("href", `https://${response.artists[0].strFacebook}`).attr("target", "_blank");
                const $imgTwitterIcon = $("<img>").attr("id", "twitter-icon").addClass("fab fa-twitter").attr("href", `https://${response.artists[0].strTwitter}`).attr("target", "_blank");
                const $aTwitterTag = $("<a>").attr("id", "a-twitter-icon").attr("href", `https://${response.artists[0].strTwitter}`).attr("target", "_blank");
                const $pStyle = $("<p>").text(`Style: ${response.artists[0].strStyle}`);   
                const $pGenre = $("<p>").text(`Genre: ${response.artists[0].strGenre}`); 
                const $pMood = $("<p>").text(`Mood: ${response.artists[0].strMood}`);   

                $("#artist-social-media").append($aWebsiteTag);
                $("#a-website-icon").append($imgWebsiteIcon);
                $("#artist-social-media").append($aFacebookTag);
                $("#a-facebook-icon").append($imgFacebookIcon);
                $("#artist-social-media").append($aTwitterTag);
                $("#a-twitter-icon").append($imgTwitterIcon);


                // $("#artist-social-media").prepend($imgWebsiteIcon, $imgFacebookIcon, $imgTwitterIcon);
                $("#artist-style-genre-mood").prepend($pStyle, $pGenre, $pMood);

                // Artist - Discography Column
                function discography() {
                    const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/discography.php?s=${artistName}`;
    
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then (function(response) {
                        console.log(response);

                        $("#artist-discography").empty();

                        const albumList = response.album;
                        for (let i = 0; i < albumList.length; i++) {
                            // const $div = $("<div>");
                            const $div = $("<div>");
                            $div.addClass("div-album");
                            const $albumName = $("<p>").text(`Album: ${albumList[i].strAlbum}`);
                            const $albumYear = $("<p>").text(`Year: ${albumList[i].intYearReleased}`);

                            $div.append($albumName, $albumYear);
                            $("#artist-discography").append($div);
                        }
                    })
                }

                // Artist - Most Loved Tracks Column
                function mostLovedTracks() {
                    const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/track-top10.php?s=${artistName}`
    
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then (function(response) {
                        console.log(response);

                        $("#artist-most-loved-tracks").empty();

                        const mostLovedTrackList = response.track;
                        for (let i = 0; i < mostLovedTrackList.length; i++) {
                            const $div = $("<div>");
                            $div.addClass("div-most-loved-tracks");
                            const $trackName = $("<p>").text(`Track: ${mostLovedTrackList[i].strTrack}`);
                            const $trackInfoModal = $(`<button class="button" id="trackInfoBtn" data-modal="Track ${[i]}">Track Info</button>
                                                        <div class="modal trackInfoModal">
                                                            <div class="modal-background"></div>
                                                            <div class="modal-card">
                                                                <header class="modal-card-head">
                                                                    <p class="modal-card-title">Track - ${mostLovedTrackList[i].strTrack}</p>
                                                                    <button class="delete" aria-label="close"></button>
                                                                </header>
                                                                <section class="modal-card-body content">
                                                                    <h1>Track Info:</h1><hr> 
                                                                        <img src="${mostLovedTrackList[i].strTrackThumb}"/>
                                                                        <p>Artist: ${mostLovedTrackList[i].strArtist}</p>
                                                                        <p>Album: ${mostLovedTrackList[i].strAlbum}</p>
                                                                        <p>Genre: ${mostLovedTrackList[i].strGenre}</p>
                                                                    <h1>Track Description:</h1><hr>
                                                                        <p>${mostLovedTrackList[i].strDescriptionEN}</p>
                                                                    <h1>Track Music Video:</h1><hr>
                                                                        <p>URL: <a href="${mostLovedTrackList[i].strMusicVid}" target="_blank">${mostLovedTrackList[i].strMusicVid}</a></p>
                                                                </section>
                                                            </div>
                                                        </div>`)

                            $div.append($trackName, $trackInfoModal);
                            $("#artist-most-loved-tracks").append($div);

                            $(document).on("click", "#trackInfoBtn", function() {
                                $(this).parent().find(".trackInfoModal").addClass("is-active");
                                $(this).addClass("is-clipped");
                            }) 

                            $(document).on("click", ".delete", function() {
                                $(this).parent().parent().parent().removeClass("is-active");
                                $(this).removeClass("is-clipped");
                            }) 
                        }
                    })
                }
    
                // Artist - Music Videos Column
                function musicVideos() {
                    const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/mvid.php?i=${response.artists[0].idArtist}`
    
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then (function(response) {
                        console.log(response);

                        $("#artist-music-videos").empty();
                        
                        const musicVideoList = response.mvids;
                        for (let i = 0; i < 10; i++) {
                            const $div = $("<div>");
                            $div.addClass("div-music-videos");
                            const $artistMusicVideoName = $("<p>").text(`Music Video: ${musicVideoList[i].strTrack}`).attr("style", "text-decoration: underline");
                            const $artistMusicVideoURL = $("<a>").text(`${musicVideoList[i].strMusicVid}`).attr("href", musicVideoList[i].strMusicVid).attr("target", "_blank");

                            $("#artist-music-videos").append($artistMusicVideoName, $artistMusicVideoURL);

                        }
                    })
                }
        
                discography();
                mostLovedTracks();
                musicVideos();

                $("#display-artist-container").show();
    
            }).catch(function(error) {

                $("#error-text").show();
                $("#display-trending-album-container").show();

            })
        }

        // Album Search Parameter
        function displayAlbum() {
            const albumNameFromArtist = $("#search-artist").val().trim();
            const albumName = $("#search-album").val().trim();
            const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/searchalbum.php?s=${albumNameFromArtist}&a=${albumName}`;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then (function(response) {
                console.log(response);


                // Album - Thumbnail & Album Name Column
                $("#album-thumbnail").empty();
                $("#album-name").empty();

                const $imgAlbumThumbnail = $("<img>").attr("src", response.album[0].strAlbumThumb).attr("id", "album-image-thumbnail");   
                const $pAlbumName = $("<p>").text(response.album[0].strAlbum);

                $("#album-thumbnail").append($imgAlbumThumbnail);
                $("#album-name").append($pAlbumName); 
                
                // Album - Description Column
                $("#album-description").empty();

                const $pAlbumDescription = $("<p>").text(`${response.album[0].strDescriptionEN.slice(0, 500)}...`); 
                const $fullDescriptionModalAlbum = $(`<button class="button" id="fullDescriptionBtnAlbum">Full Description</button>
                                                <div class="modal fullDescriptionModalAlbum">
                                                    <div class="modal-background"></div>
                                                    <div class="modal-card">
                                                        <header class="modal-card-head">
                                                            <p class="modal-card-title">Full Album Description</p>
                                                            <button class="delete deleteReadMore" aria-label="close"></button>
                                                        </header>
                                                        <section class="modal-card-body">
                                                            ${response.album[0].strDescriptionEN}
                                                        </section>
                                                    </div>
                                                </div>`)                          
                $("#album-description").append($pAlbumDescription, $fullDescriptionModalAlbum);

                $("#fullDescriptionBtnAlbum").click(function() {
                    $(".fullDescriptionModalAlbum").addClass("is-active");  
                    $("html").addClass("is-clipped");
                  });
                  
                  $(".delete").click(function() {
                    $(".fullDescriptionModalAlbum").removeClass("is-active");  
                    $("html").removeClass("is-clipped");
                  });
                
                // Album - Label, Year Released, & Style/Genre/Mood Column 
                $("#album-label").empty();
                $("#album-year").empty();
                $("#album-style-genre-mood").empty();

                const $pAlbumLabel = $("<p>").text(response.album[0].strLabel);
                const $pAlbumYear = $("<p>").text(response.album[0].intYearReleased);       
                const $pAlbumStyle = $("<p>").text(`Style: ${response.album[0].strStyle}`);   
                const $pAlbumGenre = $("<p>").text(`Genre: ${response.album[0].strGenre}`); 
                const $pAlbumMood = $("<p>").text(`Mood: ${response.album[0].strMood}`);
                   
                $("#album-label").append($pAlbumLabel);
                $("#album-year").append($pAlbumYear);
                $("#album-style-genre-mood").append($pAlbumStyle, $pAlbumGenre, $pAlbumMood);

                $("#display-album-container").show();

            })
        }

        // Song/Track Search Parameter
        function displayTrack() {
            const trackNameFromArtist = $("#search-artist").val().trim();
            const trackName = $("#search-song").val().trim();
            const queryURL = `https://www.theaudiodb.com/api/v1/json/5d656564694f534d656564/searchtrack.php?s=${trackNameFromArtist}&t=${trackName}`;
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then (function(response) {
                console.log(response);

                // Track - Thumbnail, Track Name, and Album Name
                $("#song-thumbnail").empty();
                $("#song-name").empty();
                $("#song-album-name").empty();

                const $imgSongThumbnail = $("<img>").attr("src", response.track[0].strTrackThumb).attr("id", "song-image-thumbnail");   
                const $pSongName = $("<p>").text(response.track[0].strTrack);
                const $pSongAlbumName = $("<p>").text(response.track[0].strAlbum);

                $("#song-thumbnail").append($imgSongThumbnail);
                $("#song-name").append($pSongName); 
                $("#song-album-name").append($pSongAlbumName);

                // Track - Description
                $("#song-description").empty();

                const $pSongDescription = $("<p>").text(`${response.track[0].strDescriptionEN.slice(0, 500)}...`); 
                const $fullDescriptionModalSong = $(`<button class="button" id="fullDescriptionBtnSong">Full Description</button>
                                                <div class="modal fullDescriptionModalSong">
                                                    <div class="modal-background"></div>
                                                    <div class="modal-card">
                                                        <header class="modal-card-head">
                                                            <p class="modal-card-title">Full Song Description</p>
                                                            <button class="delete deleteReadMore" aria-label="close"></button>
                                                        </header>
                                                        <section class="modal-card-body">
                                                            ${response.track[0].strDescriptionEN}
                                                        </section>
                                                    </div>
                                                </div>`)                          
                $("#song-description").append($pSongDescription, $fullDescriptionModalSong);

                $("#fullDescriptionBtnSong").click(function() {
                    $(".fullDescriptionModalSong").addClass("is-active");  
                    $("html").addClass("is-clipped");
                  });
                  
                  $(".delete").click(function() {
                    $(".fullDescriptionModalSong").removeClass("is-active");  
                    $("html").removeClass("is-clipped");
                  });

                // Track - Genre/Style/Mood
                $("#song-style-genre-mood").empty();

                const $pSongStyle = $("<p>").text(`Style: ${response.track[0].strStyle}`);   
                const $pSongGenre = $("<p>").text(`Genre: ${response.track[0].strGenre}`); 
                const $pSongMood = $("<p>").text(`Mood: ${response.track[0].strMood}`);
                
                $("#song-style-genre-mood").append($pSongStyle, $pSongGenre, $pSongMood);

                // Track - Music Video
                $("#song-music-video").empty();

                const $songMusicVideoURL = $("<a>").text(`${response.track[0].strMusicVid}`).attr("href", response.track[0].strMusicVid).attr("target", "_blank");

                $("#song-music-video").append($songMusicVideoURL);

                // Track - Lyrics
                function lyricsOVH() {
                    const lyricURL = `https://api.lyrics.ovh/v1/${trackNameFromArtist}/${trackName}`;
            
                    $.ajax({
                        url: lyricURL,
                        method: "GET"
                    }).then (function(response) {
                        console.log(response);

                        $("#song-lyrics").empty();

                        const $pSongLyrics = $("<p>").text(`${response.lyrics.slice(0, 500)}...`); 
                        const $fullLyricsModalSong = $(`<button class="button" id="fullLyricsBtnSong">Full Lyrics</button>
                                                        <div class="modal fullLyricsModalSong">
                                                            <div class="modal-background"></div>
                                                            <div class="modal-card">
                                                                <header class="modal-card-head">
                                                                    <p class="modal-card-title">Full Song Lyrics</p>
                                                                    <button class="delete deleteReadMore" aria-label="close"></button>
                                                                </header>
                                                                <section class="modal-card-body">
                                                                    ${response.lyrics}
                                                                </section>
                                                            </div>
                                                        </div>`)                          
                        $("#song-lyrics").append($pSongLyrics, $fullLyricsModalSong);
        
                        $("#fullLyricsBtnSong").click(function() {
                            $(".fullLyricsModalSong").addClass("is-active");  
                            $("html").addClass("is-clipped");
                          });
                          
                          $(".delete").click(function() {
                            $(".fullLyricsModalSong").removeClass("is-active");  
                            $("html").removeClass("is-clipped");
                          });
                    })
                }
                lyricsOVH();

                $("#display-song-container").show();
            })
        }

    displayArtist();
    displayAlbum();
    displayTrack();
    })

    // Clear Button 
    $("#clear-button").on("click", function(event) {
        event.preventDefault();

        function emptyAll() {
            $("#artist-thumbnail").empty();
            $("#artist-biography").empty();
            $("#artist-social-media").empty();
            $("#artist-style-genre-mood").empty();
            $("#artist-discography").empty();
            $("#artist-most-loved-tracks").empty();
            $("#artist-music-videos").empty();

            $("#album-thumbnail").empty();
            $("#album-name").empty();
            $("#album-description").empty();
            $("#album-label").empty();
            $("#album-year").empty();
            $("#album-style-genre-mood").empty();

            $("#song-thumbnail").empty();
            $("#song-name").empty();
            $("#song-album-name").empty();
            $("#song-description").empty();
            $("#song-music-video").empty();
            $("#song-style-genre-mood").empty();
            $("#song-lyrics").empty();
        }

        function hideContainer() {
            $("#display-artist-container").hide();
            $("#display-album-container").hide();
            $("#display-song-container").hide();
        }

        function emptyInput() {
            $("#search-artist").val("");
            $("#search-album").val("");
            $("#search-song").val("");
        }

        if ($("#search-album").val().trim() === "" && $("#search-song").val().trim() === "") {
            $("#display-trending-album-container").show();
            $("#error-text").hide();
            emptyAll();
            hideContainer();
            emptyInput();
        } 
        else if ($("#search-album").val().trim() === "") {
            $("#display-trending-album-container").show();
            $("#error-text").hide();
            emptyAll();
            hideContainer();
            emptyInput();
        }
        else if ($("#search-song").val().trim() === "") {
            $("#display-trending-album-container").show();
            $("#error-text").hide();
            emptyAll();
            hideContainer();
            emptyInput();
        }
        else {
            $("#display-trending-album-container").show();
            $("#error-text").hide();
            emptyAll();
            hideContainer();
            emptyInput();
        }
    });

    // Enter Key
    $(document).keyup(function(event) { 
        event.preventDefault();
        if (event.keyCode === 13) { 
            $("#submit-button").click(); 
        } 
    }); 

    // Google Microphone Search
    $("#microphone-image").on("click", function() {
        function startDictation() {
            if (window.hasOwnProperty(`webkitSpeechRecognition`)) {
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = "en-US";
                recognition.start();
                recognition.onresult = function (e) {
                    document.getElementById(`transcript`).value
                        = e.results[0][0].transcript;
                    recognition.stop();
                    document.getElementById(`speachSearch`).submit();
                };
                recognition.onerror = function (e) {
                    recognition.stop();
                }
            }
        }
        startDictation();
    }); 

    currentTrendingAlbums();
    currentTrendingSongs();
});