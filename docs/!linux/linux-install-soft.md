---
title: Logiciels
category: Linux, Installation
---

## Elementary OS: Configurations

* Écrans:  
  Settings > Displays > 3840x2160 HiDPI -> 1920x1080 LoDPI

* Clavier:  
  Settings > Mouse & Touchpad > Touchpad > Physical secondary clicking > areas

* Applications par défaut:  
  Settings > Applications

* Menu contextuel "extract here"

  ``` bash
  sudo apt install io.elementary.contractor.file-roller
  ```

* Layout clavier:  
  Preferences > Keyboard > Layout + French (legacy, alt)

  ``` bash
  $ cat /etc/vconsole.conf
  KEYMAP=fr-latin9

  $ setxkbmap -print -verbose 10
  rules:      evdev
  model:      pc105
  layout:     fr,us
  variant:    latin9,
  options:    grp:alt_shift_toggl
  ```

  <details>
  <summary>keyboard_fr</summary>

  <pre>
default  partial alphanumeric_keys
  xkb_symbols &quot;basic&quot; {

      include &quot;latin&quot;

      name[Group1]=&quot;French&quot;;

      key &lt;AE01&gt;  { [ ampersand,          1,  onesuperior,   exclamdown ] };
      key &lt;AE02&gt;  { [    eacute,          2,   asciitilde,    oneeighth ] };
      key &lt;AE03&gt;  { [  quotedbl,          3,   numbersign,     sterling ] };
      key &lt;AE04&gt;  { [apostrophe,          4,    braceleft,       dollar ] };
      key &lt;AE05&gt;  { [ parenleft,          5,  bracketleft, threeeighths ] };
      key &lt;AE06&gt;  { [     minus,          6,          bar,  fiveeighths ] };
      key &lt;AE07&gt;  { [    egrave,          7,        grave, seveneighths ] };
      key &lt;AE08&gt;  { [underscore,          8,    backslash,    trademark ] };
      key &lt;AE09&gt;  { [  ccedilla,          9,  asciicircum,    plusminus ] };
      key &lt;AE10&gt;  { [    agrave,          0,           at,       degree ] };
      key &lt;AE11&gt;  { [parenright,     degree, bracketright, questiondown ] };
      key &lt;AE12&gt;  { [     equal,       plus,   braceright,  dead_ogonek ] };

      key &lt;AD01&gt;  { [         a,          A,           ae,           AE ] };
      key &lt;AD02&gt;  { [         z,          Z, guillemotleft,        less ] };
      key &lt;AD03&gt;  { [         e,          E,     EuroSign,         cent ] };
      key &lt;AD11&gt;  { [dead_circumflex, dead_diaeresis, dead_diaeresis, dead_abovering ] };
      key &lt;AD12&gt;  { [    dollar,   sterling,     currency,  dead_macron ] };

      key &lt;AC01&gt;  { [         q,          Q,           at,  Greek_OMEGA ] };
      key &lt;AC10&gt;  { [         m,          M,           mu,    masculine ] };
      key &lt;AC11&gt;  { [    ugrave,    percent, dead_circumflex, dead_caron] };
      key &lt;TLDE&gt;  { [twosuperior, asciitilde,     notsign,      notsign ] };

      key &lt;BKSL&gt;  { [  asterisk,         mu,   dead_grave,   dead_breve ] };
      key &lt;AB01&gt;  { [         w,          W,      lstroke,      Lstroke ] };
      key &lt;AB07&gt;  { [     comma,   question,   dead_acute, dead_doubleacute ] };
      key &lt;AB08&gt;  { [ semicolon,     period, horizconnector,   multiply ] };
      key &lt;AB09&gt;  { [     colon,      slash, periodcentered,   division ] };
      key &lt;AB10&gt;  { [    exclam,    section, dead_belowdot, dead_abovedot ] };

      include &quot;level3(ralt_switch)&quot;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;olpc&quot; {
      // Contact: Sayamindu Dasgupta &lt;sayamindu@laptop.org&gt;
      include &quot;fr(basic)&quot;

      name[Group1]=&quot;French&quot;;

      key &lt;I219&gt;  { [ less, greater ] };
      key &lt;AD11&gt;  { [ dead_circumflex, dead_diaeresis, notsign, dead_abovering ]  };
      key &lt;AB08&gt;  { [ semicolon, period, underscore, multiply ]   };
      key &lt;TLDE&gt;  { [ twosuperior, asciitilde, VoidSymbol, VoidSymbol ]   };

      // Some keys only have the Shift+AltGr character printed on them (alongside
      // the unmodified one). Make such keys shift-invariant so that the printed
      // value is achieved by pressing AltGr or Shift+AltGr.
      key &lt;AB02&gt;  { [ x,  X,  guillemotright, guillemotright ]    };
      key &lt;AC02&gt;  { [ s,  S,  ssharp, ssharp ]    };
      key &lt;AD02&gt;  { [ z,  Z,  guillemotleft, guillemotleft ]  };
  };

  partial alphanumeric_keys
  xkb_symbols &quot;Sundeadkeys&quot; {

      // Modifies the basic French layout to use the Sun dead keys

      include &quot;fr(basic)&quot;

      key &lt;AD11&gt;  { [dead_circumflex, dead_diaeresis ]    };
      key &lt;AB07&gt;  { [comma,   question,  dead_acute, dead_doubleacute ]   };
  };

  partial alphanumeric_keys
  xkb_symbols &quot;sundeadkeys&quot; {
      include &quot;fr(Sundeadkeys)&quot;

      name[Group1]=&quot;French (with Sun dead keys)&quot;;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;nodeadkeys&quot; {

      // Modifies the basic French layout to eliminate all dead keys

      include &quot;fr(basic)&quot;

      name[Group1]=&quot;French (no dead keys)&quot;;

      key &lt;AE12&gt;  { [     equal,       plus,   braceright,       ogonek ] };
      key &lt;AD11&gt;  { [asciicircum,  diaeresis ]    };
      key &lt;AD12&gt;  { [    dollar,   sterling,     currency,       macron ] };
      key &lt;AC11&gt;  { [    ugrave,    percent,  asciicircum,        caron ] };
      key &lt;BKSL&gt;  { [  asterisk,         mu,        grave,        breve ] };
      key &lt;AB07&gt;  { [     comma,   question,        acute,  doubleacute ] };
      key &lt;AB10&gt;  { [    exclam,    section, dead_belowdot,    abovedot ] };
  };


  // Unicode French derivative
  // Loose refactoring of the historic Linux French keyboard layout
  //
  // Copyright &copy; 2006-2008 Nicolas Mailhot &lt;nicolas.mailhot @ laposte.net&gt;
  //
  // Credits (fr-latin1, fr-latin0, fr-latin9)
  //   &copy; 199x-1996 Ren&eacute; Cougnenc ✝
  //   &copy; 1997-2002 Guylhem Aznar &lt;clavier @ externe.net&gt;
  //   &copy; 2003-2006 Nicolas Mailhot &lt;nicolas.mailhot @ laposte.net&gt;
  //
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━┓
  // │ &sup3; &cedil; │ 1 ̨  │ 2 &Eacute; │ 3 ˘ │ 4 &mdash; │ 5 &ndash; │ 6 ‑ │ 7 &Egrave; │ 8 &trade; │ 9 &Ccedil; │ 0 &Agrave; │ &deg; &ne; │ + &plusmn; ┃ ⌫ Retour┃
  // │ &sup2; &sup1; │ &amp; ˇ │ &eacute; ~ │ &quot; # │ ' { │ ( [ │ - | │ &egrave; ` │ _ \ │ &ccedil; ^ │ &agrave; @ │ ) ] │ = } ┃  arri&egrave;re┃
  // ┢━━━━━┷━┱───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┺━┳━━━━━━━┫
  // ┃       ┃ A &AElig; │ Z &Acirc; │ E &cent; │ R &Ecirc; │ T &THORN; │ Y &Yuml; │ U &Ucirc; │ I &Icirc; │ O &OElig; │ P &Ocirc; │ &uml; ˚ │ &pound; &Oslash; ┃Entr&eacute;e ┃
  // ┃Tab ↹  ┃ a &aelig; │ z &acirc; │ e &euro; │ r &ecirc; │ t &thorn; │ y &yuml; │ u &ucirc; │ i &icirc; │ o &oelig; │ p &ocirc; │ ^ ~ │ $ &oslash; ┃   ⏎   ┃
  // ┣━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓      ┃
  // ┃        ┃ Q &Auml; │ S &bdquo; │ D &Euml; │ F &sbquo; │ G &yen; │ H &ETH; │ J &Uuml; │ K &Iuml; │ L Ŀ │ M &Ouml; │ % &Ugrave; │ &micro; ̄  ┃      ┃
  // ┃Maj ⇬   ┃ q &auml; │ s &szlig; │ d &euml; │ f &lsquo; │ g &rsquo; │ h &eth; │ j &uuml; │ k &iuml; │ l ŀ │ m &ouml; │ &ugrave; ' │ * ` ┃      ┃
  // ┣━━━━━━━┳┹────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┲┷━━━━━┻━━━━━━┫
  // ┃       ┃ &gt; &ge; │ W &ldquo; │ X &rdquo; │ C &reg; │ V &larr; │ B &uarr; │ N &rarr; │ ? &hellip; │ . . │ / ∕ │ &sect; &minus; ┃             ┃
  // ┃Shift ⇧┃ &lt; &le; │ w &laquo; │ x &raquo; │ c &copy; │ v ⍽ │ b &darr; │ n &not; │ , &iquest; │ ; &times; │ : &divide; │ ! &iexcl; ┃Shift ⇧      ┃
  // ┣━━━━━━━╋━━━━━┷━┳━━━┷━━━┱─┴─────┴─────┴─────┴─────┴─────┴───┲━┷━━━━━╈━━━━━┻━┳━━━━━━━┳━━━┛
  // ┃       ┃       ┃       ┃ ␣         Espace fine ins&eacute;cable ⍽ ┃       ┃       ┃       ┃
  // ┃Ctrl   ┃Meta   ┃Alt    ┃ ␣ Espace       Espace ins&eacute;cable ⍽ ┃AltGr ⇮┃Menu   ┃Ctrl   ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹───────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┛
  partial alphanumeric_keys
  xkb_symbols &quot;oss&quot; {

      include &quot;latin&quot;
      include &quot;level3(ralt_switch)&quot;
      include &quot;nbsp(level4n)&quot;
      include &quot;keypad(oss)&quot;

      name[Group1]=&quot;French (alt.)&quot;;

      // First row
      key &lt;TLDE&gt;  { [      twosuperior,    threesuperior,          onesuperior,          dead_cedilla ] }; // &sup2; &sup3; &sup1; &cedil;
      key &lt;AE01&gt;  { [        ampersand,                1,           dead_caron,           dead_ogonek ] }; // &amp; 1 ˇ ̨
      key &lt;AE02&gt;  { [           eacute,                2,           asciitilde,                Eacute ] }; // &eacute; 2 ~ &Eacute;
      key &lt;AE03&gt;  { [         quotedbl,                3,           numbersign,            dead_breve ] }; // &quot; 3 # ˘
      key &lt;AE04&gt;  { [       apostrophe,                4,            braceleft,             0x1002014 ] }; // ' 4 { &mdash; (tiret cadratin)
      key &lt;AE05&gt;  { [        parenleft,                5,          bracketleft,             0x1002013 ] }; // ( 5 [ &ndash; (tiret demi-cadratin)
      key &lt;AE06&gt;  { [            minus,                6,                  bar,             0x1002011 ] }; // - 6 | ‑ (tiret ins&eacute;cable)
      key &lt;AE07&gt;  { [           egrave,                7,                grave,                Egrave ] }; // &egrave; 7 ` &Egrave;
      key &lt;AE08&gt;  { [       underscore,                8,            backslash,             trademark ] }; // _ 8 \ &trade;
      key &lt;AE09&gt;  { [         ccedilla,                9,          asciicircum,              Ccedilla ] }; // &ccedil; 9 ^ &Ccedil;
      key &lt;AE10&gt;  { [           agrave,                0,                   at,                Agrave ] }; // &agrave; 0 @ &Agrave;
      key &lt;AE11&gt;  { [       parenright,           degree,         bracketright,              notequal ] }; // ) &deg; ] &ne;
      key &lt;AE12&gt;  { [            equal,             plus,           braceright,             plusminus ] }; // = + } &plusmn;

      // Second row
      key &lt;AD01&gt;  { [                a,                A,                   ae,                    AE ] }; // a A &aelig; &AElig;
      key &lt;AD02&gt;  { [                z,                Z,          acircumflex,           Acircumflex ] }; // z Z &acirc; &Acirc;
      key &lt;AD03&gt;  { [                e,                E,             EuroSign,                  cent ] }; // e E &euro; &cent;
      key &lt;AD04&gt;  { [                r,                R,          ecircumflex,           Ecircumflex ] }; // r R &ecirc; &Ecirc;
      key &lt;AD05&gt;  { [                t,                T,                thorn,                 THORN ] }; // t T &thorn; &THORN;
      key &lt;AD06&gt;  { [                y,                Y,           ydiaeresis,            Ydiaeresis ] }; // y Y &yuml; &Yuml;
      key &lt;AD07&gt;  { [                u,                U,          ucircumflex,           Ucircumflex ] }; // u U &ucirc; &Ucirc;
      key &lt;AD08&gt;  { [                i,                I,          icircumflex,           Icircumflex ] }; // i I &icirc; &Icirc;
      key &lt;AD09&gt;  { [                o,                O,                   oe,                    OE ] }; // o O &oelig; &OElig;
      key &lt;AD10&gt;  { [                p,                P,          ocircumflex,           Ocircumflex ] }; // p P &ocirc; &Ocirc;
      key &lt;AD11&gt;  { [  dead_circumflex,   dead_diaeresis,           dead_tilde,        dead_abovering ] }; // ^ ̈ ̃ ˚
      key &lt;AD12&gt;  { [           dollar,         sterling,               oslash,              Ooblique ] }; // $ &pound; &oslash; &Oslash;

      // Third row
      key &lt;AC01&gt;  { [                q,                Q,           adiaeresis,            Adiaeresis ] }; // q Q &auml; &Auml;
      key &lt;AC02&gt;  { [                s,                S,               ssharp,    doublelowquotemark ] }; // s S &szlig; &bdquo;
      key &lt;AC03&gt;  { [                d,                D,           ediaeresis,            Ediaeresis ] }; // d D &euml; &Euml;
      key &lt;AC04&gt;  { [                f,                F,  leftsinglequotemark,    singlelowquotemark ] }; // f F &lsquo; &sbquo;
      key &lt;AC05&gt;  { [                g,                G, rightsinglequotemark,                   yen ] }; // g G &rsquo; &yen;
      key &lt;AC06&gt;  { [                h,                H,                  eth,                   ETH ] }; // h H &eth; &ETH;
      key &lt;AC07&gt;  { [                j,                J,           udiaeresis,            Udiaeresis ] }; // j J &uuml; &Uuml;
      key &lt;AC08&gt;  { [                k,                K,           idiaeresis,            Idiaeresis ] }; // k K &iuml; &Iuml;
      key &lt;AC09&gt;  { [                l,                L,            0x1000140,             0x100013F ] }; // l L ŀ Ŀ
      key &lt;AC10&gt;  { [                m,                M,           odiaeresis,            Odiaeresis ] }; // m M &ouml; &Ouml;
      key &lt;AC11&gt;  { [           ugrave,          percent,           dead_acute,                Ugrave ] }; // &ugrave; % ' &Ugrave;
      key &lt;BKSL&gt;  { [         asterisk,               mu,           dead_grave,           dead_macron ] }; // * &micro; ` ̄

      // Fourth row
      key &lt;LSGT&gt;  { [             less,          greater,        lessthanequal,      greaterthanequal ] }; // &lt; &gt; &le; &ge;
      key &lt;AB01&gt;  { [                w,                W,        guillemotleft,   leftdoublequotemark ] }; // w W &laquo; &ldquo;
      key &lt;AB02&gt;  { [                x,                X,       guillemotright,  rightdoublequotemark ] }; // x X &raquo; &rdquo;
      key &lt;AB03&gt;  { [                c,                C,            copyright,            registered ] }; // c C &copy; &reg;
      key &lt;AB04&gt;  { [                v,                V,            0x100202F,             leftarrow ] }; // v V ⍽ &larr; (espace fine ins&eacute;cable)
      key &lt;AB05&gt;  { [                b,                B,            downarrow,               uparrow ] }; // b B &darr; &uarr;
      key &lt;AB06&gt;  { [                n,                N,              notsign,            rightarrow ] }; // n N &not; &rarr;
      key &lt;AB07&gt;  { [            comma,         question,         questiondown,             0x1002026 ] }; // , ? &iquest; &hellip;
      key &lt;AB08&gt;  { [        semicolon,           period,             multiply,             0x10022C5 ] }; // ; . &times; &sdot;
      key &lt;AB09&gt;  { [            colon,            slash,             division,             0x1002215 ] }; // : / &divide; ∕
      key &lt;AB10&gt;  { [           exclam,          section,           exclamdown,             0x1002212 ] }; // ! &sect; &iexcl; &minus;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;oss_latin9&quot; {

      // Restricts the fr(oss) layout to latin9 symbols

      include &quot;fr(oss)&quot;
      include &quot;keypad(oss_latin9)&quot;

      name[Group1]=&quot;French (alt., Latin-9 only)&quot;;

      // First row
      key &lt;AE01&gt;  { [        ampersand,                1,           dead_caron,          dead_cedilla ] }; // &amp; 1 ˇ &cedil;
      key &lt;AE03&gt;  { [         quotedbl,                3,           numbersign,            dead_tilde ] }; // &quot; 3 # ~
      key &lt;AE04&gt;  { [       apostrophe,                4,            braceleft,            underscore ] }; // ' 4 { _
      key &lt;AE05&gt;  { [        parenleft,                5,          bracketleft,                 minus ] }; // ( 5 [ -
      key &lt;AE06&gt;  { [            minus,                6,                  bar,                 minus ] }; // - 6 | -
      key &lt;AE08&gt;  { [       underscore,                8,            backslash,             backslash ] }; // _ 8 \ \
      key &lt;AE11&gt;  { [       parenright,           degree,         bracketright,                 equal ] }; // ) &deg; ] =

      // Third row
      key &lt;AC02&gt;  { [                s,                S,               ssharp,         guillemotleft ] }; // s S &szlig; &laquo;
      key &lt;AC04&gt;  { [                f,                F,           apostrophe,            apostrophe ] }; // f F ' '
      key &lt;AC05&gt;  { [                g,                G,           apostrophe,                   yen ] }; // g G ' &yen;
      key &lt;AC09&gt;  { [                l,                L,       periodcentered,        periodcentered ] }; // l L &middot; &middot;
      key &lt;BKSL&gt;  { [         asterisk,               mu,           dead_grave,       dead_circumflex ] }; // * &micro; ` ^

      // Fourth row
      key &lt;LSGT&gt;  { [             less,          greater,                 less,               greater ] }; // &lt; &gt; &lt; &gt;
      key &lt;AB01&gt;  { [                w,                W,        guillemotleft,         guillemotleft ] }; // w W &laquo; &laquo;
      key &lt;AB02&gt;  { [                x,                X,       guillemotright,        guillemotright ] }; // x X &raquo; &raquo;
      key &lt;AB04&gt;  { [                v,                V,         nobreakspace,                  less ] }; // v V ⍽ &lt; (espace ins&eacute;cable)
      key &lt;AB05&gt;  { [                b,                B,                minus,           asciicircum ] }; // b B - ^
      key &lt;AB06&gt;  { [                n,                N,              notsign,               greater ] }; // n N &not; &gt;
      key &lt;AB07&gt;  { [            comma,         question,         questiondown,                period ] }; // , ? &iquest; .
      key &lt;AB08&gt;  { [        semicolon,           period,             multiply,        periodcentered ] }; // ; . &times; &middot;
      key &lt;AB09&gt;  { [            colon,            slash,             division,                 slash ] }; // : / &divide; /
      key &lt;AB10&gt;  { [           exclam,          section,           exclamdown,                 minus ] }; // ! &sect; &iexcl; -
  };

  partial alphanumeric_keys
  xkb_symbols &quot;oss_Sundeadkeys&quot; {

      // Modifies the basic fr(oss) layout to use the Sun dead keys

      include &quot;fr(oss)&quot;

      key &lt;TLDE&gt;  { [      twosuperior,    threesuperior,          onesuperior,          dead_cedilla ] }; // &sup1; &sup2; &sup3; &cedil;

      key &lt;AD11&gt;  { [  dead_circumflex,   dead_diaeresis,           dead_tilde,        dead_abovering ] }; // ^ ̈ ̃ ˚

      key &lt;AC11&gt;  { [           ugrave,          percent,           dead_acute,                Ugrave ] }; // &ugrave; % ' &Ugrave;
      key &lt;BKSL&gt;  { [         asterisk,               mu,           dead_grave,           dead_macron ] }; // * &micro; ` ̄
  };

  partial alphanumeric_keys
  xkb_symbols &quot;oss_sundeadkeys&quot; {

      include &quot;fr(oss_Sundeadkeys)&quot;

      name[Group1]=&quot;French (alt., with Sun dead keys)&quot;;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;oss_nodeadkeys&quot; {

      // Modifies the basic fr(oss) layout to eliminate all dead keys

      include &quot;fr(oss)&quot;

      name[Group1]=&quot;French (alt., no dead keys)&quot;;

      key &lt;TLDE&gt;  { [      twosuperior,    threesuperior,          onesuperior,               cedilla ] }; // &sup2; &sup3; &sup1; &cedil;
      key &lt;AE01&gt;  { [        ampersand,                1,                caron,                ogonek ] }; // &amp; 1 ˇ ̨
      key &lt;AE03&gt;  { [         quotedbl,                3,           numbersign,                 breve ] }; // &quot; 3 # ˘

      key &lt;AD11&gt;  { [      asciicircum,        diaeresis,           asciitilde,                 Aring ] }; // ^ ̈ ̃ &Aring;
      key &lt;AC11&gt;  { [           ugrave,          percent,                acute,                Ugrave ] }; // &ugrave; % ' &Ugrave;
      key &lt;BKSL&gt;  { [         asterisk,               mu,                grave,                macron ] }; // * &micro; ` ̄
  };


  // Historic Linux French keyboard layout (fr-latin9)
  // Copyright (c) 199x, 2002 Rene Cougnenc (original work)
  //                          Guylhem Aznar &lt;clavier @ externe.net&gt; (maintainer)
  //                          Nicolas Mailhot &lt;Nicolas.Mailhot @ laposte.net&gt;
  //                              (XFree86 submission)
  //
  // This layout has long been distributed and refined outside official channels.
  // To this day it remains more feature-rich and popular than the 'fr' layout.
  //
  // This layout is derived from an original version by Guylhem Aznar.
  // The original version is always available from:
  // http://en.tldp.org/HOWTO/Francophones-HOWTO.html
  // and is distributed under a GPL license.
  //
  // The author has given permission for this derived version to be distributed
  // under the standard XFree86 license. He would like all changes to this
  // version to be sent to him at &lt;clavier @ externe.net&gt;, so he can sync
  // the identically named linux console map (kbd, linux-console) and his
  // out-of-tree GPL version.
  //
  // Now follows the keyboard design description in French.
  // (If you can't read it you probably have no business changing this file anyway:)
  //
  // Les accents circonflexes des principales voyelles sont obtenus avec
  // la touche Alt_Gr, les tr&eacute;mas sont obtenus par Alt_Gr + Shift.
  //
  //  ____                                     _________ _____________ _______
  // | S A| S = Shift,  A = AltGr + Shift     | Imprime | Arr&ecirc;t d&eacute;fil | Pause |
  // | s a| s = normal, a = AltGr             |  Exec   |             | Halte |
  //  &macr;&macr;&macr;&macr;                                     &macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr;
  //  ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ _______
  // | &oelig; &quot;| 1 &middot;| 2 &Eacute;| 3 ,| 4 '| 5 &quot;| 6 || 7 &Egrave;| 8 &macr;| 9 &Ccedil;| 0 &Agrave;| &deg; &yuml;| + &deg;| &lt;--   |
  // | &OElig; &quot;| &amp; '| &eacute; ~| &quot; #| ' {| ( [| - || &egrave; `| _ \| &ccedil; ^| &agrave; @| ) ]| = }|       |
  //  ========================================================================
  // | |&lt;-  | A &auml;| Z &Aring;| E &cent;| R &Ccedil;| T &THORN;| Y &Yacute;| U &uuml;| I &iuml;| O &ouml;| P '| &quot; `| $ &euml;|   , |
  // |  -&gt;| | a &acirc;| z &aring;| e &euro;| r &ccedil;| t &thorn;| y &yacute;| u &ucirc;| i &icirc;| o &ocirc;| p &para;| ^ ~| &pound; &ecirc;| &lt;-' |
  //  ===================================================================&not;    |
  // |       | Q &Auml;| S &Oslash;| D &Euml;| F &ordf;| G &AElig;| H &ETH;| J &Uuml;| K &Iuml;| L &Ouml;| M &ordm;| % &Ugrave;| &micro; &yen;|    |
  // | MAJ   | q &Acirc;| s &oslash;| d &Ecirc;| f &plusmn;| g &aelig;| h &eth;| j &Ucirc;| k &Icirc;| l &Ocirc;| m &sup1;| &ugrave; &sup2;| * &sup3;|    |
  //  ========================================================================
  // | ^   | &gt;  | W  | X  | C  | V  | B  | N  | ?  | .  | /  | &sect;  |     ^     |
  // | |   | &lt; || w &laquo;| x &raquo;| c &copy;| v &reg;| b &szlig;| n &not;| , &iquest;| ; &times;| : &divide;| ! &iexcl;|     |     |
  //  ========================================================================
  // |      |      |      |                       |       |      |     |      |
  // | Ctrl | Super| Alt  | Space    Nobreakspace | AltGr | Super|Menu | Ctrl |
  //  &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;
  //
  //
  //      Si les touches mortes fonctionnent, utiliser les accents dits
  //      &laquo; morts &raquo;, i.e. fonctionnant comme l'accent circonflexe &amp; le
  //      tr&eacute;ma des machines &agrave; &eacute;crire ; sont disponibles :
  //
  // (^) : accent circonflexe,
  // Shift+(^) : tr&eacute;ma,
  // Shift+AltGr+(^) : tilde,
  // AltGr+(1) : accent aigu,
  // AltGr+(7) : accent grave
  //
  // Pour s'en servir, proc&eacute;der comme avec l'accent circonflexe &amp; le tr&eacute;ma
  // sur les vielles machines &agrave; &eacute;crire :
  //
  // AltGr+(1) puis e : &eacute;
  // AltGr+(1) puis E : &Eacute;
  //
  partial alphanumeric_keys

  xkb_symbols &quot;latin9&quot; {

      include &quot;latin&quot;
      include &quot;nbsp(level3)&quot;

      name[Group1]=&quot;French (legacy, alt.)&quot;;

      key &lt;TLDE&gt;  { [     twosuperior,           U2014, leftdoublequotemark, rightdoublequotemark ] };
      key &lt;AE01&gt;  { [       ampersand,               1, leftsinglequotemark, rightsinglequotemark ] };
      key &lt;AE02&gt;  { [          eacute,               2,          asciitilde,              notsign ] };
      key &lt;AE03&gt;  { [        quotedbl,               3,          numbersign,              cedilla ] };
      key &lt;AE04&gt;  { [      apostrophe,               4,           braceleft,                acute ] };
      key &lt;AE05&gt;  { [       parenleft,               5,         bracketleft,            diaeresis ] };
      key &lt;AE06&gt;  { [           minus,               6,                 bar,            brokenbar ] };
      key &lt;AE07&gt;  { [          egrave,               7,               grave,               Egrave ] };
      key &lt;AE08&gt;  { [      underscore,               8,           backslash,               macron ] };
      key &lt;AE09&gt;  { [        ccedilla,               9,         asciicircum,             Ccedilla ] };
      key &lt;AE10&gt;  { [          agrave,               0,                  at,               Agrave ] };
      key &lt;AE11&gt;  { [      parenright,          degree,        bracketright,           ydiaeresis ] };
      key &lt;AE12&gt;  { [           equal,            plus,          braceright,       dead_abovering ] };

      key &lt;AD01&gt;  { [               a,               A,         acircumflex,           adiaeresis ] };
      key &lt;AD02&gt;  { [               z,               Z,               aring,                Aring ] };
      key &lt;AD03&gt;  { [               e,               E,            EuroSign,                 cent ] };
      key &lt;AD04&gt;  { [               r,               R,            ccedilla,             Ccedilla ] };
      key &lt;AD05&gt;  { [               t,               T,               thorn,                THORN ] };
      key &lt;AD06&gt;  { [               y,               Y,              yacute,               Yacute ] };
      key &lt;AD07&gt;  { [               u,               U,         ucircumflex,           udiaeresis ] };
      key &lt;AD08&gt;  { [               i,               I,         icircumflex,           idiaeresis ] };
      key &lt;AD09&gt;  { [               o,               O,                  oe,                   OE ] };
      key &lt;AD10&gt;  { [               p,               P,           paragraph,                grave ] };
      key &lt;AD11&gt;  { [ dead_circumflex,  dead_diaeresis,          dead_tilde,           apostrophe ] };
      key &lt;AD12&gt;  { [          dollar,        sterling,         ecircumflex,           ediaeresis ] };

      key &lt;AC01&gt;  { [               q,               Q,         Acircumflex,           Adiaeresis ] };
      key &lt;AC02&gt;  { [               s,               S,              ssharp                       ] };
      key &lt;AC03&gt;  { [               d,               D,         Ecircumflex,           Ediaeresis ] };
      key &lt;AC04&gt;  { [               f,               F,           plusminus,          ordfeminine ] };
      key &lt;AC05&gt;  { [               g,               G,                  ae,                   AE ] };
      key &lt;AC06&gt;  { [               h,               H,                 eth,                  ETH ] };
      key &lt;AC07&gt;  { [               j,               J,         Ucircumflex,           Udiaeresis ] };
      key &lt;AC08&gt;  { [               k,               K,         Icircumflex,           Idiaeresis ] };
      key &lt;AC09&gt;  { [               l,               L,         Ocircumflex,           Odiaeresis ] };
      key &lt;AC10&gt;  { [               m,               M,         onesuperior,            masculine ] };
      key &lt;AC11&gt;  { [          ugrave,         percent,         twosuperior,               Ugrave ] };
      key &lt;BKSL&gt;  { [        asterisk,              mu,               U00D7,                U22C5 ] };

      key &lt;LSGT&gt;  { [            less,         greater,                 bar                       ] };
      key &lt;AB01&gt;  { [               w,               W,       guillemotleft                       ] };
      key &lt;AB02&gt;  { [               x,               X,      guillemotright                       ] };
      key &lt;AB03&gt;  { [               c,               C,            ccedilla,            copyright ] };
      key &lt;AB04&gt;  { [               v,               V,          registered                       ] };
      key &lt;AB05&gt;  { [               b,               B                                            ] };
      key &lt;AB06&gt;  { [               n,               N,             oslash,             Ooblique  ] };
      key &lt;AB07&gt;  { [           comma,        question,        questiondown                       ] };
      key &lt;AB08&gt;  { [       semicolon,          period,            multiply,      periodcentered  ] };
      key &lt;AB09&gt;  { [           colon,           slash,            division                       ] };
      key &lt;AB10&gt;  { [          exclam,         section,          exclamdown                       ] };

      // French uses a comma as decimal separator, but keyboards are labeled with a period
      // Will take effect when KP_Decimal is mapped to the locale decimal separator
      key &lt;KPDL&gt;  { [       KP_Delete,      KP_Decimal,           KP_Delete,           KP_Decimal ] };

      include &quot;level3(ralt_switch)&quot;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;latin9_Sundeadkeys&quot; {

      // Modifies the basic fr-latin9 layout to use the Sun dead keys

      include &quot;fr(latin9)&quot;

      key &lt;AE01&gt;  { [       ampersand,               1,         dead_acute,       periodcentered ] };
      key &lt;AE07&gt;  { [          egrave,               7,         dead_grave,               Egrave ] };
      key &lt;AD11&gt;  { [ dead_circumflex,  dead_diaeresis,         dead_tilde,           apostrophe ] };
  };

  partial alphanumeric_keys
  xkb_symbols &quot;latin9_sundeadkeys&quot; {

      include &quot;fr(latin9_Sundeadkeys)&quot;

      name[Group1]=&quot;French (legacy, alt., with Sun dead keys)&quot;;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;latin9_nodeadkeys&quot; {

      // Modifies the basic fr-latin9 layout to eliminate all dead keys

      include &quot;fr(latin9)&quot;

      name[Group1]=&quot;French (legacy, alt., no dead keys)&quot;;

      key &lt;AE01&gt;  { [       ampersand,               1,          apostrophe,       periodcentered ] };
      key &lt;AE07&gt;  { [          egrave,               7,               grave,               Egrave ] };
      key &lt;AE12&gt;  { [           equal,            plus,          braceright                   ] };
      key &lt;AD11&gt;  { [ asciicircum,       diaeresis,          asciitilde,           apostrophe ] };
  };

  // B&eacute;po&nbsp;:&nbsp;Improved ergonomic french keymap using Dvorak method.
  // Built by community on 'Dvorak Fr / B&eacute;po'&nbsp;:
  // see http://www.clavier-dvorak.org/wiki/ to join and help.
  // XOrg integration (1.0rc2 version) in 2008
  // by Fr&eacute;d&eacute;ric Boiteux &lt;fboiteux at free dot fr&gt;
  //
  // B&eacute;po layout (1.0rc2 version) for a pc105 keyboard (french)&nbsp;:
  // ┌─────┐
  // │ S A │   S = Shift,  A = AltGr + Shift
  // │ s a │   s = normal, a = AltGr
  // └─────┘
  //
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━┓
  // │ # &para; │ 1 &bdquo; │ 2 &ldquo; │ 3 &rdquo; │ 4 &le; │ 5 &ge; │ 6   │ 7 &not; │ 8 &frac14; │ 9 &frac12; │ 0 &frac34; │ &deg; &prime; │ ` &Prime; ┃ ⌫ Retour┃
  // │ $ &ndash; │ &quot; &mdash; │ &laquo; &lt; │ &raquo; &gt; │ ( [ │ ) ] │ @ ^ │ + &plusmn; │ - &minus; │ / &divide; │ * &times; │ = &ne; │ % &permil; ┃  arri&egrave;re┃
  // ┢━━━━━┷━┱───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┺━┳━━━━━━━┫
  // ┃       ┃ B &brvbar; │ &Eacute; ˝ │ P &sect; │ O &OElig; │ &Egrave; ` │ !   │ V   │ D &ETH; │ L   │ J Ĳ │ Z Ə │ W   ┃Entr&eacute;e ┃
  // ┃Tab ↹  ┃ b | │ &eacute; ˊ │ p &amp; │ o &oelig; │ &egrave; ` │ &circ; &iexcl; │ v ˇ │ d &eth; │ l / │ j ĳ │ z ə │ w ̆  ┃   ⏎   ┃
  // ┣━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓      ┃
  // ┃        ┃ A &AElig; │ U &Ugrave; │ I ˙ │ E &curren; │ ; ̛  │ C ſ │ T &THORN; │ S ẞ │ R &trade; │ N   │ M &ordm; │ &Ccedil; , ┃      ┃
  // ┃Maj ⇬   ┃ a &aelig; │ u &ugrave; │ i ̈  │ e &euro; │ , &rsquo; │ c &copy; │ t &thorn; │ s &szlig; │ r &reg; │ n &tilde; │ m &macr; │ &ccedil; &cedil; ┃      ┃
  // ┣━━━━━━━┳┹────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┲┷━━━━━┻━━━━━━┫
  // ┃       ┃ &Ecirc;   │ &Agrave;   │ Y &lsquo; │ X &rsquo; │ : &middot; │ K   │ ? ̉  │ Q ̣  │ G   │ H &Dagger; │ F &ordf; ┃             ┃
  // ┃Shift ⇧┃ &ecirc; / │ &agrave; \ │ y { │ x } │ . &hellip; │ k ~ │ ' &iquest; │ q ˚ │ g &micro; │ h &dagger; │ f ˛ ┃Shift ⇧      ┃
  // ┣━━━━━━━╋━━━━━┷━┳━━━┷━━━┱─┴─────┴─────┴─────┴─────┴─────┴───┲━┷━━━━━╈━━━━━┻━┳━━━━━━━┳━━━┛
  // ┃       ┃       ┃       ┃ Espace ins&eacute;c.   Espace ins&eacute;c. fin ┃       ┃       ┃       ┃
  // ┃Ctrl   ┃Meta   ┃Alt    ┃ ␣ (Espace)      _               ␣ ┃AltGr ⇮┃Menu   ┃Ctrl   ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹───────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┛
  partial alphanumeric_keys
  xkb_symbols &quot;bepo&quot; {

      include &quot;level3(ralt_switch)&quot;
      include &quot;keypad(oss)&quot;

      name[Group1]= &quot;French (Bepo, ergonomic, Dvorak way)&quot;;

      // First row
      key &lt;TLDE&gt; { [          dollar,   numbersign,        endash,       paragraph ] }; // $ # &ndash; &para;
      key &lt;AE01&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [        quotedbl,            1,         emdash, doublelowquotemark ] }; // &quot; 1 &mdash; &bdquo;
      key &lt;AE02&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [   guillemotleft,            2,           less,  leftdoublequotemark ] }; // &laquo; 2 &lt; &ldquo;
      key &lt;AE03&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [  guillemotright,            3,        greater, rightdoublequotemark ] }; // &raquo; 3 &gt; &rdquo;
      key &lt;AE04&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [       parenleft,            4,    bracketleft,      lessthanequal ] }; // ( 4 [ &le;
      key &lt;AE05&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [      parenright,            5,   bracketright,   greaterthanequal ] }; // ) 5 ] &ge;
      key &lt;AE06&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [              at,            6,    asciicircum                 ] }; // @ 6 ^
      key &lt;AE07&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [            plus,            7,      plusminus,        notsign ] }; // + 7 &plusmn; &not;
      key &lt;AE08&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [           minus,            8,          U2212,     onequarter ] }; // - 8 &minus; &frac14;
      key &lt;AE09&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [           slash,            9,       division,        onehalf ] }; // / 9 &divide; &frac12;
      key &lt;AE10&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [        asterisk,            0,       multiply,  threequarters ] }; // * 0 &times; &frac34;
      key &lt;AE11&gt; { [           equal,       degree,       notequal,        minutes ] }; // = &deg; &ne; &prime;
      key &lt;AE12&gt; { [         percent,        grave,          U2030,        seconds ] }; // % ` &permil; &Prime;

      // Second row
      key &lt;AD01&gt; { [               b,            B,            bar,      brokenbar ] }; // b B | &brvbar;
      key &lt;AD02&gt; { [          eacute,       Eacute,     dead_acute, dead_doubleacute ] }; // &eacute; &Eacute; ˊ ˝
      key &lt;AD03&gt; { [               p,            P,      ampersand,        section ] }; // p P &amp; &sect;
      key &lt;AD04&gt; { [               o,            O,             oe,             OE ] }; // o O &oelig; &OElig;
      key &lt;AD05&gt; { [          egrave,       Egrave,     dead_grave,          grave ] }; // &egrave; &Egrave; ` `
      key &lt;AD06&gt; { [ dead_circumflex,       exclam,     exclamdown                 ] }; // ^ ! &iexcl;
      key &lt;AD07&gt; { [               v,            V,     dead_caron                 ] }; // v V ˇ
      key &lt;AD08&gt; { [               d,            D,            eth,            ETH ] }; // d D &eth; &ETH;
      key &lt;AD09&gt; { [               l,            L,    dead_stroke                 ] }; // l L /
      key &lt;AD10&gt; { [               j,            J,          U0133,          U0132 ] }; // j J ĳ Ĳ
      key &lt;AD11&gt; { [               z,            Z,          schwa,          SCHWA ] }; // z Z ə Ə
      key &lt;AD12&gt; { [               w,            W,     dead_breve                 ] }; // w W ̆

      // Third row
      key &lt;AC01&gt; { [               a,            A,             ae,             AE ] }; // a A &aelig; &AElig;
      key &lt;AC02&gt; { [               u,            U,         ugrave,         Ugrave ] }; // u U &ugrave; &Ugrave;
      key &lt;AC03&gt; { [               i,            I, dead_diaeresis,  dead_abovedot ] }; // i I ̈ ˙
      key &lt;AC04&gt; { [               e,            E,       EuroSign,  dead_currency ] }; // e E &euro; &curren;
      key &lt;AC05&gt; { [           comma,    semicolon, rightsinglequotemark, dead_horn ] }; // , ; &rsquo; ̛
      key &lt;AC06&gt; { [               c,            C,      copyright,          U017F ] }; // c C &copy; ſ
      key &lt;AC07&gt; { [               t,            T,          thorn,          THORN ] }; // t T &thorn; &THORN;
      key &lt;AC08&gt; { [               s,            S,         ssharp,          U1E9E ] }; // s S &szlig; ẞ
      key &lt;AC09&gt; { [               r,            R,     registered,      trademark ] }; // r R &reg; &trade;
      key &lt;AC10&gt; { [               n,            N,     dead_tilde                 ] }; // n N ~
      key &lt;AC11&gt; { [               m,            M,    dead_macron,      masculine ] }; // m M ̄ &ordm;
      key &lt;BKSL&gt; { [        ccedilla,     Ccedilla,   dead_cedilla, dead_belowcomma ] }; // &ccedil; &Ccedil; &cedil; ,

      // Fourth row
      key &lt;LSGT&gt; { [     ecircumflex,  Ecircumflex,          slash                 ] }; // &ecirc; &Ecirc; /
      key &lt;AB01&gt; { [          agrave,       Agrave,      backslash                 ] }; // &agrave; &Agrave; \
      key &lt;AB02&gt; { [               y,            Y,      braceleft, leftsinglequotemark  ] }; // y Y { &lsquo;
      key &lt;AB03&gt; { [               x,            X,     braceright, rightsinglequotemark ] }; // x X } &rsquo;
      key &lt;AB04&gt; { [          period,        colon,       ellipsis, periodcentered ] }; // . : &hellip; &middot;
      key &lt;AB05&gt; { [               k,            K,     asciitilde                 ] }; // k K ~
      key &lt;AB06&gt; { [      apostrophe,     question,   questiondown,      dead_hook ] }; // ' ? &iquest; ̉
      key &lt;AB07&gt; { [               q,            Q, dead_abovering,  dead_belowdot ] }; // q Q ˚ ̣
      key &lt;AB08&gt; { [               g,            G,     dead_greek                 ] }; // g G &micro;
      key &lt;AB09&gt; { [               h,            H,         dagger,   doubledagger ] }; // h H &dagger; &Dagger;
      key &lt;AB10&gt; { [               f,            F,    dead_ogonek,    ordfeminine ] }; // f F ̨ &ordf;

      key &lt;SPCE&gt; { [           space, nobreakspace,     underscore,          U202F ] }; // ␣ (espace ins&eacute;cable) _ (espace ins&eacute;cable fin)
  };

  partial alphanumeric_keys
  xkb_symbols &quot;bepo_latin9&quot; {

      // Restricts the fr(bepo) layout to latin9 symbols

      include &quot;fr(bepo)&quot;
      include &quot;keypad(oss_latin9)&quot;

      name[Group1]=&quot;French (Bepo, ergonomic, Dvorak way, Latin-9 only)&quot;;

      key &lt;TLDE&gt; { [          dollar,   numbersign,        dollar,       paragraph ] }; // $ # $ &para;

      key &lt;AE01&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [        quotedbl,            1                                 ] }; // &quot; 1
      key &lt;AE02&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [   guillemotleft,            2,           less                 ] }; // &laquo; 2 &lt;
      key &lt;AE03&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [  guillemotright,            3,        greater                 ] }; // &raquo; 3 &gt;
      key &lt;AE04&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [       parenleft,            4,    bracketleft                 ] }; // ( 4 [
      key &lt;AE05&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [      parenright,            5,   bracketright                 ] }; // ) 5 ]
      key &lt;AE08&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [           minus,            8,          minus,     onequarter ] }; // - 8 - &frac14;
      key &lt;AE11&gt; { [           equal,       degree                                 ] }; // = &deg;
      key &lt;AE12&gt; { [         percent,        grave                                 ] }; // % `

      key &lt;AD01&gt; { [               b,            B,            bar                 ] }; // b B |
      key &lt;AD02&gt; { [          eacute,       Eacute,     dead_acute                 ] }; // &eacute; &Eacute; ˊ
      key &lt;AD10&gt; { [               j,            J                                 ] }; // j J
      key &lt;AD11&gt; { [               z,            Z                                 ] }; // z Z
      key &lt;AD12&gt; { [               w,            W                                 ] }; // w W

      key &lt;AC03&gt; { [               i,            I, dead_diaeresis                 ] }; // i I ̈
      key &lt;AC05&gt; { [           comma,    semicolon,          comma,      dead_horn ] }; // , ; , ̛
      key &lt;AC06&gt; { [               c,            C,      copyright                 ] }; // c C &copy;
      key &lt;AC08&gt; { [               s,            S,         ssharp                 ] }; // s S &szlig;
      key &lt;AC09&gt; { [               r,            R,     registered                 ] }; // r R &reg;
      key &lt;AC11&gt; { [               m,            M,         macron,      masculine ] }; // m M ̄ &ordm;

      key &lt;AB02&gt; { [               y,            Y,      braceleft                 ] }; // y Y {
      key &lt;AB03&gt; { [               x,            X,     braceright                 ] }; // x X }
      key &lt;AB04&gt; { [          period,        colon                                 ] }; // . :
      key &lt;AB09&gt; { [               h,            H                                 ] }; // h H
      key &lt;AB10&gt; { [               f,            F,              f,    ordfeminine ] }; // f F   &ordf;

      // Note&nbsp;: on a besoin de red&eacute;finir les niveaux 3 et 4,
      // donc nbsp(level2) ne suffit pas&nbsp;!
      key &lt;SPCE&gt; { [           space,  nobreakspace,    underscore,   nobreakspace ] }; // ␣ (espace ins&eacute;cable) _ (espace ins&eacute;cable)
  };

  // Author   : Francis Leboutte, http://www.algo.be/ergo/dvorak-fr.html
  //            thanks to Fabien Cazenave for his help
  // Licence  : X11
  // Version  : 0.3

  // Base layer + dead AltGr key (`):
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━━┓
  // │ *   │ 1   │ 2   │ 3   │ 4   │ 5   │ 6   │ 7   │ 8   │ 9   │ 0   │ +   │ %   ┃          ┃
  // │ _   │ =   │ / &plusmn; │ - &frac14; │ &egrave; &frac12; │ \ &frac34; │ ^   │ (   │ ` ` │ )   │ &quot;   │ [   │ ]   ┃ ⌫        ┃
  // ┢━━━━━┷━━┱──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┺━━┳━━━━━━━┫
  // ┃        ┃ ? &AElig; │ &lt;   │ &gt;   │ G   │ !   │ H   │ V   │ C &Ccedil; │ M   │ K   │ Z   │ &amp;   ┃       ┃
  // ┃ ↹      ┃ : &aelig; │ ' $ │ &eacute; &Eacute; │ g &euro; │ . &deg; │ h   │ v   │ c &ccedil; │ m &micro; │ k   │ z   │ &uml;   ┃       ┃
  // ┣━━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓  ⏎   ┃
  // ┃         ┃ O &Ograve; │ A &Agrave; │ U &Ugrave; │ E &Egrave; │ B   │ F   │ S   │ T   │ N   │ D   │ W   │ #   ┃      ┃
  // ┃ ⇬       ┃ o &ograve; │ a &agrave; │ u &ugrave; │ e &egrave; │ b   │ f   │ s &laquo; │ t   │ n &raquo; │ d   │ w   │ ~   ┃      ┃
  // ┣━━━━━━┳━━┹──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┲━━┷━━━━━┻━━━━━━┫
  // ┃      ┃ &ccedil; &Ccedil; │ | &OElig; │ Q   │ @   │ I &Igrave; │ Y   │ X   │ R   │ L   │ P   │ J   ┃               ┃
  // ┃ ⇧    ┃ &agrave; &Agrave; │ ; &oelig; │ q { │ , } │ i &igrave; │ y &pound; │ x   │ r &ordm; │ l   │ p &sect; │ j   ┃ ⇧             ┃
  // ┣━━━━━━┻┳━━━━┷━━┳━━┷━━━━┱┴─────┴─────┴─────┴─────┴─────┴─┲━━━┷━━━┳━┷━━━━━╋━━━━━━━┳━━━━━━━┫
  // ┃       ┃       ┃       ┃ ␣                            ⍽ ┃       ┃       ┃       ┃       ┃
  // ┃ ctrl  ┃ super ┃ alt   ┃ ␣ Espace    Espace ins&eacute;cable ⍽ ┃ alt   ┃ super ┃ menu  ┃ ctrl  ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┻━━━━━━━┛

  // Notice the specific Caps_Lock layer:
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━━┓
  // │ *   │ 1   │ 2   │ 3   │ 4   │ 5   │ 6   │ 7   │ 8   │ 9   │ 0   │ +   │ %   ┃          ┃
  // │     │     │     │     │     │     │     │     │     │     │     │     │     ┃ ⌫        ┃
  // ┢━━━━━┷━━┱──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┺━━┳━━━━━━━┫
  // ┃        ┃     │ &lt;   │ &gt;   │     │     │     │     │     │     │     │     │     ┃       ┃
  // ┃ ↹      ┃     │     │     │     │     │     │     │     │     │     │     │     ┃       ┃
  // ┣━━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓  ⏎   ┃
  // ┃         ┃     │     │     │     │     │     │     │     │     │     │     │     ┃      ┃
  // ┃ ⇬       ┃     │     │     │     │     │     │     │     │     │     │     │     ┃      ┃
  // ┣━━━━━━┳━━┹──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┲━━┷━━━━━┻━━━━━━┫
  // ┃      ┃ /   │ -   │     │     │     │     │     │     │     │     │     ┃               ┃
  // ┃ ⇧    ┃     │     │     │     │     │     │     │     │     │     │     ┃ ⇧             ┃
  // ┣━━━━━━┻┳━━━━┷━━┳━━┷━━━━┱┴─────┴─────┴─────┴─────┴─────┴─┲━━━┷━━━┳━┷━━━━━╋━━━━━━━┳━━━━━━━┫
  // ┃       ┃       ┃       ┃ ␣                            ⍽ ┃       ┃       ┃       ┃       ┃
  // ┃ ctrl  ┃ super ┃ alt   ┃ ␣ Espace    Espace ins&eacute;cable ⍽ ┃ alt   ┃ super ┃ menu  ┃ ctrl  ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┻━━━━━━━┛

  partial alphanumeric_keys modifier_keys
  xkb_symbols &quot;dvorak&quot; {
    name[Group1]=&quot;French (Dvorak)&quot;;

    // First row
    key &lt;TLDE&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [       underscore,   asterisk                  ] };
    key &lt;AE01&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [            equal,          1                  ] };
    key &lt;AE02&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [            slash,          2,       plusminus ] };
    key &lt;AE03&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [            minus,          3,      onequarter ] };
    key &lt;AE04&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [           egrave,          4,         onehalf ] };
    key &lt;AE05&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [        backslash,          5,   threequarters ] };
    key &lt;AE06&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [  dead_circumflex,          6                  ] };
    key &lt;AE07&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [        parenleft,          7                  ] };
    key &lt;AE08&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [ ISO_Level3_Latch,          8,           grave ] };
    key &lt;AE09&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [       parenright,          9                  ] };
    key &lt;AE10&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [         quotedbl,          0                  ] };
    key &lt;AE11&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [      bracketleft,       plus                  ] };
    key &lt;AE12&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [     bracketright,    percent                  ] };

    // Second row
    key &lt;AD01&gt; { [            colon,         question,              ae,               AE ] };
    key &lt;AD02&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [       apostrophe,       less,          dollar ] };
    key &lt;AD03&gt; { type[group1] = &quot;FOUR_LEVEL_SEMIALPHABETIC&quot;, [           eacute,    greater,          Eacute ] };
    key &lt;AD04&gt; { [                g,                G,        EuroSign                   ] };
    key &lt;AD05&gt; { [           period,           exclam,          degree                   ] };
    key &lt;AD06&gt; { [                h,                H                                    ] };
    key &lt;AD07&gt; { [                v,                V                                    ] };
    key &lt;AD08&gt; { [                c,                C,        ccedilla,         Ccedilla ] };
    key &lt;AD09&gt; { [                m,                M,              mu                   ] };
    key &lt;AD10&gt; { [                k,                K                                    ] };
    key &lt;AD11&gt; { [                z,                Z                                    ] };
    key &lt;AD12&gt; { [   dead_diaeresis,        ampersand                                    ] };

    // Third row
    key &lt;AC01&gt; { [                o,                O,          ograve,           Ograve ] };
    key &lt;AC02&gt; { [                a,                A,          agrave,           Agrave ] };
    key &lt;AC03&gt; { [                u,                U,          ugrave,           Ugrave ] };
    key &lt;AC04&gt; { [                e,                E,          egrave,           Egrave ] };
    key &lt;AC05&gt; { [                b,                B                                    ] };
    key &lt;AC06&gt; { [                f,                F                                    ] };
    key &lt;AC07&gt; { [                s,                S,   guillemotleft                   ] };
    key &lt;AC08&gt; { [                t,                T                                    ] };
    key &lt;AC09&gt; { [                n,                N,  guillemotright                   ] };
    key &lt;AC10&gt; { [                d,                D                                    ] };
    key &lt;AC11&gt; { [                w,                W                                    ] };
    key &lt;BKSL&gt; { [       asciitilde,       numbersign                                    ] };

    // Fourth row
    key &lt;LSGT&gt; { type[group1] = &quot;FOUR_LEVEL_PLUS_LOCK&quot;, [       agrave, ccedilla,  Agrave, Ccedilla,   slash ] };
    key &lt;AB01&gt; { type[group1] = &quot;FOUR_LEVEL_PLUS_LOCK&quot;, [    semicolon,      bar,      oe,       OE,   minus ] };
    key &lt;AB02&gt; { [                q,                Q,       braceleft                   ] };
    key &lt;AB03&gt; { [            comma,               at,      braceright                   ] };
    key &lt;AB04&gt; { [                i,                I,          igrave,           Igrave ] };
    key &lt;AB05&gt; { [                y,                Y,        sterling                   ] };
    key &lt;AB06&gt; { [                x,                X                                    ] };
    key &lt;AB07&gt; { [                r,                R,       masculine                   ] };
    key &lt;AB08&gt; { [                l,                L                                    ] };
    key &lt;AB09&gt; { [                p,                P,         section                   ] };
    key &lt;AB10&gt; { [                j,                J                                    ] };

    key &lt;SPCE&gt; { [            space,            space,    nobreakspace,     nobreakspace ] };
  };

  // C'WHERTY:&nbsp;Breton keyboard. Ar c'hlavier brezhoneg.
  // Copyright &copy; 2009 Dominique Pell&eacute; &lt;dominique.pelle@gmail.com&gt;
  // Version: 0.1
  //
  // ┌─────┐
  // │ S A │   S = Reol = Shift,  A = ArErl + Pennlizherenn = AltGr + Shift
  // │ s a │   s = normal,        a = ArErl = AltGr
  // └─────┘
  //
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━┓
  // │ $ &Gamma; │ 1 &Delta; │ 2 &Theta; │ 3 &Lambda; │ 4 &Xi; │ 5 &Pi; │ 6 &Sigma; │ 7 &Phi; │ 8 &Psi; │ 9 &Ccedil; │ 0 &Omega; │ &deg; &szlig; │ + &not; ┃ ⌫ Souza&ntilde;┃
  // │ &sup2; ˙ │ &amp; &macr; │ &eacute; &acute; │ &quot; # │ ' { │ ( [ │ - | │ &egrave; ` │ - \ │ &ccedil; &plusmn; │ &agrave; @ │ ) ] │ = } ┃         ┃
  // ┢━━━━━┷━┱───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┺━┳━━━━━━━┫
  // ┃Toalenn┃ C'h │ W &omega; │ E &epsilon; │ R &rho; │ T &tau; │ Y &psi; │ U &upsilon; │ I &iota; │ O OE│ P &pi; │ &uml; &yen; │ * &pound; ┃Enanka&ntilde;┃
  // ┃     ↹ ┃ c'h │ w   │ e &euro; │ r   │ t   │ y   │ u   │ i ı │ o oe│ p   │ ^ &laquo; │ / &raquo; ┃   ⏎   ┃
  // ┣━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓      ┃
  // ┃Prenn   ┃ A &AElig; │ S &sigma; │ D &delta; │ F &phi; │ G &gamma; │ H &eta; │ J &sigmaf; │ K &kappa; │ L &lambda; │ M &mu; │ &Ugrave; &reg; │ ! &iexcl; ┃      ┃
  // ┃Pennli ⇬┃ a &aelig; │ s   │ d $ │ f   │ g   │ h   │ j   │ k   │ l   │ m   │ &ugrave; ŭ │ ? &iquest; ┃      ┃
  // ┣━━━━━━━┳┹────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┲┷━━━━━┻━━━━━━┫
  // ┃       ┃ Q &theta; │ Z &zeta; │ X &xi; │ C &chi; │ V   │ B &beta; │ N &nu; │ CH  │ &Ntilde;   │ : &copy; │ ;   ┃             ┃
  // ┃Shift ⇧┃ q &lt; │ z &gt; │ x   │ c &cent; │ v   │ b   │ n   │ ch  │ &ntilde;   │ .   │ ,   ┃Shift ⇧      ┃
  // ┣━━━━━━━╋━━━━━┷━┳━━━┷━━━┱─┴─────┴─────┴─────┴─────┴─────┴───┲━┷━━━━━╈━━━━━┻━┳━━━━━━━┳━━━┛
  // ┃       ┃       ┃       ┃ ⍽ Espace ins&eacute;cable              ␣ ┃       ┃       ┃       ┃
  // ┃Reol   ┃Meta   ┃Erl    ┃ ␣ Espace                        ␣ ┃ArErl ⇮┃Menu   ┃Reol   ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹───────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┛
  partial alphanumeric_keys
  xkb_symbols &quot;bre&quot; {

      include &quot;keypad(oss)&quot;

      name[Group1]= &quot;French (Breton)&quot;;

      // First row
      key &lt;TLDE&gt; { [     twosuperior,     dead_tilde,   dead_abovedot,    Greek_GAMMA ] };
      key &lt;AE01&gt; { [       ampersand,              1,     dead_macron,    Greek_DELTA ] };
      key &lt;AE02&gt; { [          eacute,              2,      dead_acute,    Greek_THETA ] };
      key &lt;AE03&gt; { [        quotedbl,              3,      numbersign,    Greek_LAMDA ] };
      key &lt;AE04&gt; { [      apostrophe,              4,       braceleft,       Greek_XI ] };
      key &lt;AE05&gt; { [       parenleft,              5,     bracketleft,       Greek_PI ] };
      key &lt;AE06&gt; { [           minus,              6,             bar,    Greek_SIGMA ] };
      key &lt;AE07&gt; { [          egrave,              7,      dead_grave,      Greek_PHI ] };
      key &lt;AE08&gt; { [      underscore,              8,       backslash,      Greek_PSI ] };
      key &lt;AE09&gt; { [        ccedilla,              9,       plusminus,       Ccedilla ] };
      key &lt;AE10&gt; { [          agrave,              0,              at,    Greek_OMEGA ] };
      key &lt;AE11&gt; { [      parenright, dead_abovering,    bracketright,         ssharp ] };
      key &lt;AE12&gt; { [           equal,           plus,      braceright,        notsign ] };

      // Second row
      // Handling the C'H key correctly requires an inputmethod (XIM)
      // See https://bugs.freedesktop.org/show_bug.cgi?id=19506
   // key &lt;AD01&gt; { [    trigraph_c_h,   trigraph_C_h,    trigraph_C_H,    Greek_alpha ] };
      key &lt;AD01&gt; { [           UF8FD,          UF8FE,           UF8FF,    Greek_alpha ] };
      key &lt;AD02&gt; { [               w,              W,     Greek_omega,    Greek_omega ] };
      key &lt;AD03&gt; { [               e,              E,        EuroSign,  Greek_epsilon ] };
      key &lt;AD04&gt; { [               r,              R,       Greek_rho,      Greek_rho ] };
      key &lt;AD05&gt; { [               t,              T,       Greek_tau,      Greek_tau ] };
      key &lt;AD06&gt; { [               y,              Y,       Greek_psi,      Greek_psi ] };
      key &lt;AD07&gt; { [               u,              U,   Greek_upsilon,  Greek_upsilon ] };
      key &lt;AD08&gt; { [               i,              I,        idotless,     Greek_iota ] };
      key &lt;AD09&gt; { [               o,              O,              oe,             OE ] };
      key &lt;AD10&gt; { [               p,              P,        Greek_pi,       Greek_pi ] };
      key &lt;AD11&gt; { [ dead_circumflex, dead_diaeresis,   guillemotleft,            yen ] };
      key &lt;AD12&gt; { [           slash,       asterisk,  guillemotright,       sterling ] };

      // Third row
      key &lt;AC01&gt; { [               a,              A,              ae,             AE ] };
      key &lt;AC02&gt; { [               s,              S,     Greek_sigma,    Greek_sigma ] };
      key &lt;AC03&gt; { [               d,              D,          dollar,    Greek_delta ] };
      key &lt;AC04&gt; { [               f,              F,       Greek_phi,      Greek_phi ] };
      key &lt;AC05&gt; { [               g,              G,     Greek_gamma,    Greek_gamma ] };
      key &lt;AC06&gt; { [               h,              H,       Greek_eta,      Greek_eta ] };
      key &lt;AC07&gt; { [               j,              J, Greek_finalsmallsigma, Greek_finalsmallsigma ] };
      key &lt;AC08&gt; { [               k,              K,       Greek_kappa,  Greek_kappa ] };
      key &lt;AC09&gt; { [               l,              L,       Greek_lamda, Greek_lambda ] };
      key &lt;AC10&gt; { [               m,              M,          Greek_mu,     Greek_mu ] };
      key &lt;AC11&gt; { [          ugrave,         Ugrave,            ubreve,   registered ] };
      key &lt;BKSL&gt; { [        question,         exclam,      questiondown,   exclamdown ] };

      // Fourth row
      key &lt;LSGT&gt; { [               q,              Q,            less,    Greek_theta ] };
      key &lt;AB01&gt; { [               z,              Z,         greater,     Greek_zeta ] };
      key &lt;AB02&gt; { [               x,              X,        Greek_xi,       Greek_xi ] };
      key &lt;AB03&gt; { [               c,              C,            cent,      Greek_chi ] };
      key &lt;AB04&gt; { [               v,              V                                  ] };
      key &lt;AB05&gt; { [               b,              B,      Greek_beta,     Greek_beta ] };
      key &lt;AB06&gt; { [               n,              N,        Greek_nu,       Greek_nu ] };
      // Handling the CH key correctly requires an inputmethod (XIM)
      // See https://bugs.freedesktop.org/show_bug.cgi?id=19506
   // key &lt;AB07&gt; { [      digraph_ch,     digraph_Ch,      digraph_CH,  Greek_omicron ] };
      key &lt;AB07&gt; { [           UF8FA,          UF8FB,           UF8FC,  Greek_omicron ] };
      key &lt;AB08&gt; { [          ntilde,         Ntilde                                  ] };
      key &lt;AB09&gt; { [          period,          colon,         section,      copyright ] };
      key &lt;AB10&gt; { [           comma,      semicolon,         percent                 ] };

      key &lt;SPCE&gt; { [           space,   nobreakspace,           space,   nobreakspace ] };

      include &quot;level3(ralt_switch)&quot;
  };

  // Occitan layout
  // Author : 2009 Thomas Metz &lt;tmetz @ free.fr&gt;
  // Derived from the layout defined at http://www.panoccitan.org
  // Version: 0.1
  // Differences from OSS French keyboard :
  // - add &aacute;, &iacute;, &ograve;, &oacute; et &uacute;, &Aacute;, &Iacute;, &Ograve;, &Oacute;, &Uacute;, &ntilde;, &Ntilde;
  // - change position of &aelig;, &uuml;, &icirc;, &ucirc;, &oelig;, &ocirc;, &ouml;, &iuml;, &acirc;, &euml;
  //
  // ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┲━━━━━━━━━┓
  // │ &sup3; &cedil; │ 1 ̨  │ 2 &Eacute; │ 3 ˘ │ 4 &mdash; │ 5 &ndash; │ 6 ‑ │ 7 &Egrave; │ 8 &trade; │ 9 &Ccedil; │ 0 &Agrave; │ &deg; &ne; │ + &plusmn; ┃ ⌫ Retour┃
  // │ &sup2; &sup1; │ &amp; ˇ │ &eacute; ~ │ &quot; # │ ' { │ ( [ │ - | │ &egrave; ` │ _ \ │ &ccedil; ^ │ &agrave; @ │ ) ] │ = } ┃  arri&egrave;re┃
  // ┢━━━━━┷━┱───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┴─┬───┺━┳━━━━━━━┫
  // ┃       ┃ A &Aacute; │ Z &AElig; │ E &cent; │ R &Ecirc; │ T &Euml; │ Y &Ucirc; │ U &Uacute; │ I &Iacute; │ O &Oacute; │ P &Ograve; │ &uml; &OElig; │ &pound; &Oslash; ┃Entr&eacute;e ┃
  // ┃Tab ↹  ┃ a &aacute; │ z &aelig; │ e &euro; │ r &ecirc; │ t &euml; │ y &ucirc; │ u &uacute; │ i &iacute; │ o &oacute; │ p &ograve; │ ^ &oelig; │ $ &oslash; ┃   ⏎   ┃
  // ┣━━━━━━━┻┱────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┴┬────┺┓      ┃
  // ┃        ┃ Q &Auml; │ S &bdquo; │ D &Acirc; │ F &sbquo; │ G &yen; │ H &Uuml; │ J &Icirc; │ K &Iuml; │ L &Ocirc; │ M &Ouml; │ % &Ugrave; │ &micro; ̄  ┃      ┃
  // ┃Maj ⇬   ┃ q &auml; │ s &szlig; │ d &acirc; │ f &lsquo; │ g &rsquo; │ h &uuml; │ j &icirc; │ k &iuml; │ l &ocirc; │ m &ouml; │ &ugrave; ' │ * ` ┃      ┃
  // ┣━━━━━━━┳┹────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┬┴────┲┷━━━━━┻━━━━━━┫
  // ┃       ┃ &gt; &ge; │ W &ldquo; │ X &rdquo; │ C &reg; │ V &larr; │ B &uarr; │ N &Ntilde; │ ? &hellip; │ . . │ / ∕ │ &sect; &minus; ┃             ┃
  // ┃Shift ⇧┃ &lt; &le; │ w &laquo; │ x &raquo; │ c &copy; │ v &rarr; │ b &darr; │ n &ntilde; │ , &iquest; │ ; &times; │ : &divide; │ ! &iexcl; ┃Shift ⇧      ┃
  // ┣━━━━━━━╋━━━━━┷━┳━━━┷━━━┱─┴─────┴─────┴─────┴─────┴─────┴───┲━┷━━━━━╈━━━━━┻━┳━━━━━━━┳━━━┛
  // ┃       ┃       ┃       ┃ ␣         Espace fine ins&eacute;cable ⍽ ┃       ┃       ┃       ┃
  // ┃Ctrl   ┃Meta   ┃Alt    ┃ ␣ Espace       Espace ins&eacute;cable ⍽ ┃AltGr ⇮┃Menu   ┃Ctrl   ┃
  // ┗━━━━━━━┻━━━━━━━┻━━━━━━━┹───────────────────────────────────┺━━━━━━━┻━━━━━━━┻━━━━━━━┛
  partial alphanumeric_keys
  xkb_symbols &quot;oci&quot; {

      include &quot;fr(oss)&quot;

      name[Group1]= &quot;Occitan&quot;;

      key &lt;AD01&gt;  { [                a,                A,               aacute,                Aacute ] }; // a A &aacute; &Aacute;
      key &lt;AD02&gt;  { [                z,                Z,                   ae,                    AE ] }; // z Z &aelig; &AElig;
      key &lt;AD05&gt;  { [                t,                T,           ediaeresis,            Ediaeresis ] }; // t T &euml; &Euml;
      key &lt;AD06&gt;  { [                y,                Y,          ucircumflex,           Ucircumflex ] }; // y Y &ucirc; &Ucirc;
      key &lt;AD07&gt;  { [                u,                U,               uacute,                Uacute ] }; // u U &uacute; &Uacute;
      key &lt;AD08&gt;  { [                i,                I,               iacute,                Iacute ] }; // i I &iacute; &Iacute;
      key &lt;AD09&gt;  { [                o,                O,               oacute,                Oacute ] }; // o O &oacute; &Oacute;
      key &lt;AD10&gt;  { [                p,                P,               ograve,                Ograve ] }; // p P &ograve; &Ograve;
      key &lt;AD11&gt;  { [  dead_circumflex,   dead_diaeresis,                   oe,                    OE ] }; // ^ ̈ ̃ &oelig; &OElig;

      key &lt;AC03&gt;  { [                d,                D,          acircumflex,           Acircumflex ] }; // d D &acirc; &Acirc;
      key &lt;AC06&gt;  { [                h,                H,           udiaeresis,            Udiaeresis ] }; // h H &uuml; &Uuml;
      key &lt;AC07&gt;  { [                j,                J,          icircumflex,           Icircumflex ] }; // j J &icirc; &Icirc;
      key &lt;AC08&gt;  { [                k,                K,           idiaeresis,            Idiaeresis ] }; // k K &iuml; &Iuml;
      key &lt;AC09&gt;  { [                l,                L,          ocircumflex,           Ocircumflex ] }; // l L &ocirc; &Ocirc;

      key &lt;AB04&gt;  { [                v,                V,           rightarrow,             leftarrow ] }; // v V &rarr; &larr;
      key &lt;AB06&gt;  { [                n,                N,               ntilde,                Ntilde ] }; // n N &ntilde; &Ntilde;
  };

  // Marc.Shapiro@inria.fr 19-sep-1998
  // modifications : Etienne Herlent &lt;eherlent@linux-france.org&gt; june 2000
  // adapted to the new input layer :
  //        Martin Costabel &lt;costabel@wanadoo.fr&gt; 3-jan-2001
  // adapted for Latin9 alphabet (ISO-8859-15):
  //        Etienne Herlent &lt;eherlent@linux-france.org&gt; march 2005

  // This map is an almost-complete mapping of the standard French
  // MacIntosh keyboard under Xwindows.  I tried to remain as faithful
  // as possible to the Mac meaning of each key.  I did this entirely by
  // hand and by intuition, relying on the Clavier (Keyboard?) Desktop
  // Accessory for the Mac meaning of keys, and on reading keysymdef.h
  // to intuit the corresponding X names.  Lacking proper documentation,
  // I may have made some mistakes.

  // Entries marked CHECK are particularly uncertain

  // Entries marked MISSING mark Mac characters for which I was unable
  // to find a corresponding keysym.  (Some for sure don't: e.g. the
  // Apple mark and the oe/OE character; others I may have simply not
  // found.)

  // Copied from macintosh_vndr/fr
  partial alphanumeric_keys
  xkb_symbols &quot;mac&quot; {

      name[Group1]= &quot;French (Macintosh)&quot;;

      key &lt;TLDE&gt; {    [          at, numbersign, periodcentered,  Ydiaeresis  ]   }; // MISSING: Ydiaeresis; eherlent : ok in Latin9
      key &lt;AE01&gt; {    [   ampersand,    1,   VoidSymbol,    dead_acute    ]   }; // MISSING: Apple
      key &lt;AE02&gt; {    [      eacute,    2,   ediaeresis,        Eacute    ]   };
      key &lt;AE03&gt; {    [    quotedbl,    3,   VoidSymbol,    VoidSymbol    ]   }; // CHECK all quotemarks
      key &lt;AE04&gt; {    [  apostrophe,    4,   VoidSymbol,    VoidSymbol    ]   };
      key &lt;AE05&gt; {    [   parenleft,    5,    braceleft,   bracketleft    ]   };
   // CHECK section
      key &lt;AE06&gt; {    [     section,    6,    paragraph,         aring    ]   };
      key &lt;AE07&gt; {    [      egrave,    7, guillemotleft, guillemotright  ]   };
      key &lt;AE08&gt; {    [      exclam,    8,   exclamdown,   Ucircumflex    ]   };
      key &lt;AE09&gt; {    [    ccedilla,    9,     Ccedilla,        Aacute    ]   };
      key &lt;AE10&gt; {    [      agrave,    0,       oslash,    VoidSymbol    ]   }; // MISSING: Oslash
      key &lt;AE11&gt; {    [  parenright, degree, braceright,  bracketright    ]   };
      key &lt;AE12&gt; {    [       minus, underscore, emdash,        endash    ]   }; // CHECK dashes

      key &lt;AD01&gt; {    [           a,  A,           ae,          AE    ]   };
      key &lt;AD02&gt; {    [           z,  Z,  Acircumflex,       Aring    ]   };
      key &lt;AD03&gt; {    [           e,  E,  ecircumflex, Ecircumflex    ]   };
      key &lt;AD04&gt; {    [           r,  R,   registered,    currency    ]   };
      key &lt;AD05&gt; {    [           t,  T,   VoidSymbol,  VoidSymbol    ]   };
      key &lt;AD06&gt; {    [           y,  Y,       Uacute,  Ydiaeresis    ]   }; // MISSING: Ydiaeresis; eherlent : ok in Latin9
      key &lt;AD07&gt; {    [           u,  U,   VoidSymbol, ordfeminine    ]   }; // MISSING: ordmasculine?
      key &lt;AD08&gt; {    [           i,  I,  icircumflex,  idiaeresis    ]   };
      key &lt;AD09&gt; {    [           o,  O,           oe,          OE    ]   }; // MISSING: oe, OE lacking in Latin1; eherlent ok in Latin9
      key &lt;AD10&gt; {    [           p,  P,   VoidSymbol,  VoidSymbol    ]   };
      key &lt;AD11&gt; {    [dead_circumflex,dead_diaeresis, ocircumflex, Ocircumflex   ]   };
      key &lt;AD12&gt; {    [      dollar, asterisk,   EuroSign, yen    ]   }; // eherlent : EuroSign in Latin9

      key &lt;AC01&gt; {    [         q, Q, acircumflex,         Agrave ]   };
      key &lt;AC02&gt; {    [         s, S,      Ograve,     VoidSymbol ]   };
      key &lt;AC03&gt; {    [         d, D,  VoidSymbol,     VoidSymbol ]   };
      key &lt;AC04&gt; {    [         f, F,  VoidSymbol, periodcentered ]   }; // MISSING: oblong script f??
      key &lt;AC05&gt; {    [         g, G,  VoidSymbol,     VoidSymbol ]   }; // MISSING: kerned fi, fl
      key &lt;AC06&gt; {    [         h, H,      Igrave,    Icircumflex ]   };
      key &lt;AC07&gt; {    [         j, J,  Idiaeresis,         Iacute ]   };
      key &lt;AC08&gt; {    [         k, K,      Egrave,     Ediaeresis ]   };
      key &lt;AC09&gt; {    [         l, L,     notsign,            bar ]   };
      key &lt;AC10&gt; {    [         m, M,          mu,         Oacute ]   };
      key &lt;AC11&gt; {    [    ugrave,percent, Ugrave,    ucircumflex ]   }; // MISSING: per-mille
      key &lt;BKSL&gt; {    [ dead_grave, sterling,  at,     numbersign ]   };

      key &lt;LSGT&gt; {    [      less, greater, VoidSymbol, VoidSymbol    ]   };
      key &lt;AB01&gt; {    [         w, W, VoidSymbol,   VoidSymbol    ]   }; // MISSING: half-guillemot (single angle bracket)
      key &lt;AB02&gt; {    [         x, X, VoidSymbol,   VoidSymbol    ]   }; // CHECK similarequal; MISSING: extra-slanted slash
      key &lt;AB03&gt; {    [         c, C,  copyright,         cent    ]   };
      key &lt;AB04&gt; {    [         v, V,    diamond,  leftradical    ]   }; // CHECK diamond, leftradical
      key &lt;AB05&gt; {    [         b, B,     ssharp,   VoidSymbol    ]   }; // CHECK: Greek_beta or ssharp?; MISSING: oblong script s
      key &lt;AB06&gt; {    [         n, N,  dead_tilde,  asciitilde    ]   };
      key &lt;AB07&gt; {    [     comma,  question, VoidSymbol,  questiondown   ]   };
      key &lt;AB08&gt; {    [ semicolon,  period, VoidSymbol,  periodcentered   ]   };
      key &lt;AB09&gt; {    [     colon,  slash,   division,        backslash   ]   };
      key &lt;AB10&gt; {    [     equal,   plus, VoidSymbol,        plusminus   ]   };

      key &lt;SPCE&gt; {    [     space,  space, nobreakspace,   nobreakspace   ]   };

      key &lt;KPDL&gt; {    [  comma,KP_Decimal ]   };

      include &quot;level3(ralt_switch)&quot;
  };

  partial alphanumeric_keys
  xkb_symbols &quot;geo&quot; {
      include &quot;ge(basic)&quot;

      name[Group1]= &quot;Georgian (France, AZERTY Tskapo)&quot;;

      key &lt;TLDE&gt; { [ exclam, noSymbol ] };
      key &lt;AE01&gt; { [ 0x0100201e, 1 ] };
      key &lt;AE02&gt; { [ 0x01002116, 2 ] };
      key &lt;AE03&gt; { [ percent, 3    ] };
      key &lt;AE04&gt; { [ parenleft, 4  ] };
      key &lt;AE05&gt; { [ colon, 5      ] };
      key &lt;AE06&gt; { [ semicolon, 6  ] };
      key &lt;AE07&gt; { [ question, 7   ] };
      key &lt;AE08&gt; { [ 0x01002116, 8 ] };
      key &lt;AE09&gt; { [ degree, 9     ] };
      key &lt;AE10&gt; { [ parenright, 0 ] };
      key &lt;AE11&gt; { [ minus, underscore, 0x01002014 ] };
      key &lt;AE12&gt; { [ less, greater ] };

      key &lt;AD01&gt; { [ 0x010010d0,  0x010010fa     ] };
      key &lt;AD02&gt; { [ 0x010010d6,  Z              ] };
      key &lt;AD03&gt; { [ 0x010010d4,  E, 0x010010f1  ] };
      key &lt;AD04&gt; { [ 0x010010e0,  0x010000ae     ] };
      key &lt;AD05&gt; { [ 0x010010e2,  T              ] };
      key &lt;AD06&gt; { [ 0x010010e7,  0x010010f8     ] };
      key &lt;AD07&gt; { [ 0x010010e3,  U              ] };
      key &lt;AD08&gt; { [ 0x010010d8,  0x010010f2     ] };
      key &lt;AD09&gt; { [ 0x010010dd,  O              ] };
      key &lt;AD10&gt; { [ 0x010010de,  P              ] };
      key &lt;AD11&gt; { [ 0x010010d7,  T              ] };
      key &lt;AD12&gt; { [ 0x010010eb,  Z              ] };

      key &lt;AC01&gt; { [ 0x010010e5,  Q              ] };
      key &lt;AC02&gt; { [ 0x010010e1,  S              ] };
      key &lt;AC03&gt; { [ 0x010010d3,  D              ] };
      key &lt;AC04&gt; { [ 0x010010e4,  0x010010f6     ] };
      key &lt;AC05&gt; { [ 0x010010d2,  0x010010f9     ] };
      key &lt;AC06&gt; { [ 0x010010f0,  0x010010f5     ] };
      key &lt;AC07&gt; { [ 0x010010ef,  0x010010f7     ] };
      key &lt;AC08&gt; { [ 0x010010d9,  K              ] };
      key &lt;AC09&gt; { [ 0x010010da,  L              ] };
      key &lt;AC10&gt; { [ 0x010010db,  M              ] };
      key &lt;AC11&gt; { [ 0x010010df,  J              ] };
      key &lt;BKSL&gt; { [ 0x010010e9,  0x010000a9     ] };

      key &lt;LSGT&gt; { [ guillemotleft,guillemotright ] };
      key &lt;AB01&gt; { [ 0x010010ec,  W               ] };
      key &lt;AB02&gt; { [ 0x010010ee,  0x010010f4      ] };
      key &lt;AB03&gt; { [ 0x010010ea,  0x010000a9      ] };
      key &lt;AB04&gt; { [ 0x010010d5,  0x010010f3      ] };
      key &lt;AB05&gt; { [ 0x010010d1,  B               ] };
      key &lt;AB06&gt; { [ 0x010010dc,  0x010010fc      ] };
      key &lt;AB07&gt; { [ comma,       0x01002014      ] };
      key &lt;AB08&gt; { [ 0x010010e8,  S               ] };
      key &lt;AB09&gt; { [ 0x010010e6,  noSymbol        ] };
      key &lt;AB10&gt; { [ 0x010010ed,  noSymbol        ] };

  };

  // EXTRAS:

  partial alphanumeric_keys
      xkb_symbols &quot;sun_type6&quot; {
      include &quot;sun_vndr/fr(sun_type6)&quot;
  };


  partial alphanumeric_keys
  xkb_symbols &quot;azerty&quot; {
      name[Group1]=&quot;French (AZERTY)&quot;;

      include &quot;level3(ralt_switch)&quot;

  // French AZERTY-Keyboard layout
  // Author : 2015, Mats Blakstad &lt;mats @ globalbility.org&gt;
  // Based on the layout at https://en.wikipedia.org/wiki/File:KB_France.svg

  // LAYOUT OVERVIEW                              
  //  ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ _______
  // |    | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 0  | &deg;  | +  | &lt;--   |
  // | &sup2;  | &amp;  | &eacute; ~| &quot; #| ' {| ( [| - || &egrave; `| _ \| &ccedil; ^| &agrave; @| ) ]| = }|       |
  //  ========================================================================
  // | |&lt;-  | A  | Z  | E  | R  | T  | Y  | U  | I  | O  | P  | &uml;  | $  |   , |
  // |  -&gt;| | a  | z  | e &euro;| r  | t  | y  | u  | i  | o  | p  | ^  | &pound; &curren;| &lt;-' |
  //  ===================================================================&not;    |
  // |       | Q  | S  | D  | F  | G  | H  | J  | K  | L  | M  | %  | &micro;  |    |
  // | MAJ   | q  | s  | d  | f  | g  | h  | j  | k  | l  | m  | &ugrave;  | *  |    |
  //  ========================================================================
  // | ^   | &gt;  | W  | X  | C  | V  | B  | N  | ?  | .  | /  | &sect;  |     ^     |
  // | |   | &lt;  | w  | x  | c  | v  | b  | n  | ,  | ;  | :  | !  |     |     |
  //  ========================================================================
  // |      |      |      |                       |       |      |     |      |
  // | Ctrl | Super| Alt  | Space    Nobreakspace | AltGr | Super|Menu | Ctrl |
  //  &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr; &macr;&macr;&macr;&macr;&macr;&macr;

      // First row
      key &lt;TLDE&gt;  { [ twosuperior, U2014                  ] };
      key &lt;AE01&gt;  { [ ampersand,  1                       ] };
      key &lt;AE02&gt;  { [ eacute,     2,      asciitilde      ] };
      key &lt;AE03&gt;  { [ quotedbl,   3,      numbersign      ] };
      key &lt;AE04&gt;  { [ apostrophe, 4,      braceleft       ] };
      key &lt;AE05&gt;  { [ parenleft,  5,      bracketleft     ] };
      key &lt;AE06&gt;  { [ minus,      6,      bar             ] };
      key &lt;AE07&gt;  { [ egrave,     7,      grave           ] };
      key &lt;AE08&gt;  { [ underscore, 8,      backslash       ] };
      key &lt;AE09&gt;  { [ ccedilla,   9,      asciicircum     ] };
      key &lt;AE10&gt;  { [ agrave,     0,      at              ] };
      key &lt;AE11&gt;  { [ parenright, degree, bracketright    ] };
      key &lt;AE12&gt;  { [ equal,      plus,   braceright      ] };

      // Second row
      key &lt;AD01&gt;  { [ a,      A, agrave, at       ] };
      key &lt;AD02&gt;  { [ z,      Z                   ] };
      key &lt;AD03&gt;  { [ e,      E, EuroSign         ] };
      key &lt;AD04&gt;  { [ r,      R                   ] };
      key &lt;AD05&gt;  { [ t,      T                   ] };
      key &lt;AD06&gt;  { [ y,      Y                   ] };
      key &lt;AD07&gt;  { [ u,      U, ugrave, mu       ] };
      key &lt;AD08&gt;  { [ i,      I                   ] };
      key &lt;AD09&gt;  { [ o,      O                   ] };
      key &lt;AD10&gt;  { [ p,      P                   ] };
      key &lt;AD11&gt;  { [ dead_circumflex, dead_diaeresis         ] };
      key &lt;AD12&gt;  { [ dollar,     sterling,   currency        ] };

      // Third row
      key &lt;AC01&gt;  { [ q,      Q                   ] };
      key &lt;AC02&gt;  { [ s,      S, U00DF, sterling  ] };
      key &lt;AC03&gt;  { [ d,      D, degree, dollar   ] };
      key &lt;AC04&gt;  { [ f,      F                   ] };
      key &lt;AC05&gt;  { [ g,      G                   ] };
      key &lt;AC06&gt;  { [ h,      H                   ] };
      key &lt;AC07&gt;  { [ j,      J                   ] };
      key &lt;AC08&gt;  { [ k,      K                   ] };
      key &lt;AC09&gt;  { [ l,      L                   ] };
      key &lt;AC10&gt;  { [ m,      M                   ] };
      key &lt;AC11&gt;  { [ ugrave,     percent             ] };
      key &lt;BKSL&gt;  { [ asterisk,   mu, U00D7, U22C5    ] };

      // Fourth row
      key &lt;LSGT&gt;  { [ less,       greater             ] };
      key &lt;AB01&gt;  { [ w,      W                       ] };
      key &lt;AB02&gt;  { [ x,      X                       ] };
      key &lt;AB03&gt;  { [ c,      C, ccedilla, currency   ] };
      key &lt;AB04&gt;  { [ v,      V                       ] };
      key &lt;AB05&gt;  { [ b,      B                       ] };
      key &lt;AB06&gt;  { [ n,      N                       ] };
      key &lt;AB07&gt;  { [ comma,      question            ] };
      key &lt;AB08&gt;  { [ semicolon,  period              ] };
      key &lt;AB09&gt;  { [ colon,      slash               ] };
      key &lt;AB10&gt;  { [ exclam,     section             ] };
  };
  </pre>
  </details>

  ``` bash
  sudo cp /usr/share/X11/xkb/symbols/fr /usr/share/X11/xkb/symbols/fr.bak
  sudo cp -f keyboard_fr /usr/share/X11/xkb/symbols/fr
  setxkbmap fr latin9
  ```

## Émulateur de terminal: Guake

* Installation

  ``` bash
  sudo apt install guake
  ```

* Preferences

  - General > Start Guake at login
  - Keyboard shortcuts > General > Toggle Guake visiblity > Insert

## Password manager: KeePass

* Installation

  ``` bash
  sudo apt install keepass2
  sudo add-apt-repository ppa:dlech/keepass2-plugins
  sudo apt update
  sudo apt install keepass2-plugin-rpc
  ```

* Préférences

  - Tools > KeePassRPC Options  
    Dès que KeePass et Kee communiquent, une fenêtre s’ouvre et vous présente un code.  
    Copiez ce code dans l’onglet qui s’ouvre aussi automatiquement dans le navigateur.

## Sauvegarde fichiers: Dropbox

* Installation

  ``` bash
  https://www.dropbox.com/install-linux
  sudo dpkg -i dropbox*.deb
  dropbox start -i
  ```

## Navigateur web: Firefox

* Installation

  ``` bash
  sudo apt install firefox
  ```

* Addons  
  Cliquer sur le puzzle > pin to toolbar

  - addblock plus
  - kee
  - soundfixer

* Préférences

  - Settings > General > Open previous windows and tabs

* Configurations

  - devtools.netmonitor.features.newEditAndResend: false
  - gfx.webrender.all: true

## Utilitaires

* Client mail

  ``` bash
  sudo apt install thunderbird
  ```

* Image viewer

  ``` bash
  sudo apt-get install eog
  ```

* Document viewer

  ``` bash
  sudo apt-get install evince
  ```

* Video player

  ``` bash
  sudo apt install vlc
  ```
  ``` bash
  sudo apt install mpv
  ```

* Utilitaires shell

  ``` bash
  sudo apt install imagemagick ffmpeg
  sudo apt install curl wget vim
  ```

## Dev tools

* Navigateur web 2: Chromium

  ``` bash
  sudo apt install chromium-browser
  ```

* Git

  ``` bash
  sudo apt install git
  git config --global user.email "amistri@live.fr"
  git config --global user.name "a-mt"
  ```

* Meld

  ``` bash
  sudo apt install meld
  ```

* Python

  ``` bash
  sudo apt-get install software-properties-common
  sudo apt-get install python3-pip
  sudo apt-get install python3-venv
  sudo apt-get install python3-distutils

  sudo add-apt-repository ppa:deadsnakes/ppa
  sudo apt install python3.10 python3.10-dev
  sudo apt-get install python3.10-distutils

  sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 2
  sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
  sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1
  sudo update-alternatives --config python3
  curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

  sudo pip install --upgrade pip
  ```

* Heroku

  ``` bash
  sudo su
  curl https://cli-assets.heroku.com/install.sh | sh
  which heroku
  ```

* [Node](https://github.com/nodesource/distributions#debinstall), n, yarn

  ``` bash
  curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs
  node --version
  npm --version
  ```
  ``` bash
  sudo npm install -g n
  n ls-remote

  sudo n stable
  hash -r
  node --version
  ```
  ``` bash
  sudo npm install -g yarn
  ```

## Containers: Docker

* [Installation](https://blog.assortedsolutions.com/2018/02/04/Install-Docker-CE-on-Elementary-OS/index.html)

  ``` bash
  # Set up the repository
  sudo apt-get update;

  sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      software-properties-common;

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -;

  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable";
  ```
  ``` bash
  # Install Docker Engine
  sudo apt-get update;

  sudo apt-get update
  sudo apt-get install docker-ce;
  ```
  ``` bash
  # Check its status
  sudo systemctl status docker;
  docker --version
  docker info
  sudo docker run hello-world
  ```

* Execution en tant que root

  ``` bash
  # Authorize the current user to execute docker as root
  sudo usermod -aG docker $USER
  su $USER
  docker run hello-world
  exit
  ```

* Configuration logrotate

  ``` bash
  sudo vim /etc/docker/daemon.json
  ```
  ```
  {
    "log-driver": "json-file",
    "log-opts": {
      "max-size": "10m",
      "max-file": "3"
    }
  }
  ```
  ``` bash
  sudo systemctl daemon-reload
  sudo systemctl restart docker
  sudo docker info
  ```

* [Installation docker-compose](https://docs.docker.com/compose/install/other/)

  ``` bash
  sudo curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
  sudo chmod +x !$
  !$ --version

  sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
  docker-compose --version
  ```

## Éditeur images: Gimp

* Installation

  ```
  sudo apt install gimp webp
  ```

* Préférences: Edit > Preferences

  - Interface > Theme > System
  - Interface > Icon Theme > Legacy
  - Interface > Toolbox > Uncheck show GIMP logo

## Éditeur de texte: Sublime text

* [Installation Sublime text](https://www.sublimetext.com/docs/linux_repositories.html)

* [Installation Package control](https://packagecontrol.io/installation)

* Packages: Preferences > Package control > Install

  - Case Conversion
  - Gutter Color
  - Handlebars
  - nginx
  - SCSS
  - Smarty
  - Twig
  - SelectUntil
  - Stylus
  - Theme - SoDaReloaded
  - SideBarEnhancements (ajout "copy path" dans le menu contextuel, etc)

* Préferences

  - Select color scheme > monokai
  - <details>
    <summary>Settings - User (Preferences.sublime-settings)</summary>

    <pre lang="js">
    {
      "ignored_packages":
      [
        "Vintage",
      ],
      "theme": "SoDaReloaded Dark.sublime-theme",
      "font_size": 11,
      "show_encoding": true,
      "translate_tabs_to_spaces": true,
      "color_scheme": "Monokai.sublime-color-scheme",
      "index_exclude_patterns":
      [
        "log/*",
        "logs/*",
        "node_modules/*",
        "vendor/*",
        "*.log",
        "fonts/*"
      ],
      "folder_exclude_patterns":
      [
        ".svn",
        ".git",
        ".yarn",
        "__pycache__",
        "dist",
        "node_modules",
        "env",
        "docker_volumes",
        "fonts",
      ],
      "binary_file_patterns":
      [
        "*.jpg",
        "*.jpeg",
        "*.png",
        "*.gif",
        "*.ttf",
        "*.tga",
        "*.dds",
        "*.ico",
        "*.eot",
        "*.pdf",
        "*.swf",
        "*.jar",
        "*.zip",
        "*.woff",
        "*.tar",
        "*.gz",
        "*.pm3",
        "*.mp4"
      ],
    }
    </pre>
    </details>

  - <details>
    <summary>Customize theme (SoDaReloaded Dark.sublime-theme)</summary>

    <pre lang="js">
    // Documentation at https://www.sublimetext.com/docs/themes.html
    {
      "variables":
      {
      },
      "rules":
      [
        {
            "class": "sidebar_label",
            "color": [125, 125, 125],
            "shadow_color": [0, 0, 0],
            "shadow_offset": [0, -1],
            "font.bold": false,
            "font.italic": false,
            "font.size": 14
        },
        {
            "class": "tab_label",
            "fade": true,
            "fg": [170, 170, 170],
            "shadow_color": [25, 25, 25],
            "shadow_offset": [0, -1],
            "font.italic": false,
            "font.size": 14
        }
      ]
    }
    </pre>
    </details>

  - <details>
    <summary>Key bindings (Default (Linux).sublime-keymap)</summary>

    <pre lang="js">
    [
      { "keys": ["ctrl+k", "ctrl+s"], "command": "convert_to_snake"},
      { "keys": ["ctrl+k", "ctrl+shift+s"], "command": "convert_to_screaming_snake"},
      { "keys": ["ctrl+k", "ctrl+c"], "command": "convert_to_camel"},
      { "keys": ["ctrl+k", "ctrl+p"], "command": "convert_to_pascal"},
      { "keys": ["ctrl+k", "ctrl+d"], "command": "convert_to_dot"},
      { "keys": ["ctrl+k", "ctrl+h"], "command": "convert_to_dash"},
      { "keys": ["ctrl+k", "ctrl+w"], "command": "convert_to_separate_words"},
      { "keys": ["ctrl+k", "ctrl+/"], "command": "convert_to_slash"},
      { "keys": ["ctrl+k", "ctrl+b"], "command": "convert_to_back_slash"},
      { "keys": ["ctrl+shift+-"], "command": "toggle_snake_camel_pascal"},
      { "keys": ["ctrl+e"], "command": "select_until", "args": { "extend": true } },
      { "keys": ["ctrl+shift+e"], "command": "reverse_select" },
      { "keys": ["ctrl+m", "ctrl+p"], "command": "toggle_side_bar" },
      {
        "keys": ["alt+shift+1"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+2"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+3"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+4"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+8"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+9"],
        "command": "noop"
      },
      {
        "keys": ["alt+shift+5"],
        "command": "noop"
      },
    ]
    </pre>
    </details>

## Éditeur document: Libre Office

* [Téléchargement](https://snapcraft.io/install/libreoffice/elementary)

* Installation

  ``` bash
  tar -xf Libre*
  cd Libre*
  cd DEBS
  sudo dpkg -i *.deb
  ```

## Éditeur markdown: ReText

* Installation

  ``` bash
  sudo apt install retext
  ```

* Configurations

  <details>
  <summary>~.config/ReText project/github.css</summary>

  <pre lang="css">
  body {
      font-size: 16px;
      line-height: 1.5;
      overflow-x: hidden;
      font-family: Helvetica, arial, freesans, clean, sans-serif;
      max-width: 888px;
      margin: 0 auto;
      padding: 0 45px;
      padding-bottom: 10px;
      box-sizing: border-box;
  }
  body > :first-child {
      margin-top: 0!important;
  }
  body > :last-child {
      margin-bottom: 0!important;
  }
  blockquote, dl, ol, ul, p, pre, table {
      border: 0;
      margin: 15px 0;
      padding: 0;
  }
  @media print {
      body {
          max-width: unset;
      }
  }

  /* LINK */
  a {
      color: #4183c4;
      text-decoration: none;
  }
  a: hover {
      text-decoration: underline;
  }
  a.absent {
      color: #c00;
  }
  a.anchor {
      display: block;
      padding-left: 30px;
      margin-left:-30px;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0 
  }

  /* HEADING */
  h1, h2, h3, h4, h5, h6 {
      padding: 0;
      cursor: text;
      position: relative;
      font-weight: 600;
      line-height: 1.25;
      margin: 24px 0 16px 0;
  }
  h1: hover a.anchor,
  h2: hover a.anchor,
  h3: hover a.anchor,
  h4: hover a.anchor,
  h5: hover a.anchor,
  h6: hover a.anchor {
      text-decoration: none;
      line-height: 1;
      padding-left: 0;
      margin-left:-22px;
      top: 15% 
  }
  h1, h2 {
      border-bottom: 1px solid #eaecef;
      padding-bottom: .3em;
  }
  h1 {
      font-size: 2em;
  }
  h2 {
      font-size: 1.5em;
  }
  h3 {
      font-size: 1.25em 
  }
  h4 {
      font-size: 1em 
  }
  h5 {
      font-size:.875em;
  }
  h6 {
      color: #6a737d;
      font-size: .85em;
  }

  /* LISTS */
  li p {
      margin: 16px 0;
  }
  ul, ol {
      padding-left: 30px;
  }
  ul.no-list, ol.no-list {
      list-style-type: none;
      padding: 0;
  }
  ul ul, ul ol, ol ol, ol ul {
      margin-bottom: 0;
      margin-top: 0;
  }
  dl {
      padding: 0;
  }
  dl dt {
      font-size: 14px;
      font-style: italic;
      font-weight: 700;
      margin-top: 15px;
      padding: 0;
  }
  dl dd {
      margin-bottom: 15px;
      padding: 0 15px;
  }

  /* TASK LIST */
  body .task-list {
      list-style-type: none;
      padding-left: 10px 
  }
  .task-list-item {
      padding-left: 20px 
  }
  .task-list-item label {
      font-weight: normal 
  }
  .task-list-item.enabled label {
      cursor: pointer 
  }
  .task-list-item+.task-list-item {
      margin-top: 5px 
  }
  .task-list-item-checkbox {
      float: left;
      margin-left:-20px;
      margin-top: 7px 
  }

  /* BLOCKQUOTE */
  blockquote {
      border-left: 4px solid #DDD;
      color: #777;
      padding: 0 15px;
  }
  blockquote > :first-child {
      margin-top: 0;
  }
  blockquote > :last-child {
      margin-bottom: 0;
  }

  /* TABLE */
  table {
      display: block;
      overflow: auto;
      width: 100%;
      border-collapse: collapse;
  }
  th {
      font-weight: 700;
  }
  th, td {
      border: 1px solid #ddd;
      padding: 6px 13px;
  }
  tr {
      background-color: #fff;
      border-top: 1px solid #ccc;
  }
  tr:nth-child(2n) {
      background-color: #f6f8fa;
  }

  /* IMG */
  table img {
      max-width: 150px;
  }
  body img {
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      max-width: 100%;
  }

  /* CODE */
  code, tt {
      background-color: #f4f4f4;
      border-radius: 3px;
      padding: 3px 5px;
  }
  code {
      white-space: nowrap;
  }
  code, pre {
      font-family: Consolas, "Liberation Mono", Courier, monospace;
      font-size: 12px 
  }
  pre {
      background-color: #F6F8FA;
      font-size: 13px;
      line-height: 19px;
      overflow: auto;
      padding: 16px;
      border-radius: 3px 
  }
  pre code, pre tt {
      background-color: transparent;
      border: none;
      margin: 0;
      padding: 0;
      white-space: pre;
  }
  kbd {
      font-size: 11px;
      color: #444d56;
      background-color: #fafbfc;
      border: 1px solid #c6cbd1;
      border-bottom-color: #959da5;
      border-radius: 3px;
      box-shadow: inset 0 -1px 0 #959da5;
      padding: 3px 5px;
  }

  /* HR */
  body hr {
      background-color: #e1e4e8;
      border: 0;
      height: .25em;
      margin: 24px 0;
      padding: 0;
  }

  /* ? */
  body span.frame {
      display: block;
      overflow: hidden;
  }
  body span.frame>span {
      border: 1px solid #ddd;
      display: block;
      float: left;
      margin: 13px 0 0;
      overflow: hidden;
      padding: 7px;
      width: auto;
  }
  body span.frame span img {
      display: block;
      float: left;
  }
  body span.frame span span {
      clear: both;
      color: #333;
      display: block;
      padding: 5px 0 0;
  }
  body span.align-center {
      clear: both;
      display: block;
      overflow: hidden;
  }
  body span.align-center>span {
      display: block;
      margin: 13px auto 0;
      overflow: hidden;
      text-align: center;
  }
  body span.align-center span img {
      margin: 0 auto;
      text-align: center;
  }
  body span.align-right {
      clear: both;
      display: block;
      overflow: hidden;
  }
  body span.align-right>span {
      display: block;
      margin: 13px 0 0;
      overflow: hidden;
      text-align: right;
  }
  body span.align-right span img {
      margin: 0;
      text-align: right;
  }
  body span.float-left {
      display: block;
      float: left;
      margin-right: 13px;
      overflow: hidden;
  }
  body span.float-left span {
      margin: 13px 0 0;
  }
  body span.float-right {
      display: block;
      float: right;
      margin-left: 13px;
      overflow: hidden;
  }
  body span.float-right>span {
      display: block;
      margin: 13px auto 0;
      overflow: hidden;
      text-align: right;
  }

  /* HIGHLIGHT */
  .highlight {
      background: #ffffff 
  }
  .highlight .c {
      color: #999988;
      font-style: italic 
  }
  .highlight .err {
      font-weight: bold border: none !important;
  }
  .highlight .k {
      font-weight: bold 
  }
  .highlight .o {
      font-weight: bold 
  }
  .highlight .cm {
      color: #999988;
      font-style: italic 
  }
  .highlight .cp {
      color: #999999;
      font-weight: bold 
  }
  .highlight .c1 {
      color: #999988;
      font-style: italic 
  }
  .highlight .cs {
      color: #999999;
      font-weight: bold;
      font-style: italic 
  }
  .highlight .gd {
      color: #000000;
      background-color: #ffdddd 
  }
  .highlight .gd .x {
      color: #000000;
      background-color: #ffaaaa 
  }
  .highlight .ge {
      font-style: italic 
  }
  .highlight .gr {
      color: #aa0000 
  }
  .highlight .gh {
      color: #999999 
  }
  .highlight .gi {
      color: #000000;
      background-color: #ddffdd 
  }
  .highlight .gi .x {
      color: #000000;
      background-color: #aaffaa 
  }
  .highlight .go {
      color: #888888 
  }
  .highlight .gp {
      color: #555555 
  }
  .highlight .gs {
      font-weight: bold 
  }
  .highlight .gu {
      color: #800080;
      font-weight: bold 
  }
  .highlight .gt {
      color: #aa0000 
  }
  .highlight .kc {
      font-weight: bold 
  }
  .highlight .kd {
      font-weight: bold 
  }
  .highlight .kn {
      font-weight: bold 
  }
  .highlight .kp {
      font-weight: bold 
  }
  .highlight .kr {
      font-weight: bold 
  }
  .highlight .kt {
      color: #445588;
      font-weight: bold 
  }
  .highlight .m {
      color: #009999 
  }
  .highlight .s {
      color: #d14 
  }
  .highlight .n {
      color: #333333 
  }
  .highlight .na {
      color: #008080 
  }
  .highlight .nb {
      color: #0086B3 
  }
  .highlight .nc {
      color: #445588;
      font-weight: bold 
  }
  .highlight .no {
      color: #008080 
  }
  .highlight .ni {
      color: #800080 
  }
  .highlight .ne {
      color: #990000;
      font-weight: bold 
  }
  .highlight .nf {
      color: #990000;
      font-weight: bold 
  }
  .highlight .nn {
      color: #555555 
  }
  .highlight .nt {
      color: #000080 
  }
  .highlight .nv {
      color: #008080 
  }
  .highlight .ow {
      font-weight: bold 
  }
  .highlight .w {
      color: #bbbbbb 
  }
  .highlight .mf {
      color: #009999 
  }
  .highlight .mh {
      color: #009999 
  }
  .highlight .mi {
      color: #009999 
  }
  .highlight .mo {
      color: #009999 
  }
  .highlight .sb {
      color: #d14 
  }
  .highlight .sc {
      color: #d14 
  }
  .highlight .sd {
      color: #d14 
  }
  .highlight .s2 {
      color: #d14 
  }
  .highlight .se {
      color: #d14 
  }
  .highlight .sh {
      color: #d14 
  }
  .highlight .si {
      color: #d14 
  }
  .highlight .sx {
      color: #d14 
  }
  .highlight .sr {
      color: #009926 
  }
  .highlight .s1 {
      color: #d14 
  }
  .highlight .ss {
      color: #990073 
  }
  .highlight .bp {
      color: #999999 
  }
  .highlight .vc {
      color: #008080 
  }
  .highlight .vg {
      color: #008080 
  }
  .highlight .vi {
      color: #008080 
  }
  .highlight .il {
      color: #009999 
  }
  .highlight .gc {
      color: #999;
      background-color: #EAF2F5 
  }
  .type-csharp .highlight .k {
      color: #0000FF 
  }
  .type-csharp .highlight .kt {
      color: #0000FF 
  }
  .type-csharp .highlight .nf {
      color: #000000;
      font-weight: normal 
  }
  .type-csharp .highlight .nc {
      color: #2B91AF 
  }
  .type-csharp .highlight .nn {
      color: #000000 
  }
  .type-csharp .highlight .s {
      color: #A31515 
  }
  .type-csharp .highlight .sc {
      color: #A31515 
  }
  </pre>
  </details>

  <details>
  <summary>~/.config/ReText project/ReText.conf</summary>

  <pre>
  [General]
  autoPlainText=false
  autoSave=false
  defaultPreviewState=live-preview
  editorFont=Arimo
  editorFontSize=12
  highlightCurrentLine=true
  lineNumbersEnabled=true
  livePreviewByDefault=true
  openTab=true
  previewState=true
  recentFileList=/home/am/Dropbox/HOWTO/dev-roadmap/docs/!linux/logging.md, /home/am/Dropbox/HOWTO/dev-roadmap/docs/!linux/scheduled-jobs.md, /home/am/Dropbox/HOWTO/django rest api.md, /home/am/PROJETS/dev-roadmap/docs/!django/django-query.md, /home/am/Dropbox/HOWTO/Linux/LPIC course C/07. Navigating IP fundamentals.md, /home/am/PROJETS/dev-roadmap/docs/!linux/email.md, /home/am/PROJETS/dev-roadmap/docs/!django/django-template.md, /home/am/PROJETS/dev-roadmap/docs/!django/django-formats.md, /home/am/PROJETS/dev-roadmap/docs/!django/django-gettext.md, /home/am/PROJETS/dev-roadmap/docs/!django/django-migration.md
  restorePreviewState=true
  spellCheck=true
  spellCheckLocale=fr
  styleSheet=/home/am/.config/ReText project/github.css
  tabWidth=2
  useWebKit=true

  [ColorScheme]
  blockquotes=#808080
  codeSpans=#da4453
  htmlComments=#a0a0a4
  htmlStrings=#808000
  htmlSymbols=#008080
  htmlTags=#800080
  lineNumberArea=#EFEBE7
  lineNumberAreaText=#BCB8B5
  marginLine=#3daee9
  markdownLinks=#2980b9
  restDirectives=#800080
  restRoles=#800000
  whitespaceOnEnd=#80E1E1A5
  </pre>
  </details>

* [Markups extended](https://github.com/a-mt/markupsExtended)

## Screen recorder: Simple Screen Recorder

* [Installation](https://github.com/Mohelm97/screenrecorder)

  ``` bash
  apt download com.github.mohelm97.screenrecorder
  Get:1 http://packages.elementary.io/appcenter bionic/main amd64 com.github.mohelm97.screenrecorder amd64 0.2.1 [48,2 kB]
  Fetched 48,2 kB in 1s (79,6 kB/s)
  ```

* Démarrer / arrêter: <kbd>Ctrl</kbd> + <kbd>r</kbd>
