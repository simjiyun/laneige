(($, window, document, undefined) => {
    class Laneige {
        init(){
            this.parallax();
            this.header();
            this.section1();
            this.section2();
            this.footer();
            this.goTop();
        }
        parallax(){
            let object = {
                init(){
                    this.section2();
                    this.section3();
                    this.section4();
                    this.section5();
                    this.section6();
                },
                section2(){
                    const Window = $(window);
                    const sec2Title = $('#section2 #title h2');
                    const sec2Contents = $('#section2 #contents');
                    let sec2TitleTop = sec2Title.offset().top - Window.height();

                    Window.scroll(function(){
                        if(Window.scrollTop() == 0){
                            sec2Title.removeClass('addParallax');
                            sec2Contents.removeClass('addParallax');
                        }
                        if(Window.scrollTop() > sec2TitleTop){
                            sec2Title.addClass('addParallax');
                            sec2Contents.addClass('addParallax');
                        }
                    });
                },
                section3(){
                    const Window = $(window);
                    const sec3Col = $('#section3 .col');
                    let sec3ColTop = sec3Col.offset().top - Window.height();
                    
                    Window.scroll(function(){
                        if(Window.scrollTop() == 0){
                            sec3Col.removeClass('addParallax');
                        }
                        if(Window.scrollTop() > sec3ColTop){
                            sec3Col.addClass('addParallax');
                        }
                    });
                },
                section4(){
                    const Window = $(window);
                    const sec4 = $('#section4');
                    const sec4Con = $('#section4 .con');
                    let sec4Top = sec4.offset().top - Window.height();
                    let sec4ConTop = sec4.offset().top - Window.height();

                    Window.scroll(function(){
                        if(Window.scrollTop() == 0){
                            sec4.removeClass('addParallax');
                            sec4Con.removeClass('addParallax');
                        }
                        if(Window.scrollTop() > sec4Top){
                            sec4.addClass('addParallax');
                        }
                        if(Window.scrollTop() > sec4ConTop){
                            sec4Con.addClass('addParallax');
                        }
                    });
                },
                section5(){
                    const Window = $(window);
                    const sec5Title = $('#section5 .title');
                    const sec5Rev = $('#section5 .rev');
                    const sec5Btn = $('#section5 .more-btn');
                    let sec5Top = sec5Title.offset().top - Window.height()-700;

                    Window.scroll(function(){
                        if(Window.scrollTop() == 0){
                            sec5Title.removeClass('addParallax');
                            sec5Rev.removeClass('addParallax');
                            sec5Btn.removeClass('addParallax');
                        }
                        if(Window.scrollTop() > sec5Top){
                            sec5Title.addClass('addParallax');
                            sec5Rev.addClass('addParallax');
                            sec5Btn.addClass('addParallax');
                        }
                    });
                },
                section6(){
                    const Window = $(window);
                    const sec6 = $('#section6');
                    let sec6Top = sec6.offset().top - Window.height()-700;

                    Window.scroll(function(){
                        if(Window.scrollTop() == 0){
                            sec6.removeClass('addParallax');

                        }
                        if(Window.scrollTop() > sec6Top){
                            sec6.addClass('addParallax');

                        }
                    });
                }
            }
            object.init();
        }
        header(){
            const Window = $(window);
            const Header = $('#header');
            let newTop = Window.scrollTop();
            let oldTop = newTop;
            let X = '';

            Window.scroll(() => {
                if(Window.scrollTop() == 0){
                    Header.removeClass('addH60');
                }
                else {
                    Header.addClass('addH60');
                    
                    newTop = Window.scrollTop();
                    X = oldTop - newTop > 0 ? 'UP' : 'DOWN';

                    if(X == 'UP'){
                        Header.addClass('addShow');
                        Header.removeClass('addHide');
                    }
                    if(X == 'DOWN'){
                        Header.addClass('addHide');
                        Header.removeClass('addShow');
                    }
                    oldTop = newTop;
                }
            });

            const mainBtn = $('.main-btn');
            const sub = $('.sub');
            const nav = $('#nav');

            mainBtn.on({
                mouseenter(){
                    const $this = $(this);
                    mainBtn.removeClass('addHover');
                    $this.addClass('addHover');
                    sub.stop().slideUp(200);
                    $this.next().stop().slideDown(300);
                },
                focusIn(){
                    const $this = $(this);
                    mainBtn.removeClass('addHover');
                    $this.addClass('addHover');
                    sub.stop().slideUp(200);
                    $this.next().stop().slideDown(300);
                }
            });
            nav.on({
                mouseleave(){
                    mainBtn.removeClass('addHover');
                    sub.stop().slideUp(300);
                }
            });
        }
        section1(){
            const Window = $(window)
            const slideWrap = $('.slide-wrap');
            const sec1Title = $('#section1 .title');
            const playBtn = $('.play-btn');
            const pageBtn = $('.page-btn');
            const prevBtn = $('.prev-btn');
            const nextBtn = $('.next-btn');
            const slideView = $('.slide-view');
            let cnt = 0;
            let setId = null;
            let t = 0;
            let second = 0;
            let setId2 = null;
            let mouseStart = null;
            let mouseEnd = null;
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = null;
            let winW = Window.innerWidth();

            function mainSlide(){
                slideWrap.stop().animate({left:-winW*cnt},800,function(){
                    if(cnt>4){cnt=0}
                    if(cnt<0){cnt=4}
                    slideWrap.stop().animate({left:-winW*cnt},0);
                    sec1Title.addClass('addParallax');
                });
                pageEvent();
            }
            function nextCount(){
                cnt++;
                mainSlide();
                sec1Title.removeClass('addParallax');
            }
            function prevCount(){
                cnt--;
                mainSlide();
                sec1Title.removeClass('addParallax');
            }

            function autoTimer(){
                setId = setInterval(nextCount,5000);
                sec1Title.addClass('addParallax');
            }
            autoTimer();

            function pageEvent(){
                pageBtn.removeClass('addPage');
                pageBtn.eq(cnt>4?0:cnt).addClass('addPage');
            }
            pageBtn.each(function(idx){
                const $this = $(this);
                $this.on({
                    click: function(e){
                        e.preventDefault();
                        cnt = idx;
                        mainSlide();
                        stopfn();
                    }
                });   
            });

            function stopfn(){
                t = 1;
                playBtn.removeClass('pause');
                playBtn.addClass('play');
                clearInterval(setId);
                second = 0;
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    second++;
                    if(second>=5){
                        autoTimer();
                        clearInterval(setId2);
                        playBtn.addClass('pause');
                        playBtn.removeClass('play');
                    }
                },2000);
            }

            playBtn.on({
                click: function(e){
                    e.preventDefault();
                    if( t==0 ){
                        stopfn();
                    }
                    else if( t==1 ){
                        t=0;
                        playBtn.addClass('pause');
                        playBtn.removeClass('play');
                    }
                }
            });

            prevBtn.on({
                click: function(e){
                    e.preventDefault();
                    prevCount();
                    stopfn();
                }
            });
            nextBtn.on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                    stopfn();
                }
            });

            slideView.on({
                mousedown(e){
                    mouseStart = e.clientX;
                    dragStart = e.clientX - slideWrap.offset().left-winW;
                    mouseDown = true;
                    stopfn();
                },
                mouseup(e){
                    mouseEnd = e.clientX;
                    mouseDown = false;
                    if(mouseStart - mouseEnd > 0){
                        nextCount();
                    }
                    if(mouseStart - mouseEnd < 0){
                        prevCount();
                    }
                    stopfn();
                },
                mouseleave(e){
                    if(mouseDown !== true){return}
                    mouseEnd = e.clientX;
                    mouseDown = false;
                    if((mouseStart - mouseEnd) > 0){
                        nextCount();
                    }
                    if((mouseStart - mouseEnd) < 0){
                        prevCount();
                    }
                },
                mousemove(e){
                    if(!mouseDown){return}
                    dragEnd = e.clientX;
                    slideWrap.css({left: dragEnd - dragStart});
                    stopfn();
                }
            });
        }
        section2(){
            const cSlideWrap = $('.cSlide-wrap');
            const cPrevBtn = $('.cPrev-btn');
            const cNextBtn = $('.cNext-btn');
            let cnt = 0;
            let cSlideWrapWidth = cSlideWrap.width;

            function mainSlide(){
                cSlideWrap.stop().animate({left:-345*cnt},300, function(){
                    if(cnt>5){cnt=0}
                    if(cnt<0){cnt=5}
                    cSlideWrap.stop().animate({left:-345*cnt,},0);
                });
            }
            function nextCount(){
                cnt++;
                mainSlide();
            }
            function prevCount(){
                cnt--;
                mainSlide();
            }
            cNextBtn.on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                }
            });
            cPrevBtn.on({
                click: function(e){
                    e.preventDefault();
                    prevCount();
                }
            });
        }
        footer(){
            
        }
        goTop(){
            const Window =$(window);
            const goTop = $('.go-top');
            const htmlBody = $('html, body');

            goTop.on({
                click: function(){
                    htmlBody.stop().animate({scrollTop:0}, 500, 'easeOutExpo');
                }
            });
            goTop.stop().fadeOut(0);
            Window.scroll(function(){
                if(Window.scrollTop() >= 100){
                    goTop.stop().fadeIn(500);
                }
                else {
                    goTop.stop().fadeOut(300, 'easeOutExpo');
                }
            });
        }
    }
    const newLaneige = new Laneige();
    newLaneige.init();
})(jQuery, window, document);