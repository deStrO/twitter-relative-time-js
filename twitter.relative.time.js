/**
 * twitter.relative.time.js 0.2.0
 * Copyright (c) 2013 Keita Mori
 * https://github.com/dforest/twitter-relative-time-js
 *
 * Includes data.extentions.js
 * Copyright (c) 2009 James F. Herdman
 * https://github.com/jherdman/javascript-relative-time-helpers
 *
 * Released under the MIT License.
 */
 Date.prototype.toTwitterRelativeTime = (function() {
  var locale = 'def';

  var _ = function(locale_key) {
    if (locale_key !== undefined && LOCALES.hasOwnProperty(locale_key)) { locale = locale_key;}
    var now = new Date();
    var delta = now - this;
    delta = Math.abs(delta);

    var unit_key = 'now';
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      unit_key = key;
      delta = delta / CONVERSIONS[key];
    }

    if (unit_key === 'hour' && delta/24 >= 1) {
      //older than 24 hours
      return localize(this, 'month', true);
    }

    delta = Math.floor(delta);
    return localize(delta, unit_key);

  };

  var t = function(key){
    return LOCALES[locale][key];
  };

  var localize = function(delta, unit_key){
    var unit = t(unit_key)
    if(unit_key === 'month'){
      unit = unit[delta.getMonth()];
      delta = delta.getDate();
    }else if(unit_key !== 'now'){
      unit = delta === 1 ? t(unit_key)['one'] : t(unit_key)['other'];
    }
    return unit.replace('%n', delta+"");
  };

  var CONVERSIONS = {
    now: 1,         // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60      // min   -> hour
  };
  var LOCALES = {
    def: {
      now: 'Now',
      second: {one: '%ns', other: '%ns'},
      minute: {one: '%nm', other: '%nm'},
      hour:   {one: '%nh', other: '%nh'},
      month: ['%n Jan','%n Feb','%n Mar','%n Apr','%n May','%n June','%n July','%n Aug','%n Sept','%n Oct','%n Nov','%n Dec']
    },
    en: {
      now: 'Now',
      second: {one: '%n second ago', other: '%n seconds ago'},
      minute: {one: '%n minute ago', other: '%n minutes ago'},
      hour:   {one: '%n hour ago'  , other: '%n hours ago'},
      month: ['%n January','%n February','%n March','%n April','%n May','%n June','%n July','%n August','%n September','%n October','%n November','%n December']
    },
    ja: {
      now: '今',
      second: {one: '%n秒前', other: '%n秒前'},
      minute: {one: '%n分前', other: '%n分前'},
      hour:   {one: '%n時間前', other: '%n時間前'},
      month: ['1月%n日','2月%n日','3月%n日','4月%n日','5月%n日','6月%n日','7月%n日','8月%n日','9月%n日','10月%n日','11月%n日','12月%n日']
    },
    ar: {
      now: "الآن.",
      second: {one: "منذ ‏%n ثانيتين", other: "منذ ‏%n‏ ثانيتين"},
      minute: {one: "منذ %n دقائق", other: "منذ %n دقائق"},
      hour: {one: "منذ %n ساعات", other: "منذ %n ساعات"},
      month: ["%n يناير","%n فبراير","%n مارس","%n أبريل","%n مايو","%n يونيو","%n يوليو","%n أغسطس","%n سبتمبر","%n أكتوبر","%n نوفمبر","%n ديسمبر"]
    },
    de: {
      now: "Jetzt",
      second: {one: "Vor %n Sekunde", other: "vor %n Sekunden"},
      minute: {one: "Vor %n Minute", other: "vor %n Minuten"},
      hour: {one: "Vor %n Stunde", other: "vor %n Stunden"},
      month: ["%n Januar","%n Februar","%n März","%n April","%n Mai","%n Juni","%n Juli","%n August","%n September","%n Oktober","%n November","%n Dezember"]
    },
    es: {
      now: "Ahora",
      second: {one: "%n segundo atrás", other: "%n segundos atrás"},
      minute: {one: "%n minuto atrás", other: "%n minutos atrás"},
      hour: {one: "%n hora atrás", other: "%n horas atrás"},
      month: ["%n Enero","%n Febrero","%n Marzo","%n Abril","%n Mayo","%n Junio","%n Julio","%n Agosto","%n Septiembre","%n Octubre","%n Noviembre","%n Diciembre"]
    },
    fr: {
      now: "Maintenant",
      second: {one: "Il y a %n seconde", other: "il y a %n secondes"},
      minute: {one: "Il y a %n minute", other: "il y a %n minutes"},
      hour: {one: "Il y a %n heure", other: "il y a %n heures"},
      month: ["%n Janvier","%n Février","%n Mars","%n Avril","%n Mai","%n Juin","%n Juillet","%n Août","%n Septembre","%n Octobre","%n Novembre","%n Décembre"]
    },
    hi: {
      now: "अब",
      second: {one: "%n सेकंड पहले", other: "%n सेकंड पहले"},
      minute: {one: "%n मिनट पहले", other: "%n मिनट पहले"},
      hour: {one: "%n घंटे पहले", other: "%n घंटे पहले"},
      month: ["%n जनवरी","%n फरवरी","%n मार्च","%n अप्रैल","%n मई","%n जून","%n जुलाई","%n अगस्त","%n सितंबर","%n अक्टूबर","%n नवंबर","%n दिसंबर"]
    },
    id: {
      now: "Sekarang",
      second: {one: "%n detik yang lalu", other: "%n detik yang lalu"},
      minute: {one: "%n menit yang lalu", other: "%n menit yang lalu"},
      hour: {one: "%n jam yang lalu", other: "%n jam yang lalu"},
      month: ["%n Januari","%n Februari","%n Maret","%n April","%n Mei","%n Juni","%n Juli","%n Agustus","%n September","%n Oktober","%n November","%n Desember"]
    },
    it: {
      now: "Ora",
      second: {one: "%n secondo fa", other: "%n secondi fa"},
      minute: {one: "%n minuto fa", other: "%n minuti fa"},
      hour: {one: "%n ora fa", other: "%n ore fa"},
      month: ["%n Gennaio","%n Febbraio","%n Marzo","%n Aprile","%n Maggio","%n Giugno","%n Luglio","%n Agosto","%n Settembre","%n Ottobre","%n Novembre","%n Dicembre"]
    },
    ko: {
      now: "지금",
      second: {one: "%n초 전", other: "%n초 전"},
      minute: {one: "%n분 전", other: "%n분 전"},
      hour: {one: "%n시간 전", other: "%n시간 전"},
      month: ["1월%n일","2월%n일","3월%n일","4월%n일","5월%n일","6월%n일","7월%n일","8월%n일","9월%n일","10월%n일","11월%n일","12월%n일"]
    },
        ms: {
      now: "sekarang",
      second: {one: "%n saat yang lalu", other: "%n saat yang lalu"},
      minute: {one: "%n minit yang lalu", other: "%n minit yang lalu"},
      hour: {one: "%n jam yang lalu", other: "%n jam yang lalu"},
      month: ["%n Januari","%n Februari","%n Mac","%n April","%n Mei","%n Jun","%n Julai","%n Ogos","%n September","%n Oktober","%n November","%n Disember"]
    },
    pt: {
      now: "Agora",
      second: {one: "%n segundo atrás", other: "%n segundos atrás"},
      minute: {one: "%n minuto atrás", other: "%n minutos atrás"},
      hour: {one: "%n hora atrás", other: "%n horas atrás"},
      month: ["%n Janeiro","%n Fevereiro","%n Março","%n Abril","%n Maio","%n Junho","%n Julho","%n Agosto","%n Setembro","%n Outubro","%n Novembro","%n Dezembro"]
    },
    ru: {
      now: "сейчас",
      second: {one: "%n секунду назад", other: "%n секунд назад"},
      minute: {one: "%n минуту назад", other: "%n минут назад"},
      hour: {one: "%n час назад", other: "%n часов назад"},
      month: ["%n январь","%n февраль","%n март","%n апрель","%n Мая","%n июнь","%n июль","%n август","%n сентябрь","%n октябрь","%n ноябрь","%n декабрь"]
    },
    tr: {
      now: "şimdi",
      second: {one: "%n saniye önce", other: "%n saniye önce"},
      minute: {one: "%n dakika önce", other: "%n dakika önce"},
      hour: {one: "%n saat önce", other: "%n saat önce"},
      month: ["%n Ocak","%n Şubat","%n Mart","%n Nisan","%n Mayıs","%n Haziran","%n Temmuz","%n Ağustos","%n Eylül","%n Ekim","%n Kasım","%n Aralık"]
    },
    'zh-CHS': {
      now: "现在",
      second: {one: "%n秒钟前", other: "%n秒钟前"},
      minute: {one: "%n分钟前", other: "%n分钟前"},
      hour: {one: "%n小时前", other: "%n小时前"},
      month: ["1月%n日","2月%n日","3月%n日","4月%n日","5月%n日","6月%n日","7月%n日","8月%n日","9月%n日","10月%n日","11月%n日","12月%n日"]
    }
  }

  return _;

})();
