$(function() {
  chrome.tabs.query({active:true}, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {}, function(response) {
      var nd = response.nd;
      var key_value_array = response.key_value_array;

      var row0 = $(key_value_array).map(function() { return "\"" + this.key + "\"" }).get().join(",")
      var row1 = $(key_value_array).map(function() { return "\"" + this.value + "\"" }).get().join(",")
      var csv_blob = new Blob([row0 + "\n" + row1], { "type": "application/csv"});
      var csv_a = document.getElementById("download_csv");
      csv_a.download = nd + ".csv";
      csv_a.href = window.URL.createObjectURL(csv_blob);

      var json_hash = {};
      $(key_value_array).each(function() { json_hash[this.key] = this.value });
      var json_blob = new Blob([JSON.stringify(json_hash)], { "type": "application/json"});
      var json_a = document.getElementById("download_json");
      json_a.download = nd + ".json";
      json_a.href = window.URL.createObjectURL(json_blob);
    });
  });
});
