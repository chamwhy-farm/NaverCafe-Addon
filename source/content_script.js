/** 
 * @author Wei756 <wei756fg@gmail.com> 
 * @license MIT
 */
 
jQuery(function($){
    console.log("hello");
    $(window.setTopInIframe).ready(() => {
        console.log(window.setTopInIframe);
    });
    $(document).last().ready(() => {
        setEvery();
        injectLikeItUI();
        injectBestArticleUI();
        injectDarkmodeUI();
        checkActivityStop();
        newUI();
    });

    function setEvery(){
        $('.link_naver').attr("href", "https://cafe.naver.com/steamindiegame.cafe");
    }

    function newUI(){
        console.log(!$('#twitchembed').length);
        if(!$('#twitchembed').length){
            const twitchPickerHtml = `
            <li id="woowakgood" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/ebc60c08-721b-4572-8f51-8be7136a0c96-profile_image-70x70.png">
            </li>
            <li id="vo_ine" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/ecd6ee59-9f18-4eec-b8f3-63cd2a9127a5-profile_image-70x70.png">
            </li>
            <li id="jingburger" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/330b695d-63ec-41cb-baca-a191a7bbc441-profile_image-70x70.png">
            </li>
            <li id="lilpaaaaaa" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/3b5e6d73-8935-449f-902b-1b94a386e137-profile_image-70x70.png">
            </li>
            <li id="cotton__123" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/789fa11b-d136-4c85-ae68-abb8e582e21c-profile_image-70x70.png">
            </li>
            <li id="gosegugosegu" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/1e4cac72-a1cd-4f72-8ada-b2d10ac990d7-profile_image-70x70.png">
            </li>
            <li id="viichan6" class="twitch-picker">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/700b60f8-4bbf-4567-918f-e72a4638d838-profile_image-70x70.png">
            </li>
            `;

            const testHtml = `
            <div id="twitch-area">
                
                <div id="twitchembed">
                    <iframe
                        id="twitchVideo"
                        src=""
                        height="720"
                        width="1280"
                        allowfullscreen="true"
                        frameBorder=0>
                    </iframe>
                    <div id="twitchSub">
                        <div id="twitchSub-warp">
                            <div id="twitch-picker">
                                <ul id="twitch-picker-list">
                                    ${twitchPickerHtml}
                                </ul>
                            </div>
                            <div id="wakzooExtension">
                                <div id="wakzooSetting">
                                    <div class="wakzoo-slider">
                                        <div id="twitchImg">
                                            <img src="https://blog.kakaocdn.net/dn/bcnQxm/btqxxcBMWAP/kaLL026jtnwid4IbuXkQoK/img.png"/>
                                        </div>
                                        <label class="switch-button"> 
                                            <input id="twitchToggle" type="checkbox" checked/> 
                                            <span class="onoff-switch"></span> 
                                        </label>
                                    </div>
                                    <div class="soon">
                                        추가해나갈 예정
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <iframe 
                            id="twitchChat"
                            src=""
                            height="495"
                            width="440"
                            frameBorder=0>
                        </iframe>
                    </div>
                    
                </div>
                
            </div>
            `;

            

            const twitchInject = $(testHtml);
            $('#cafe-body>#content-area>#main-area').has('iframe').append(twitchInject);
            $('.twitch-picker').click(function(){
                console.log("click");
                const streamerName = $(this).attr("id");
                $('#twitchVideo').attr("src", `https://player.twitch.tv/?channel=${streamerName}&parent=cafe.naver.com${document.documentElement.getAttribute("data-dark") ? '&darkpopout' : ''}`);
                $('#twitchChat').attr("src", `https://www.twitch.tv/embed/${streamerName}/chat?parent=cafe.naver.com${document.documentElement.getAttribute("data-dark") ? '&darkpopout' : ''}`);
            });

            function twitchReset(checked){
                if(checked){
                    console.log('twitch on');
                    $('#twitch-picker-list').show();
                    $('#twitchVideo').attr("src", `https://player.twitch.tv/?channel=woowakgood&parent=cafe.naver.com${document.documentElement.getAttribute("data-dark") ? '&darkpopout' : ''}`);
                    $('#twitchChat').attr("src", `https://www.twitch.tv/embed/woowakgood/chat?parent=cafe.naver.com${document.documentElement.getAttribute("data-dark") ? '&darkpopout' : ''}`);
                }else{
                    console.log('twitch off');
                    $('#twitch-picker-list').hide();
                    $('#twitchVideo').attr("src", "");
                    $('#twitchChat').attr("src", "");
                }
            }
            $('#twitchToggle').change(function(){
                const onoff = $(this).is(':checked');
                twitchReset(onoff);
                chrome.storage.sync.set({'twitchToggle': onoff}, function() {
                    console.log('twitchToggle is set to ' + onoff);
                });
            });

            chrome.storage.sync.get(['twitchToggle'], function(result) {
                console.log('twitchToggle get is ' + result['twitchToggle']);
                $('#twitchToggle').prop("checked", result['twitchToggle']);
                twitchReset(result['twitchToggle']);
            });

            resized();
            
            $(window).resize(resized);
        }
        
    }

    function resized(){
        const width = $('#main-area').width() - 860 - 32;
        $('#twitchVideo').width(width); 
        $('#twitchVideo').height(width * 9/16); 
    }
    

    function injectDarkmodeUI() {
        if ($('#front-img').length == 1) {
            $('#front-img').remove();
            const btnDarkmodeHtml = '<button id="NM_darkmode_btn" type="button" role="button" class="btn_theme" aria-pressed="false"> <span class="blind">라이트 모드로 보기</span></button>';
            const btnContentTopHtml = '<a id="NM_scroll_top_btn" href="" class="content_top"><span class="blind">TOP</span></a>';
            const btnDarkmode = $(btnDarkmodeHtml);
            const btnContentTop = $(btnContentTopHtml);
            const body = $('body');
            body.append(btnDarkmode);
            body.append(btnContentTop);
            
            isDarkmode(darkmode => {
                btnDarkmode.attr('aria-pressed', darkmode);
                btnDarkmode.on('click', () => {
                    setDarkmode(!darkmode);
                    location.reload(true);
                });
            });
            btnContentTop.click(e => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })
        }
    }

    /** 
     * @description 좋아요한 글 목록 UI를 삽입합니다.
     */
    function injectLikeItUI() {
        const link = '<a href="#" class="likeit link_sort"">좋아요한 글</a>';
        const profileArea = $('.article-board.article_profile');
        profileArea.ready(() => {
            // 좋아요한 글 링크
            const page = $(link);
            profileArea.find('.list-style > .sort_area').append(page);
            page.on('click', () => {
                location.href = location.href.replace('&likeit.page=true', '')
                                            .replace('&likeit.timestamp=', '&likeit.dump=')
                                            .replace('&blocking.page=true', '')
                                            .replace('&blocking.type=', '&blocking.dump=')
                                            .replace('#', '') + '&likeit.page=true'; // 좋아요한 글 페이지로 이동
            });

            // 좋아요 페이지 로딩
            const params = getURLParams();
            const isLikeIt = params['likeit.page'];
            const timestamp = params['likeit.timestamp'];
            if (isLikeIt && isLikeIt.replace('#', '') === 'true') { // 좋아요한 글 페이지면
                loadLikeIt(timestamp ? timestamp : '');
            }
        });
    }

    /** 
     * @description 인기글 목록 UI를 삽입합니다.
     */
    function injectBestArticleUI() {
        const link_best = '<li class="best" aria-selected="false"><a href="#" class="link">인기글</a></li>';
        $('a#menuLink-1').ready(() => {
            $('a#menuLink-1').prop('href', "/BestArticleList.nhn?clubid=27842958&period=week&listtype=commentcount&best=true");
        });
        $('ul.list_sub_tab').ready(() => {
            // 인기글 링크
            if (location.href.indexOf('BestArticleList.nhn') != -1) {
                var page = $(link_best);
                $('ul.list_sub_tab').prepend(page);
                page.on('click', () => {
                    location.href = location.href.replace('&best=true', '')
                                                .replace('#', '') + '&best=true';
                });
            }

            // 인기글 페이지 로딩
            const params = getURLParams();
            const isBest = params['best'];
            if (isBest && isBest.replace('#', '') === 'true') { // 인기글 페이지면
                parent.document.querySelector('#cafe_main').style.height = '7200px';
                loadBestArticle();
            }
        });
    }

    /** 
     * @description 좋아요한 글 목록을 불러옵니다.
     * @param {string} timestamp 타임스탬프
     */
    function loadLikeIt(timestamp) {
        const main_area = $('#main-area');
        const section = main_area.children('.article-board.article_profile');
        const sort_area = section.find('.sort_area');

        const tableHtml = '<table><caption><span class="blind">게시글 목록</span></caption><colgroup><col><col style="width:120px"><col style="width:100px"><col style="width:80px"></colgroup><thead><tr><th scope="col">제목</th><th scope="col" class="th_name">작성자</th><th scope="col">작성일</th><th scope="col">조회</th></tr></thead><tbody></tbody></table>';
        const table = $(tableHtml);
        // 기존 UI 제거
        sort_area.children('.link_sort.on').removeClass('on');
        sort_area.children('.link_sort.likeit').addClass('on');
        main_area.children('.post_btns').remove();
        main_area.children('.prev-next').html('');
        section.children('table').remove();

        section.append(table);

        const params = getURLParams();
        const clubid = params['search.clubid'];
        var memberid = params['search.query'] || params['search.writerid'];
        memberid = memberid.replace('#', '');
        getLikeItArticles(
            clubid, 
            memberid, 
            '20', 
            timestamp, 
            data => {
                dispLikeItArticles(data, clubid, memberid, '20', timestamp);
            }
        );
    }

    let stateShowBestThumb = true;
    /** 
     * @description 인기글 목록을 불러옵니다.
     */
    function loadBestArticle() {
        const main_area = document.getElementById('main-area');

        main_area.querySelector('ul.list_sub_tab > li.on').setAttribute('aria-selected', 'false');
        main_area.querySelector('ul.list_sub_tab > li.on').classList.remove('on');
        main_area.querySelector('ul.list_sub_tab > li.best').classList.add('on');
        main_area.querySelector('ul.list_sub_tab > li.best').setAttribute('aria-selected', 'true');

        $('div.list-style .sort_area *').remove();
        const thumb_show = $('<div class="check_box"><input type="checkbox" id="thumb_show"><label for="thumb_show">썸네일 미리보기</label></div>');
        $('div.list-style .sort_area').append(thumb_show);

        thumb_show.find('#thumb_show').on('change', e => {
            const val = !stateShowBestThumb;
            setShowBestThumb(val, () => {
                setStateShowBestThumb(val);
            });
        });
        main_area.querySelector('table.board-box > tbody').remove();
        
        const params = getURLParams();
        const clubid = params['clubid'];
        getBestArticles(clubid, data => {
            dispBestArticles(data);
            isShowBestThumb(setStateShowBestThumb);

            // 유저 차단 적용
            doBlock();
        });
    }
    /** 
     * @description 썸네일 표시여부 상태를 설정합니다.
     */
    function setStateShowBestThumb(val) {
        stateShowBestThumb = val;
        $('#thumb_show').prop('checked', val);
        const bestArticleList = $('#bestArticleList');
        bestArticleList.attr('class', val ? 'showThumb' : '');
    }

    /** 
     * @description 좋아요한 글 데이터를 불러옵니다.
     * @param {string} cafeid 카페 id
     * @param {string} memberid 회원 id
     * @param {string} count 출력할 개수
     * @param {string} timestamp 타임스탬프
     * @param {function} callback 콜백 함수
     */
    function getLikeItArticles(cafeid, memberid, count, timestamp, callback) {
        const url = 'https://m.cafe.naver.com/CafeMemberLikeItList.nhn?search.cafeId=' + cafeid + 
                '&search.memberId='+ memberid +
                '&search.count='+ count +
                '&search.likeItTimestamp=' + timestamp;
        $.ajax({
            type: 'POST',
            url: url,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback,
            error: function (xhr) {
                alert('좋아요한 글을 불러오는 데 실패하였습니다.');
                alert(xhr.responseText);
            }
        })
    }

    
    /** 
     * @description 인기글 데이터를 불러옵니다.
     * @param {string} cafeid 카페 id
     * @param {function} callback 콜백 함수
     */
    function getBestArticles(cafeid, callback) {
        var url = 'https://apis.naver.com/cafe-web/cafe2/WeeklyPopularArticleList.json?cafeId=' + cafeid;
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback,
            error: xhr => {
                alert('인기글을 불러오는 데 실패하였습니다.');
                alert(xhr.responseText);
            }
        })
    }

    /** 
     * @description 좋아요한 글 목록을 출력합니다.
     * @param {string} data 좋아요한 글 html
     * @param {string} cafeid 카페 id
     * @param {string} memberid 회원 id
     * @param {string} count 출력할 개수
     * @param {string} timestamp 타임스탬프
     */
    function dispLikeItArticles(data, cafeid, memberid, count, timestamp) {
        const prevnext_html = '<a href="#" class="pgL"><span class="m-tcol-c">처음으로</span></a><a href="#" class="pgR"><span class="m-tcol-c">다음</span></a>';
        const main_area = document.querySelector('#main-area');
        const section = main_area.querySelector('.article-board.article_profile');
        
        main_area.querySelector('.prev-next').innerHTML = prevnext_html;
        if (!timestamp) { // 첫페이지
            main_area.querySelector('.prev-next > .pgL').remove();
        } else {
            main_area.querySelector('.prev-next > .pgL').addEventListener('click', () => { // 처음으로
                location.href = location.href.replace('&likeit.timestamp=', '&likeit.dump=')
                                            .replace('#', '') + '&likeit.timestamp=';
            });
        }

        const articles = $('<div>' + data + '</div>').children('li');
        
        main_area.querySelector('.prev-next > .pgR').addEventListener('click', () => { // 다음 페이지
            location.href = location.href.replace('&likeit.timestamp=', '&likeit.dump=')
                                        .replace('#', '') + '&likeit.timestamp=' + articles[articles.length - 1].getAttribute('data-timestamp');
        });

        const table = section.querySelector('table > tbody');
        table.innerHTML += geneLikeItArticles(articles, cafeid);
    }

    /** 
     * @description 좋아요한 글 목록 HTML을 생성합니다.
     * @param {Object} articles
     */
    function geneLikeItArticles(articles, cafeid) {
        var innerHtml = '';
        articles.each((i, itemData) => {
            const item = $(itemData);

            const articleListItem = item.find('._articleListItem');

            const articleId = articleListItem.attr('data-article-id');
            const articleUrl = `https://cafe.naver.com/ArticleRead.nhn?clubid=${cafeid}&articleid=${articleId}`;
            const title = articleListItem.find('strong.tit').text();
            const imgIcon = item.find('.thumb_area').length ? '<span class="list-i-img"><i class="blind">사진</i></span>' : '';
            const pollIcon = item.find('.icon_poll').length ? '<span class="list-i-poll"><i class="blind">투표</i></span>' : '';
            const linkIcon = articleListItem.find('.icon_link').length ? '<span class="list-i-link"><i class="blind">링크</i></span>' : '';
            const uploadIcon = item.find('.icon_file').length ? '<span class="list-i-upload"><i class="blind">파일</i></span>' : '';
            const newIcon = articleListItem.find('.icon_new_txt').length ? '<span class="list-i-new"><i class="blind">new</i></span>' : '';

            const comment = item.find('.link_comment > em.num').text();
            const nickname = articleListItem.find('.user_area > span.nick > span.ellip').text();
            const date = articleListItem.find('.user_area > span.time').text();
            const view = articleListItem.find('.user_area > span.no').text();

            innerHtml += `
            <tr>
                <td class="td_article">
                    <div class="board-number"><div class="inner_number">${articleId}</div></div>
                    <div class="board-list"><div class="inner_list">
                        <a class="title_txt" target="_parent" href="${articleUrl}">${title}</a>${imgIcon}${pollIcon}${linkIcon}${uploadIcon}
                        <a href="${articleUrl + '&commentFocus=true'}" target="_parent" class="cmt">[<em>${comment}</em>]</a>${newIcon}
                    </div></div>
                </td>
                <td class="td_name"><div class="pers_nick_area"><table role="presentation" cellspacing="0"><tbody><tr><td class="p-nick"><a href="#" class="m-tcol-c"><div class="ellipsis m-tcol-c">${nickname}</div></a></td></tr></tbody></table></div></td>
                <td class="td_date">${date}</td>
                <td class="td_view">${view}</td>
            </tr>`;
        });
        return innerHtml;
    }
    
    /** 
     * @description 인기글 목록을 출력합니다.
     * @param {JSON} data 인기글 JSON
     */
    function dispBestArticles(data) {
        const table = document.querySelector('#main-area .article-board table');

        const list = data['message']['result']['popularArticleList'];

        // 인기글 표시 영역 height 설정
        parent.document.getElementById('cafe_main').style.height = (list.length * 37 + 250) + 'px';

        // 인기글 목록 삽입
        table.innerHTML += `<tbody id="bestArticleList" class="showThumb">${geneBestArticles(list)}</tbody>`;
    }

    /** 
     * @description 인기글 목록 HTML을 생성합니다.
     * @param {Array} list 인기글 array (message->result->popularArticleList)
     */
    
    function geneBestArticles(list) {
        var innerHtml = '';
        list.map((itemData, i, arr) => {
            const { 
                cafeId, articleId, subject, representImage, representImageType, commentCount, formattedCommentCount, newArticle, nickname, writerId, aheadOfWriteDate, formattedReadCount, upCount, memberLevel
            } = itemData;
            console.log(itemData, arr, representImage);
            // 인기글 URL
            const articleUrl = `https://cafe.naver.com/ArticleRead.nhn?clubid=${cafeId}&articleid=${articleId}`;

            // 미디어 아이콘
            const mediaType = {
                I: {className: 'img', label: '사진'},
                G: {className: 'img', label: '사진'},
                M: {className: 'movie', label: '동영상'},
            }
            const currMedia = mediaType[representImageType];
            const mediaIcon = currMedia    ? `<span class="list-i-${currMedia['className']}"><i class="blind">${currMedia['label']}</i></span>` : '';
            // 댓글
            const comment   = commentCount ? `<a href="${articleUrl + '&commentFocus=true'}" class="cmt">[<em>${formattedCommentCount}</em>] </a>` : '';
            // 새 글 아이콘
            const newIcon   = newArticle   ? '<span class="list-i-new"><i class="blind">new</i></span>' : '';

            // 작성자 드롭다운 메뉴
            const nickOnClick = `ui(event, '${writerId}',3,'${nickname}','${cafeId}','me', 'false', 'true', '', 'false', '0'); return false;`;

            // 썸네일 오버레이
            const thumbnail = representImage ? `
            <td class="best_thumb_area">
                <div class="thumb">
                    <img src="${representImage}" width="100px" height="100px" alt="본문이미지" onerror="this.style.display='none';" class="image_thumb">
                </div>
            </td>` : '';

            /*
            innerHtml += `
            <li class="bestArticleItem" align="center">
                <div class="b_index">${i + 1}</div>
                <div class="b_title"><span><a class="title" href="${articleUrl}">${subject}</a> ${mediaIcon} ${comment}${newIcon}</span></div>
                <div class="b_nick"><a href="#" class="nickname" onclick="${nickOnClick}">${nickname}</a></div>
                <div class="b_date">${aheadOfWriteDate}</div>
                <div class="b_view">${formattedReadCount}</div>
                <div class="b_likeit">${upCount}</div>
                ${thumbnail}
            </li>`;
            */

            innerHtml += `
            <tr class="bestArticleItem" align="center">
                <td colspan="2">
                    <span class="m-tcol-c list-count">
                        ${i + 1}
                    </span>
                </td>
                <td align="left" class="board-list">
                    <a class="article" href="${articleUrl}" onclick="clickcr(this, 'gnr.title','','',event);">
                        <span class="head"></span>
                        ${subject}
                    </a>
                        ${mediaIcon}
                        ${comment}
                        ${newIcon}
                    </div>
                </td>
                <td class="p-nick">
                    <div class="pers_nick_area">
                        <table role="presentation" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="p-nick">
                                        <a href="#" class="m-tcol-c" onclick="${nickOnClick}" style="word">${nickname}</a><!--
                                        --><span class="mem-level">
                                            <img src="https://cafe.pstatic.net/levelicon/1/1_${memberLevel}.gif" width="11" height="11">
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td class="td_date">${aheadOfWriteDate}</td>
                <td class="td_view">${formattedReadCount}</td>
                <td class="td_likes">${upCount}</td>
                ${thumbnail}
            </tr>
            `;
        });
        return innerHtml;
    }

    isDarkmode(darkmode => {
        if (darkmode) {
            document.documentElement.setAttribute('data-dark', 'true');
        }
    })

    /** 
     * @description 다크 모드를 설정합니다.
     * @param {boolean} bool 추가할 데이터
     */
    function setDarkmode(bool) {
        getBlockList(items => {
            items.darkmode = bool;
            chrome.storage.sync.set(items, () => { 
            });
        });
    }
    
    /** 
     * @description 다크 모드 상태를 불러옵니다.
     * @param {function} callback 콜백 함수
     */
    function isDarkmode(callback) {
        getBlockList(items => {
            callback(items.darkmode);
        });
    }

    /**
     * @description 현재 보고 있는 회원이 활동정지 상태인지 확인하고 그 상태를 프로필에 표시합니다.
     */
    function checkActivityStop() {
        if (location.href.indexOf('CafeMemberNetworkView.nhn') !== -1) { // 프로필 페이지
            const params = getURLParams();
            const { clubid, memberid } = params;
            getActivityStop({
                cafeid: clubid, 
                memberid: memberid,
                callback: stopped => {
                    if (stopped) {
                        document.querySelector('.pers_nick_area .p-nick a.m-tcol-c').innerHTML += '<span>(활동 정지됨)</span>';
                    }
                }
            });
        }
    }

});