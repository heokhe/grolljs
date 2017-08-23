    (function() {
      //initial works
      //appending ripple to elements
      $('.btn, .pui-tab ul.tab-head li button,ul.pui-nav-tab li button,ul.pui-pagination li a, ul.pui-pill li button, .pui-nav ul.menu li a, .nav-toggle, .card-btn, .pui-alert .content .header .close').append("<div class='ripple-container'></div>")
      //plug-in for Checkboxes
      $('.pui-check input[type=checkbox]').is(function () {
          t = $(this)
          $(this).after('<label class="checkbox"><span class="box"></span><span class="ripple1"></span></label>')
          $(this).parent().find('label.checkbox').attr('for', t.attr('id'))
      })
      //plug-in for radio buttons
      $('.pui-radio input[type=radio]').is(function () {
          t = $(this)
          $(this).after('<label class="radio"><span class="circle"></span><span class="ripple"></span></label>')
          $(this).parent().find('label.radio').attr('for', t.attr('id'))
      })
      //tab line
      $('.tab-line').is(function () {
          t = $(this);
          r = t.parent().find('li').find('button[pui-tab-target].active').parent()
          w = t.parent().find('li').width()
          t.css({
              'left': r.position().left,
              'width': w
          })
      })
      //tabs
      $('[pui-tab-target]').click(function () {
          t = $(this)
          $( t.parent().parent().find('.active').attr('pui-tab-target') ).removeClass('active')
          t.parent().parent().find('.active').removeClass('active')
          //$( t.parent().parent().parent().find('.tab-part.active') ).removeClass('active')
          t.addClass('active')
          $( t.attr('pui-tab-target') ).addClass('active');
          w = t.parent().parent().find('li').find('button[pui-tab-target].active').parent().width();
          line = t.parent().parent().find('.tab-line');
          r = t.parent().parent().find('li').find('button[pui-tab-target].active').parent()
          line.css({
              'width': w,
              'left': r.position().left
          })
      })
    }());
    ;(function() {
      //dropdowns
      $('.pui-dropdown [pui-dropdown-toggler]').is(function () {
          t = $(this);
          c = {};
          c.a = function () {
              t.attr('aria-open', false)
          }
      })
    }());
    +(function() {
      $('[pui-collapse-target]').click(function() {
          $( $(this).attr('pui-collapse-target') ).slideToggle(200)
      })

      $('.card.hover-effect').bind('mouseover', function () {
          $(this).addClass('--is-hovered')
      })

      $('.card.hover-effect').bind('mouseout', function () {
          $(this).removeClass('--is-hovered')
      })
    }());
    !(function() {
      $('[data-close]').click(function () {
          t = $(this);
          if (t.data('close') == 'notifbox' && t.parent().hasClass('pui-notifbox')) {
              if (t.parent().hasClass('animated')) {
                  t.parent().animate({
                      height:0,
                      //margin:0,
                      paddingTop:0,
                      paddingBottom: 0,
                      opacity:0
                  }, 300);
                  setTimeout(function () {
                      t.parent().remove()
                  }, 301);
              } else {
                  t.parent().remove()
              }
          } else {

          }
      })
    }());
    var _pui = {
      fn: {
          alert: function (o) {
              a = document.createElement('div');
              a.classList.add('pui-alert');
              setTimeout(function () {
                  a.classList.add('active')
                  $( a ).find('.btn').append("<div class='ripple-container waves-effect'></div>");
              }, 1);
              $('body').append(a).addClass('--alert-is-open');
              a.setAttribute('data-knownby', 'alert' + Date.now());
              c = document.createElement('div');
              c.classList.add('content');
              a.appendChild(c);
              header = document.createElement('div')
              header.classList.add('header');
              c.appendChild(header);
              closeButton = document.createElement('button')
              closeButton.classList.add('close', 'material-icons')
              $( closeButton ).click(function () {
                  j = $(this).parent().parent().parent();
                  j.removeClass('active')
                  setTimeout(function () {
                      j.remove()
                  }, 425);
                  $('body').removeClass('--alert-is-open');
              })
              closeButton.innerHTML = 'close';
              header.appendChild(closeButton);
              title = document.createElement('h5')
              header.appendChild(title)
              title.innerHTML = o.title;
              body = document.createElement('div');
              body.classList.add('body')
              body.innerHTML = o.text;
              c.appendChild(body);
              footer = document.createElement('footer');
              c.appendChild(footer)
              if ( o.customButton == undefined) {
                  void 0
              } else {
                  customButton = document.createElement('button');
                  customButton.classList.add('btn', 'sm', 'simple', o.customButton.theme);
                  footer.appendChild( customButton )
                  customButton.innerHTML = o.customButton.text;
                  $(customButton).click(function () {
                      if (o.customButton.func != null) {
                          o.customButton.func()
                      }
                      (function() {
                          if (o.customButton.close == undefined || o.customButton.close == true){
                              j = $(customButton).parent().parent().parent()
                              j.removeClass('active')
                              setTimeout(function () {
                                  j.remove()
                              }, 425);
                              $('body').removeClass('--alert-is-open');
                          } else if (o.customButton.close == false) {
                              void 0
                          } else {
                              throw new Error(' ')
                          }
                      }());
                  })
              }
              if (o.closeButton == undefined) {
                   void 0
              } else {
                  footerCloseButton = document.createElement('button');
                  footerCloseButton.innerHTML = o.closeButton.text;
                  footerCloseButton.classList.add('btn', 'sm', 'simple');
                  (function() {
                      o.closeButton.theme == undefined ? footerCloseButton.classList.add('gray') : footerCloseButton.classList.add( o.closeButton.theme )
                  }());
                  footer.appendChild(footerCloseButton);
                  $( footerCloseButton ).click(function () {
                      j = $(this).parent().parent().parent();
                      j.removeClass('active')
                      setTimeout(function () {
                          j.remove()
                      }, 425);
                      $('body').removeClass('--alert-is-open');
                  })
              }
              return null;
          }/*,
          snackbar: function (o) {
              s = document.createElement('div')
              s.classList.add('pui-snackbar')
              $('body').append(s)
              setTimeout(function () {
                  s.classList.add('active')
                  $( s ).find('.close').append("<div class='ripple-container waves-effect'></div>");
              }, 1);
              i = document.createElement('span')
              i.classList.add('inner')
              s.appendChild(i)
              i.innerHTML = o.text;
              if (o.button != null) {
                  bc = document.createElement('div')
                  bc.classList.add('button-container');
                  s.appendChild(bc)
                  b = document.createElement('button');
                  b.innerHTML = o.button.text;
                  b.classList.add('btn', 'simple', 'close', 'sm');
                  (function() {
                      o.button.theme == undefined ? b.classList.add('primary') : b.classList.add(o.button.theme);
                  }());
                  bc.appendChild(b);
                  $(b).click(function () {
                      if (o.button.func != undefined || o.button.func != null) {
                          o.button.func();
                      }
                      if (o.button.close == undefined || o.button.close == true) {
                          clearTimeout( destroying )
                          s.classList.remove('active')
                          setTimeout(function () {
                              $(s).remove()
                          }, 126);
                      } else {
                          void 0
                      }
                  })
              }
              destroying = setTimeout(function () {
                  s.classList.remove('active')
                  setTimeout(function () {
                      $(s).remove()
                  }, 126);
              }, o.destroyTime == undefined ? 6000 : o.destroyTime)
          }*/
      }
    }

function $snackbar(i) {
      'use strict';
      //Just a function to create elements, give a class to them and appending them to a parent.
      function create(a, b, c) {
        var el = $('<' + a + ' class=' + b + ' />');
        el.appendTo( $(c) );
        return el;
      }
      //Initial build
      var snack = create('div', 'pui-snackbar', 'body'),
      inner = create('div', 'inner', snack),
      button_container = create('div', 'button-container', snack);
      //activate the snack
      snack.addClass('active');
      //create button, if it exists. (if it's defined in the options)
      var button = i.button && typeof i.button === 'object' ? create('button', 'btn', button_container) : void 0;
      button.addClass('simple').addClass('sm').addClass( i.button.theme || 'primary' ).addClass('block');
      button.text( i.button.text );
        //Add ripple to button
      create('div', 'ripple-container', button);
      //write the main text
      inner[0].innerHTML = i.text;
      //button click event
      button.click(function () {
        'func' in i.button && typeof i.button.func === 'function' ? i.button.func() : void 0;
        //Close the snack on click
        if ( i.button.close == !0 || !i.button.close ) {
          clearTimeout( removeOnTime );
          snack.removeClass('active').on('transitionend', function() {
            $(this).remove()
          })
        } else {
          return null;
        }
      });
      //removing on time out
      var time = i.time || 6000,
      removeOnTime = function () {
        setTimeout(function () {
          snack.removeClass('active').on('transitionend', function () {
            $(this).remove()
          })
        }, time);
      };
      removeOnTime()
    }

    $('.pui-ftl').is(function () {
      var s = $(this);
      var f = {prototype:{}};
      f.prototype.scrollTarget = function(el) {
          return el.data('ftl-target') == undefined ? 0 : el.data('ftl-target');
      };
      f.prototype.scrollParentDetect = function (el) {
          return el.data('ftl-parent') == undefined || el.data('ftl-parent') == 'document' ? 'html,body' : el.data('ftl-parent')
      };
      f.prototype.scrollSpeed = function (el) {
          return el.data('ftl-speed')
      };
      f.prototype.scrollOffset = function (el) {
          return el.data('ftl-offset')
      };
      f.prototype.activate = function (el) {
          el.addClass('ftl-is-active')
      };
      f.prototype.deactivate = function (el) {
          el.removeClass('ftl-is-active')
      };
      f.prototype.ftlClassSwitch = function (el) {
          $(window).scroll(function () {
              if ( $(window).scrollTop() > f.prototype.scrollOffset(el)) {
                  f.prototype.activate(el)
              } else {
                  f.prototype.deactivate(el)
              }
          })
      };
      f.prototype.ftlScrollTo = function (el) {
          el.click(function () {
              $( f.prototype.scrollParentDetect(el) ).animate({
                  scrollTop: f.prototype.scrollTarget(el)
              }, f.prototype.scrollSpeed(el));
              this.click(false)
          })
      };
      f.prototype.ftl$do_it = function (el) {
          f.prototype.ftlClassSwitch(el);
          f.prototype.ftlScrollTo(el)
      };
      f.prototype.ftl$do_it(s)
    })
    ;(function() {
      'use strict';
      const showEvent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'touchstart' : 'mousedown';
      const hideEvent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'touchend' : 'mouseup';
      $(document).on(showEvent, '.btn, .pui-tab ul.tab-head li button,ul.pui-nav-tab li button,ul.pui-pagination li a, ul.pui-pill li button, .pui-nav ul.menu li a, .nav-toggle, .card-btn, .pui-alert .content .header .close, [ripple]', function(e){
        if (e.button == 2){
            return false
        }
      	var $ripple = $('<span class="ripple-effect" />'),
      	$button = $(this).find('.ripple-container'),
      	$offset = $button.offset(),
      	xPos = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && 'touches' in e ? ( e.touches[0].pageX - $offset.left ) : (e.pageX - $offset.left),
      	yPos = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && 'touches' in e ? ( e.touches[0].pageY - $offset.top ) : (e.pageY - $offset.top),
      	$color = $button.parent().data('ripple-color') || $button.parent().css('color'),
      	scaledSize = Math.max( $button.width() , $button.height()) * Math.PI * 1.5,
        speed = 700/3;
      	$ripple.css({
      		'top': yPos,
      		'left': xPos,
      		'background-color': $color
      	}).appendTo( $button ).animate({
      		'height': scaledSize,
      		'width': scaledSize
      	}, speed*2);
          $(document).on(hideEvent, $button, function (e) {
              $ripple.animate({
                  opacity: 0
              }, speed, function () {
                  $(this).remove()
              })
          })
      })
    }());
