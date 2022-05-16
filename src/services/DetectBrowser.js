// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
// Opera 8.0+
    let isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox) return 'Firefox';

// Safari 3.0+ "[object HTMLElementConstructor]"
    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    if (isSafari) return 'Safari';
// Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;
    if(isEdge) return 'Edge';
    if(isIE) return 'IE';

// Chrome 1 - 71
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
 //   let isBlink = (isChrome || isOpera) && !!window.CSS;

    if(isChrome) return 'Chrome';
    if(isOpera) return 'Opera';

    return 'Unknown';
}
