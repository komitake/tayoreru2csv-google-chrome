chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(top.window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  }
  var nd = getUrlParameter("NumDeliver");

  var key_value_array = $("tr.tex12 > td", top.frames[0].document.body)
    .map(function() {
      if ($(this).index() < 0) {
        return null;
      }
      label_tds = $(this).parent("tr").prev("tr").children("td")
      if (label_tds.length > 0 && label_tds.length < $(this).index()) {
        return null;
      }
      label = $(label_tds[$(this).index()]).text().trim().replace(/\s+/g, " ")
      if (label.length <= 0) {
        return null;
      }
      value = $(this).text().trim().replace(/\s+/g, " ")

      return { key: label, value: value }
    });

  sendResponse({ nd: nd, key_value_array: key_value_array });
});
