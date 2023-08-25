$(document).ready(function () {
  //----------------------------------------
  // ▼翻訳元テキストが変更されたら自動で翻訳を行う
  // translateText()を実行
  //----------------------------------------
  $("#sourceText").on("input", function () {
    translateText();
  });

  //----------------------------------------
  // ▼翻訳言語が変更されたら翻訳を行う
  // translateText()を実行
  //----------------------------------------
  $("#targetLanguage").change(function () {
    translateText();
  });

  //----------------------------------------
  // ▼コピーボタンをクリックしたときの処理
  //----------------------------------------
  $("#copyButton").click(function () {
    // Clipboard APIを使ってテキストをクリップボードにコピー
    navigator.clipboard
      .writeText($("#translatedText").val())
      .then(function () {
        alert("コピーに成功しました");
      })
      .catch(function () {
        alert("コピーに失敗しました");
      });
  });

  //----------------------------------------
  // ▼クリアボタンをクリックしたときの処理
  // アラートで意思確認をはさみ、OKの場合のみ削除
  //----------------------------------------
  $("#clearButton").click(function () {
    const isConfirmed = window.confirm("内容を削除していいですか？");
    if (isConfirmed) {
      $("#sourceText").val("");
      $("#translatedText").val("");
    }
  });
});

//----------------------------------------
// ▼DeepL APIを使って翻訳を行う関数
//----------------------------------------
function translateText() {
  const sourceText = $("#sourceText").val();
  const targetLanguage = $("#targetLanguage").val();

  if (!sourceText || !targetLanguage) return;

  $.ajax({
    url: "https://api-free.deepl.com/v2/translate",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: "DeepL-Auth-Key " + "APIキーをここに記述",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      text: [sourceText],
      target_lang: targetLanguage,
    }),
    success: function (response) {
      if (response && response.translations && response.translations[0]) {
        $("#translatedText").val(response.translations[0].text);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("翻訳に失敗しました：", textStatus, errorThrown);
    },
  });
}
