'use strict';//strong alert if have some error in code - for right code

document.addEventListener('DOMContentLoaded', () => {
    //screen keyboard
    {
    
        const keyboardButton = document.querySelector('.search-form__keyboard'),
        keyboard = document.querySelector('.keyboard'),
        closeKeyboard = document.getElementById('close-keyboard'),
        searchInput = document.querySelector('.search-form__input');

        
        // if(keyboard.style.top) {
        //     keyboard.style.top = '';
        // } else {
        //     keyboard.style.top = '50%';
        // }
        const toggleKeyboard = () => { 
            keyboard.style.top = keyboard.style.top ? '' : '50%';  //trinary var
        }

        const changeLang = (btn,lang) => {
            const langRu = [
                'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
                ];
            const langEn = [
                '`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '
                ];

                if(lang === 'en') {
                    btn.forEach((elem, i) => {
                        elem.textContent = langEn[i];
                    });
                }else {
                    btn.forEach((elem, i) => {
                        elem.textContent = langRu[i];
                    });
                }

        }

        const typing = event => {
            const target = event.target;
            //console.log('target: ', target);


            //if(target.tagName === 'BUTTON' )
            if(target.tagName.toLowerCase() === 'button' ){
                const button = [...keyboard.querySelectorAll('button')].filter(elem => elem.style.visibility !== 'hidden');
                //console.dir(button);

                const contentButton = target.textContent.trim();

                //backspace
                if(contentButton === '⬅'){
                    searchInput.value = searchInput.value.slice(0, -1);
                } 

                else if (!contentButton){
                    searchInput.value += ' ';
                }

                else if(contentButton === 'en' || contentButton === 'ru') {
                    changeLang(button, contentButton);
                }
                
                else {
                    searchInput.value += contentButton;
                }
                //console.log(target.textContent.trim());//trim() delete spaces before and after content
                
            }

            
            
            //space
            
        };

        keyboardButton.addEventListener('click', toggleKeyboard);
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', typing);
        
    }

    //menu
    {
        const burger = document.querySelector('.spinner'),
            sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            //sidebarMenu.classList.add('rollUp');
            //toggle - work with both side (add and remove)
            burger.classList.toggle('active');
            sidebarMenu.classList.toggle('rollUp');
        });


        sidebarMenu.addEventListener('click', e => {//e === event
            let target = e.target;

            target = target.closest('a[href="#"]');
            //closest()
            //take selector if exist and go up on tree to find pather with 'a[href="#"]' 
            //this all for miss click on link -> take closest tags
            //if not find any element return null
            //algo - go up on tree with start point 'a[href="#"]' (include) if exist return his element 
            //else go up -> if find return it , else return null

            if(target) {//choise show in red
                const parentTarget = target.parentElement;
                //console.log(parentTarget);
                sidebarMenu.querySelectorAll('li').forEach((elem) => {
                    if (elem === parentTarget) {
                        elem.classList.add('active');
                    }else {
                        elem.classList.remove('active');
                    }
                });
            }

        });
    }


    const youtuber = () => {
        const youtuberItems = document.querySelectorAll('[data-youtuber]');//take all videos for add eventLisener. [] mean give me in object mode - more functionality
        const youTuberModal = document.querySelector('.youTuberModal');
        const youtuberContainer = document.getElementById('youtuberContainer');
        //console.log('youTuberModel: ', youTuberModal);

        const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
        const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];


        const sizeVideo = () => {//adaptive size video
            const ww = document.documentElement.clientWidth;
            const wh = document.documentElement.clientHeight;

            for (let i =0; i < qw.length; i++) {
                if(ww > qw[i]){
                    youtuberContainer.querySelector('iframe').style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                    `;

                    youtuberContainer.style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                        top: ${(wh - qh[i]) / 2}px;
                        left: ${(ww - qw[i]) / 2}px;
                    `;


                    break;//find client window - if client bigger than choose it
                }
            }
        }

       
        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                const idVideo = elem.dataset.youtuber;
                //console.log(idVideo);
                
                youTuberModal.style.display = 'block';

                const youTuberFrame = document.createElement('iframe');
                //youTuberFrame.src = idVideo;
                youTuberFrame.src = `http://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);

                window.addEventListener('resize', sizeVideo);

                sizeVideo();
            });
        });

        youTuberModal.addEventListener('click', () => {
            youTuberModal.style.display = '';
            youtuberContainer.textContent = '';
            window.removeEventListener('resize', sizeVideo);
        });
    
    }

        //model window
        {
            // <div class="youTuberModal">
            //     <div id="youtuberClose">&#215;</div>
            //     <div id="youtuberContainer"></div>
            // </div>
    
            document.body.insertAdjacentHTML('beforeend', `
                <div class="youTuberModal">
                    <div id="youtuberClose">&#215;</div>
                    <div id="youtuberContainer"></div>
                </div>
            `);//for put element in some position. in our case is put before end and the element
            youtuber();
        }


    //youtube api
    {
        const API_KEY = 'AIzaSyB9uk5CRb_SseCiOcUbFslnfi5uJDSC-D8';
        const CLIENT_ID = '1081943941825-di3vqcrcpl5nkffc79a80ojrg1reu5tn.apps.googleusercontent.com';
        //Autorized
        {
            
            const buttonAuth = document.getElementById('authorize');
            const authBlock = document.querySelector('.auth');


            const authenticate = () => gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(() => console.log("Sign-in successful"))
                    .catch(errorAuth);

            const loadClient = () => {
                gapi.client.setApiKey(API_KEY);
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(() => console.log("GAPI client loaded for API"))
                    .then(() => authBlock.style.display = 'none')
                    .catch(errorAuth);
            }

            gapi.load("client:auth2", () => gapi.auth2.init({client_id: CLIENT_ID}));
/*
              //original code from google
              function authenticate() {
                return gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(function() { console.log("Sign-in successful"); },
                          function(err) { console.error("Error signing in", err); });
              }
              function loadClient() {
                gapi.client.setApiKey(API_KEY);
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function() { console.log("GAPI client loaded for API"); },
                          function(err) { console.error("Error loading GAPI client for API", err); });
              }
              // Make sure the client is loaded and sign-in is complete before calling this method.
              function execute() {
                return gapi.client.youtube.channels.list({})
                    .then(function(response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response);
                          },
                          function(err) { console.error("Execute error", err); });
              }
              gapi.load("client:auth2", function() {
                gapi.auth2.init({client_id: CLIENT_ID});
              });
*/

            buttonAuth.addEventListener('click', () => {
                authenticate().then(loadClient);
            });

            const errorAuth = err => {
                console.error(err);
                authBlock.style.display = '';
            }
        }

        //request
        {
            const gloTube = document.querySelector('.logo-academy');
            const trends = document.getElementById('yt_trend');
            const like = document.getElementById('like');
            const subscriptions = document.getElementById('subscriptions');
            const searchForm = document.querySelector('.search-form');

            const request = options => gapi.client.youtube[options.method]
            .list(options)
            .then(response => response.result.items)
            .then(data => options.method === 'subscriptions' ? renderSup(data) : render(data))
            .catch(err => console.err('error on request: ' + err));

            const renderSub = data => {
                console.log(data);
                const ytWrapper = document.getElementById('yt-wrapper');
                ytWrapper.textContent = '';
                data.forEach(item => {
                    //console.log(data);
                    try {
                        console.log(item);
                        const {snippet: {resourceId: {channelId}, description, title, thumbnails: {high: {url}}}} = item;
                        ytWrapper.innerHTML += `
                            <div class="yt" data-youtuber="${channelId}">
                                <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                                    <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                                </div>
                                <div class="yt-title">${title}</div>
                                <div class="yt-channel">${description}</div>
                            </div>
                        `;
                    }catch(err){
                        console.error(err);
                    }
                });

                ytWrapper.querySelectorAll('.yt').forEach(item => {
                    item.addEventListener('click', () => {
                        request({
                            method: 'search',
                            part: 'snippet',//requered parameter
                            channelId: item.dataset.youtuber,//take it from youtube https:// bar
                            order: 'date',
                            maxResults: 6,
                        })
                    });
                });
            };


            const render = data => {
                console.log(data);
                const ytWrapper = document.getElementById('yt-wrapper');
                ytWrapper.textContent = '';
                data.forEach(item => {
                    try {
                        const {id, id: {videoId},snippet: {channelTitle,title,resourceId: {videoId: likedVideoId} = {},thumbnails: {high: {url}}}} = item;
                        ytWrapper.innerHTML += `
                            <div class="yt" data-youtuber="${likedVideoId || videoId || id}">
                                <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                                    <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                                </div>
                                <div class="yt-title">${title}</div>
                                <div class="yt-channel">${channelTitle}</div>
                            </div>
                        `;
                    }catch(err){
                        console.error(err);
                    }
                });

                youtuber();
            };


            gloTube.addEventListener('click', () => {
                request({
                    method: 'search',
                    part: 'snippet',//requered parameter
                    channelId: 'UCVswRUcKC-M35RzgPRv8qUg',//take it from youtube https:// bar
                    order: 'date',
                    maxResults: 6,
                })
            });
        
            trends.addEventListener('click', () => {
                request({
                    method: 'videos',
                    part: 'snippet',//requered parameter
                    chart: 'mostPopular',
                    regionCode: 'RU',
                    maxResults: 6,
                })
            });

            like.addEventListener('click', () => {
                request({
                    method: 'playlistItems',
                    part: 'snippet',//requered parameter
                    playlistId: 'LLHopmkOPhcCUUhbw-xnz0RQ',
                    maxResults: 6,
                })
            });

            subscriptions.addEventListener('click', () => {
                request({
                    method: 'subscriptions',
                    part: 'snippet',//requered parameter
                    mine: true,
                    maxResults: 6,
                })
            });

            searchForm.addEventListener('submit', event => {
                event.preventDefault();
                const valueImput = searchForm.elements[0].value;
                //console.log(searchForm.elements[0].value);
                //console.log(!!valueImput);// !! -- check if true or false no meter what
                if(!valueImput){
                    searchForm.style.border = '1px solid red'
                    return;
                }

                searchForm.style.border = '';
                
                request({
                    method: 'search',
                    part: 'snippet',//requered parameter
                    order: 'relevance',
                    maxResults: 6,
                    q: valueImput,
                })
                searchForm.elements[0].value = '';

                
            });
        }
    }
});